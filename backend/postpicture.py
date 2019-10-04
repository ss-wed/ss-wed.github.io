import io
import os
from datetime import datetime

from flask import abort, request
from google.cloud import storage
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import (ImageMessage, MessageEvent, TextMessage,
                            TextSendMessage)
from PIL import Image


line_bot_api = LineBotApi(os.environ['CHANNEL_ACCESS_TOKEN'])
handler = WebhookHandler(os.environ['CHANNEL_SECRET'])

bucket = storage.Client().get_bucket('wedding-system-upload')


def post_picture(request):
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
    # print("handle_message:", event)
    text = event.message.text

    messages = [
        TextSendMessage(text=text),
        TextSendMessage(text='画像を送ってみてね!'),
    ]

    line_bot_api.reply_message(event.reply_token, messages)


@handler.add(MessageEvent, message=ImageMessage)
def handle_image(event):
    # print("handle_image:", event)
    try:
        # 画像
        message_id = event.message.id
        message_content = line_bot_api.get_message_content(message_id)
        img_bin = io.BytesIO(message_content.content)
        img = Image.open(img_bin)

        # cloud storageに保存
        img_name = datetime.utcnow().strftime("%m%d%H%M%S%f") + '.jpg'
        img_path = f"/tmp/{img_name}"
        img.save(img_path, "JPEG")     # 一旦ローカルに画像を保存
        blob = bucket.blob(img_name)
        blob.upload_from_filename(img_path)

        messages = [
            TextSendMessage(text='画像を保存したよ！'),
        ]

        line_bot_api.reply_message(event.reply_token, messages)

    except Exception as e:
        print("error:", e)
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text='エラーが発生しました'))
