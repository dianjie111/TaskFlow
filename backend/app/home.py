from flask import Blueprint,request
import pymysql

home_api=Blueprint('home',__name__,url_prefix='/api')

@home_api.route('/home',methods=['GET'])
def home():
    token=request.headers.get('token')

    conn = pymysql.connect(host='localhost',
                           port=3306,
                           user='root',
                           password='asdfghjkl0',
                           charset='utf8mb4',
                           database='xm')
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    sql='select * from user where token= %s'
    cursor.execute(sql,(token,))
    username=cursor.fetchall()

    print(username)

    return {'message':'成功','token':token},200
