from flask import request,Blueprint
import pymysql

project_api=Blueprint('project',__name__,url_prefix='/api')

@project_api.route('/project',methods=['GET'])
def select_project():
    conn = pymysql.connect(host='localhost',
                           port=3306,
                           user='root',
                           password='asdfghjkl0',
                           charset='utf8mb4',
                           database='xm')
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    token=request.headers.get('token')

    sql='select * from user where token = %s'
    cursor.execute(sql,(token,))
    user=cursor.fetchall()
    if user:
        sql='select * from project'
        cursor.execute(sql)
        project=cursor.fetchall()

        sql='select * from project_member'
        cursor.execute(sql)
        member=cursor.fetchall()

        return {'message':'success','project':project,'member':member,'username':user[0]['username']},200
    else:
        return {'message':'error','data':'密钥错误'},500

@project_api.route('/project',methods=['POST'])
def create_project():
    conn = pymysql.connect(host='localhost',
                           port=3306,
                           user='root',
                           password='asdfghjkl0',
                           charset='utf8mb4',
                           database='xm')
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    try:
        project_api_data=request.get_json()
        token=project_api_data['token']
        sql ='select * from user where token = %s'
        cursor.execute(sql,(token,))
        user=cursor.fetchall()
        if user:
            sql='insert into project(name, description, owner, status, created_at) values (%s,%s,%s,%s,%s)'
            cursor.execute(sql,(
                project_api_data['name'],
                project_api_data['description'],
                project_api_data['owner'],
                '进行中',
                project_api_data['created_at']
            ))
            conn.commit()
            return {'message':'success','data':'项目创建成功','username':user},200
        else:
            return {'message':'error','data':'密钥错误'},500
    except Exception as e:
        print(e)
        return  {'message':e,'data':'项目创建失败'},500

    finally:
        cursor.close()

