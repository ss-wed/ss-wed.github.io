import base64
import os

from flask import jsonify
from google.cloud import storage


def get_all_picture_names(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

    # 画像一覧取得
    picturenames = [blob.path.split('/')[-1] for blob in list(storage.Client().get_bucket('wedding-system-upload').list_blobs())]

    res = jsonify({'result_list': picturenames})
    res.headers.set('Access-Control-Allow-Origin', '*')

    return res


def get_picture(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

    # 引数取得
    img_name = request.get_json()['img_name']

    # 指定画像取得
    filepath = f"{os.environ['TMPDIR']}{img_name}"
    blob = storage.Client().get_bucket('wedding-system-upload').blob(img_name)
    blob.download_to_filename(filepath)

    # 画像返却準備
    file = open(filepath, 'rb').read()
    enc_file = base64.b64encode(file).decode("utf-8")

    res = jsonify({'image': enc_file})
    res.headers.set('Access-Control-Allow-Origin', '*')

    return res