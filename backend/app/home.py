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
    username=cursor.fetchall()[0]['username']

    sql='select * from project where owner=%s'
    cursor.execute(sql,(username,))
    project=cursor.fetchall()
    task_list=[]
    for i in project:
        project_name=i['name']
        sql ='select * from task where project_name=%s'
        cursor.execute(sql,(project_name,))
        task=cursor.fetchall()
        task_list.append({project_name:task})

    return {'message':{
        'username':username,
        'project':project,
        'task':task_list
    }},200
