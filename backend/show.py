import base64
import traceback

from flask import jsonify
from google.cloud import firestore, storage


def test(request):

    try:
        # DBからスコアデータ取得
        scores = {doc.id: doc.to_dict() for doc in firestore.Client().collection('smilescore').stream()}

        # DBからテーブル順データ取得
        order = {doc.id: doc.to_dict() for doc in firestore.Client().collection('table_order').stream()}
        order = order['table_order']['order']

        # 最高スコアの画像名取得
        scores = {k: v['score'] for k, v in scores.items()}
        imgname = max(scores.items(), key=lambda x: x[1])[0]

        # 最高スコアの画像名をテーブル名に変換
        imgnames = sorted(scores.keys())
        target_index = imgnames.index(imgname)
        tablename = order[target_index]

        # 画像返却準備
        blob = storage.Client().get_bucket('smilescore').blob(imgname)
        filepath = f"/tmp/{imgname}"
        blob.download_to_filename(filepath)
        file = open(filepath, 'rb').read()
        enc_file = base64.b64encode(file).decode("utf-8")

        # 画像返却
        res = jsonify({'image': enc_file, 'tablename': tablename })
        res.headers.set('Access-Control-Allow-Origin', '*')

    except Exception as e:
        print(traceback.format_exc())

    return res


if __name__ == "__main__":
    from flask import Flask, request
    from flask_cors import CORS
    import os

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'C:/Users/ikeda/Documents/project/wedding/backend/gcpkey/wedding-system-244912-579ef9035123.json'

    app = Flask(__name__)

    @app.route('/', methods=['POST', 'GET'])
    def index():
        return test(request)

    app.run('127.0.0.1', 8080, debug=True)
