#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, abort, jsonify
import sys,os,io
import cv2
import base64
import glob
from DBAccess import DBAccess
from SMTPAccess import SMTPAccess
from photo_linebot import photo_api
from smile_linebot import smile_api

app = Flask(__name__)

# 写真投稿用linebot
app.register_blueprint(photo_api, url_prefix='/api/wedding-posting')

# 笑顔スコア用linebot
app.register_blueprint(smile_api, url_prefix='/api/smile-scoring')

@app.route("/api/search-img", methods=['POST'])
def search_img():
    try:
        json = {'result': True, 'result_list': []}
        for file_name in sorted(glob.glob("./img/*")):
            json['result_list'].append(file_name.replace('./img/', ''))
        return jsonify(json)

    except Exception as e:
        print("error:", e)
        return jsonify({'result': False})


@app.route("/api/get-img", methods=['POST'])
def get_img():
    try:
        json = {'result': True}
        #file読み込み
        data = request.json
        file_path = "./img/"+data['img_name']
        file = open(file_path, 'rb').read()
        #base64でencode
        enc_file = base64.b64encode(file).decode("utf-8")
        json['image'] =enc_file
        return jsonify(json)

    except Exception as e:
        print("error:", e)
        return jsonify({'result': False})


@app.route("/api/register", methods=['POST'])
def register():
    try:
        json = {'result': True}
        data = request.json
        db = DBAccess()
        print(data)
        db.registAttendance(data)
        mail = SMTPAccess()
        # メール送信機能は一旦コメントアウト
        # mail.sendSMTPMessage(data)
        return jsonify(json)

    except Exception as e:
        print("error:", e)
        return jsonify({'result': False})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route("/api")
def api():
    return jsonify({'key': 'value'})


if __name__ == "__main__":
    app.run()