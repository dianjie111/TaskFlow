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
    print(token)
    cursor.execute(sql,(token,))
    username=cursor.fetchall()[0]['username']

    sql='select * from project '
    cursor.execute(sql,)
    project=cursor.fetchall()
    task_list=[]
    all_task_list=[]
    for i in project:
        project_name=i['name']
        sql ='select * from task where project_name=%s and assignee=%s'
        cursor.execute(sql,(project_name,username,))
        task=cursor.fetchall()
        sql='select * from task where project_name=%s'
        cursor.execute(sql, (project_name,))
        all_task=cursor.fetchall()
        all_task_list.append({project_name:all_task})
        task_list.append({project_name:task})

    return {'message':{
        'username':username,        #str
        'project':project,          #arr
        'task':task_list,           #obj
        'all_task':all_task_list    #obj
    }},200
