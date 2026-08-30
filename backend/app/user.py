import json
import pymysql
from  flask_cors import CORS
from flask import Flask,request

app=Flask(__name__)
CORS(app)

@app.route('/api/user',methods=['GET'])            #获取用户数据
def select_login():
    conn=pymysql.connect(host='localhost',
                         port=3306,
                         user='root',
                         password='asdfghjkl0',
                         charset='utf8mb4',
                         database='xm')
    cursor=conn.cursor(pymysql.cursors.DictCursor)

    sql='select * from user'
    cursor.execute(sql)
    result=cursor.fetchall()
    conn.close()

    data={
        'value':result
    }

    return data

@app.route('/api/login',methods=['POST'])
def create_login():
    conn = pymysql.connect(host='localhost',
                           port=3306,
                           user='root',
                           password='asdfghjkl0',
                           charset='utf8mb4',
                           database='xm')
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        user_data=request.get_json()

        sql='insert into user(username,password,created_at,token) VALUES (%s,%s,%s,%s)'
        cursor.execute(sql,(
            user_data['username'],
            user_data['password'],
            user_data['created_at'],
            user_data['token']
        ))
        conn.commit()
        return {'status':'用户注册成功'}
    except Exception as e:
        return {'status':'error','message':str(e)}

    finally:
        conn.close()





