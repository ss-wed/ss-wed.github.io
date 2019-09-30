#!/usr/bin/env python
# -*- coding: utf-8 -*-
import psycopg2
from library import *

class DBAccess():
    def __init__(self):
        self.conn = psycopg2.connect("host=db port=5432 dbname=wedding_db user=wed_user password=password")

    def __del__(self):
        self.conn.close()

    def registAttendance(self, data):
        cur = self.conn.cursor()
        # idの取得
        cur.execute('SELECT nextval(\'attendance_id_seq\')')
        (rep_id,) = cur.fetchone()
        # 代表者出欠の登録
        sql = "INSERT INTO t_attendance VALUES (" + \
              str(rep_id) + ", " + \
              "'" + replaceStr(data['name']) + "', " + \
              "'" + replaceStr(data['name_kana']) + "', " + \
              "'" + replaceStr(data['postcode']) + "', " + \
              "'" + replaceStr(data['address']) + "', " + \
              "'" + replaceStr(data['building']) + "', " + \
              "'" + replaceStr(data['mail_address']) + "', " + \
              "'" + replaceStr(data['phone_number']) + "', " + \
              "'" + replaceStr(data['allergy']) + "', " + \
              "'" + replaceStr(data['message']) + "', " + \
              "'" + ("true" if data['attendance'] else "false") + "')"
        print(sql)
        cur.execute(sql)
        # お連れ様の登録
        for comp in data['companion_list']:
            # idの取得
            cur.execute('SELECT nextval(\'companion_id_seq\')')
            (com_id,) = cur.fetchone()
            c_sql = "INSERT INTO t_companion VALUES (" + \
                    str(com_id) + ", " + \
                    str(rep_id) + ", " + \
                    "'" + replaceStr(comp['name']) + "', " + \
                    "'" + replaceStr(comp['name_kana']) + "', " + \
                    "'" + replaceStr(comp['allergy']) + "')"
            print(c_sql)
            cur.execute(c_sql)
            pass
        self.conn.commit()
