import io
import json
import os
import traceback
from datetime import datetime

import cv2
import numpy as np
import requests
from flask import abort, request
from google.cloud import firestore, storage
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import (ImageMessage, MessageEvent, TextMessage,
                            TextSendMessage)
from PIL import Image

line_bot_api = LineBotApi(os.environ['CHANNEL_ACCESS_TOKEN'])
handler = WebhookHandler(os.environ['CHANNEL_SECRET'])
bucket = storage.Client().get_bucket('smilescore')
subscription_key = os.environ['SUBSCRIPTION_KEY']
face_api_url = os.environ['FACE_API_URL']


def smilescore(request):
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    print("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    text = event.message.text

    try:
        response_text = ''
        if text == 'del':
            delete_images()
            delete_scores()
            response_text = '削除完了'
        else:
            set_table_order(text)
            response_text = f"写真送信順を{text}で設定しました"

    except Exception as e:
        print(traceback.format_exc())
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text='エラーが発生しました'))

    messages = [
        TextSendMessage(text=response_text),
    ]

    line_bot_api.reply_message(event.reply_token, messages)


def set_table_order(text):
    ''' 写真送信順設定 '''

    # 大文字へ変換
    _text = text.upper()

    # 入力文字列をfirestoreに登録
    db = firestore.Client()
    batch = db.batch()
    collection = db.collection('table_order')
    doc_ref = collection.document('table_order')
    order = {
        'order': _text,
    }
    batch.set(doc_ref, order)
    batch.commit()


def delete_images():
    ''' バケットを再生成することでバケット内の全アイテム削除 '''

    # 削除
    bucket.delete(force=True)

    #生成
    client = storage.Client()
    new_bucket = storage.Bucket(client)
    new_bucket.name = 'smilescore'
    new_bucket.location = 'asia-northeast1'
    storage.Client().create_bucket(new_bucket)


def delete_scores():
    ''' ドキュメント一覧を取得して1つずつ消していく '''

    docs = firestore.Client().collection('smilescore').stream()
    for doc in docs:
        doc.reference.delete()


@handler.add(MessageEvent, message=ImageMessage)
def handle_image(event):
    try:
        # 画像
        message_id = event.message.id
        message_content = line_bot_api.get_message_content(message_id)
        img_bin = io.BytesIO(message_content.content)
        img = Image.open(img_bin)

        # 一旦ローカルに画像を保存
        img_name = f"{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
        img_path = f"/tmp/{img_name}"
        img.save(img_path, quality=100)

        # 笑顔スコア実施
        outimgpath, score = score_smile(img_path)

        # cloud storageに保存
        blob = bucket.blob(img_name)
        blob.upload_from_filename(outimgpath)

        # DB登録
        db = firestore.Client()
        batch = db.batch()
        collection = db.collection('smilescore')
        doc_ref = collection.document(img_name)
        info = {
            'score': score,
        }
        batch.set(doc_ref, info)
        batch.commit()

        messages = [
            TextSendMessage(text='スコアリング完了'),
        ]

        line_bot_api.reply_message(event.reply_token, messages)

    except Exception as e:
        print(traceback.format_exc())
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text='エラーが発生しました'))


def score_smile(imgpath):
    ''' 笑顔スコア実施 '''

    # 笑顔スコア取得
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key,
        'Content-Type': 'application/octet-stream'
    }

    params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'smile',
    }

    with open(imgpath, 'rb') as f:
        img = f.read()
    response = requests.post(face_api_url, params=params, headers=headers, data=img)
    results = response.json()

    # cv2で画像に顔枠とスコア書き込み
    fontsize = 2
    thickness = 2
    cv2_img = cv2.imread(imgpath)
    scorelist = []
    for result in results:
        x = result['faceRectangle']['left']
        y = result['faceRectangle']['top']
        w = result['faceRectangle']['width']
        h = result['faceRectangle']['height']
        score = result['faceAttributes']['smile']
        scorelist.append(score)

        color = (0, 0, 255 * score)
        cv2.rectangle(cv2_img, (x, y), (x + w, y + h), color, 2)
        # cv2.putText(cv2_img, str(score), (x, y-1), cv2.FONT_HERSHEY_PLAIN, fontsize, color, thickness)

    # 一旦ローカルへ保存
    insert_index = imgpath.rfind('.')
    outimgpath = f"{imgpath[:insert_index]}_{imgpath[insert_index:]}"
    cv2.imwrite(outimgpath, cv2_img)

    # スコア平均算出
    score_mean = round(np.mean(np.array(scorelist)), 2)

    return outimgpath, score_mean
