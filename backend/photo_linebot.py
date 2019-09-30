#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Blueprint, request, abort
import sys,os,io
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage, ImageMessage
from PIL import Image
from datetime import datetime

photo_api = Blueprint('photo_api', __name__)

#環境変数取得
YOUR_CHANNEL_ACCESS_TOKEN = 'X7n1cRq34rnf74uJAHR84dliYknmqhHoG9ixNw+rUcVrp/VxjqnAORa/QN1y0p2C3AYKilmh7kQIwaKLksIRlrIgpfIxGOkuI+eYKHWvFq4PF9dHgnmUh09vO6mxjBQsJG5xN1Y29wTNHEYDkbwHSwdB04t89/1O/w1cDnyilFU='
YOUR_CHANNEL_SECRET = '4acb784e7729a2fa24b9a9adaa07f9d3'

line_bot_api = LineBotApi(YOUR_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(YOUR_CHANNEL_SECRET)

@photo_api.route("/", methods=['POST'])
def callback():
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

        # 保存先パス
        img_name = datetime.utcnow().strftime("%m%d%H%M%S%f") + '.jpg'
        if not os.path.exists('./img'):
            os.mkdir('./img')

        # 画像を保存
        img.save('img/'+img_name,"JPEG")

        messages = [
            TextSendMessage(text='画像を保存したよ！'),
        ]

        line_bot_api.reply_message(event.reply_token, messages)

    except Exception as e:
        print("error:", e)
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text='エラーが発生しました'))