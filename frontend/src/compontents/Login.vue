<script setup lang="ts">
    import { ref,onMounted } from 'vue';
    import {selectLogin,createLogin} from '../utils/request'
    import { useRouter } from 'vue-router';
    import { useStorage } from '@vueuse/core';
    const router=useRouter()
    const mode=ref<boolean>(true)
    const username=ref<string>('')
    const password=ref<string>('')
    const new_password=ref<string>('')
    const zcshow=ref<boolean>(false)
    const storage2=useStorage('token','default',sessionStorage)
    let token:string

    const link = async()=>{
        let data=await selectLogin()
        if (data=='失败'){
            console.error('用户查询失败')
            return 
        }
        console.log(data)
        if (zcshow.value){
            if (username.value !='' && password.value !='' && new_password.value !='' ){
                if (password.value == new_password.value){
                    if (!data['value'].find(item => item.username === username.value)){
                        let token=await createLogin(username.value,password.value)
                        if (token=='失败'){
                            console.log('注册用户失败')
                            return
                        }
                    }
                    else{
                        alert('该用户已被注册')
                        return
                    }
                }
                else{
                    alert('请确认两次密码是否相同')
                    return
                }
            }
            else{
                alert('请输入完整的账号密码')
                return
            }
        }
        else{
            if (username.value !='' && password.value !=''){
                const target=data['value'].find(item => item.username === username.value)
                token=target.token
                if (target){
                    if (target.password==password.value){
                        console.log('ok')
                    }
                    else{
                        alert('请检查账号密码正确')
                        return
                    }
                }
                else{
                    alert('当前账号尚未注册')
                    return
                }
                
            }
            else{
                alert('请输入完整的账号密码')
                return
            }
            
        }
        
        storage2.value=token
        router.push({path:'/home'})
    }
</script>
<template>
    <div class="box">
        <div class="left">
            <div class="text">
                <h1 style="color: #2563EB;">TaskFlow</h1>
                <p >高效任务管理，从TaskFlow开始</p>
            </div>
            <div class="login">
                <div class="btn"><button :style="{color:mode?'#2563EB':'black'}" @click="mode=!mode">账号登录</button><button @click="mode=!mode" :style="{color:mode?'black':'#2563EB'}">手机号登录</button></div><br>
                <div class="hr"><div :style="{background:mode?'#2563EB':'#E5E7EB'}"></div><div :style="{background:mode?'#E5E7EB':'#2563EB'}"></div></div>
                <div class="input"> 
                    <input type="text" v-model="username" name="" style="height: 30px;" id="" placeholder="请输入用户名">
                    <input type="password" v-model="password" name="" id="" style="margin-top: 20px;height: 30px;" placeholder="请输入密码">
                    <input type="password" v-if="zcshow==true" v-model="new_password" style="margin-top: 20px;height: 30px;" placeholder="请再次输入密码">
                    <p id="p"><span style="display: flex;align-items: center;"><input type="checkbox" name="" id="" ><label for="" style="font-size: 11px;">记住我</label></span>
                    <button style="border: none;background: white;color: #3B82F6;">忘记密码?</button></p>
                    <button @click="link" style="border-radius: 10px; width: 100%;height: 50px;background-color: #2563EB;color: white;">登录</button>
                    <p style="text-align: center;font-size: 14px;">{{ zcshow?'已有账号？':'还没有账号？' }}<button style="color: #3B82F6;text-decoration: underline;border: none;background: white;" @click="zcshow=!zcshow">{{ zcshow?'返回登陆':'立即注册' }}</button> </p>
                </div>
            </div>
        </div>
        
    </div>
</template>
<style scoped >
    .box{
        margin: 0 auto;
        padding: 0;
        border: 5px solid ghostwhite;
        border-radius: 2px;
        width: 700px;
        height: 500px;
        position: relative;
        background:#EFF6FF ;
    }
    .left{
        display: flex;
        width: 50%;
        margin-left: 20px;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        
    }
    .text{
        line-height: 20px;
        margin: 60px;
        margin-bottom: 0;
        p{
            font-size: 14px;
            color: #9CA3AF;
        }
    }
    .login{
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 6px;
        box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1); 
        display: flex;
        flex-direction: column;
    }
    .btn{
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-content: center;
        button{
            border: none;
            background: white;
            font-weight: 600;
        }
    }
    #p{
        margin-top: 10px;
    }
    .hr{
        display: flex;
        justify-content: center;
        margin-top: -10px;
        div{
            width: 45%;
            height: 3px;
            background: #E5E7EB;
        }
    }
    .input{
        display: flex;
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
        flex-direction: column;
        justify-content: space-between;
        #p{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>