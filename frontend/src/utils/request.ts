//登录数据获取
export async function selectLogin(){
        let res=await fetch('http://127.0.0.1:5143/api/user')
        if (res.ok){
           return await res.json()
        }
    }
//注册
export async function createLogin(username:string,password:string){
    let res=await fetch('http://127.0.0.1:5143/api/login',{
        headers:{'content-type':'application/json'},
        method:'POST',
        body:JSON.stringify({
            username:username,
            password:password,
            created_at:time(),
            token:randomStr(),
        })
    })
    if (res.ok){
        console.log((await res.json())['status'])
    }
    else{
        console.log('用户注册失败')
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