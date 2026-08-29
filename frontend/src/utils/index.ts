async function Login(){
        let res=await fetch('http://127.0.0.1:5143/api/login')
        if (res.ok){
           return await res.json()
        }
    }

export default Login