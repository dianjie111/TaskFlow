const url='http://127.0.0.1:5143/api'

//登录数据获取
export async function selectLogin(){
        let res=await fetch('http://127.0.0.1:5143/api/user')
        if (res.ok){
           return await res.json()
        }
        else{
            return '失败'
        }
    }
//注册
export async function createLogin(username:string,password:string):Promise<string>{
    let token=randomStr()
    let res=await fetch('http://127.0.0.1:5143/api/login',{
        headers:{'content-type':'application/json'},
        method:'POST',
        body:JSON.stringify({
            username:username,
            password:password,
            created_at:time(),
            token:token,
        })
    })
    if (res.ok){
        console.log((await res.json())['status'])
        return token
    }
    else{
        console.log('用户注册失败')
        return '失败' 
    }
    
}

//主页数据
export async function selectHome(token:string){
    let res=await fetch('http://127.0.0.1:5143/api/home',{
        headers:{token:token,'content-type':'applicaiton/json'}
    })
    let data=await res.json()
    return data
}

//项目数据获取
export async function selectProject(token:string){
    let res=await fetch('http://127.0.0.1:5143/api/project',{
        method:'GET',
        headers:{token:token,'coutent-type':'application/json'}
    })
    let data=await res.json()
    console.log(data)
    return data
}

export async function createProject(token:string,name:string,description:string,owner:string){
    let nowTime=time()
    let res=await fetch('http://127.0.0.1:5143/api/project',{
        headers:{'content-type':'application/json'},
        method:'POST',
        body:JSON.stringify({
            token:token,
            name:name,
            description:description,
            owner:owner,
            created_at:nowTime
        })
    })
    if (res.ok){
        console.log('新增项目成功')
        return 'ok'
    }
    else{
        console.log('新增项目失败')
    }
}

//当前时间函数
function time(){
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');   // 月份从0开始，需+1，并补齐两位数
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

//随机token生成
function randomStr(){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < 8; i++) {
    // Math.random() 生成 0-1 之间的随机数，乘以长度取整即可得到随机下标
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}