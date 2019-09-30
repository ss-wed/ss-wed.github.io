#!/usr/bin/env python
# -*- coding: utf-8 -*-
from library import *
import os
import cv2
import numpy as np
from matplotlib import pyplot as plt

class SmileScore():
    def __init__(self):
        pass

    def __del__(self):
        pass

    def detectFaces(self):
        # 学習データ読み込み
        face_cascade = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')
        smile_cascade = cv2.CascadeClassifier('haarcascades/haarcascade_smile.xml')

        # 画像ファイル読み込み
        img = cv2.imread("img/201908130004.png")
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # 顔認識
        faces = face_cascade.detectMultiScale(gray, 1.25, 5)
        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x,y), (x+w, y+h), (255,0,0), 2)
            # cv2.circle(img,(int(x+w/2),int(y+h/2)),int(w/2),(0, 0, 255),2) # red

            # 笑顔識別
            roi_gray = gray[y:y+h, x:x+w] #Gray画像から，顔領域を切り出す．
            smiles= smile_cascade.detectMultiScale(roi_gray,scaleFactor= 1.2, minNeighbors=10, minSize=(20, 20))#笑顔識別
            if len(smiles) >0 :
                for(sx,sy,sw,sh) in smiles:
                    cv2.circle(img,(int(x+sx+sw/2),int(y+sy+sh/2)),int(sw/2),(0, 0, 255),2)#red

        # 画面表示
        plt.imshow( cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        plt.show()


if __name__ == "__main__":
    ss = SmileScore()
    ss.detectFaces()