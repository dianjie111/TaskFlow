<script setup lang="ts">
    import { onBeforeMount, ref} from 'vue';
    import {useRoute,useRouter} from "vue-router"
    import { selectHome } from './utils/request';
    const mode=ref(false)
    const route=useRoute()
    const router=useRouter()
    const data=ref({})

    const list=ref([
        {text:'首页',mode:true},
        {text:'项目',mode:false},
        {text:'任务',mode:false},
        {text:'日历',mode:false},
        {text:'成员',mode:false},
        {text:'报表',mode:false},
        {text:'设置',mode:false},
    ])


    const click=(text:string)=>{
        if (text=='首页'){
            router.push({path:'/home'})
            
        }
        else if (text=='项目'){
            router.push({path:'/projectList'})
        }
        else if (text=='任务'){
            router.push({path:'/rwView'})
        }
        else if (text=='日历'){
            router.push({path:'/rlView'})
        }
        else if (text=='成员'){
            router.push({path:'/People'})
        }
        else if (text=='报表'){
            router.push({path:'/tzView'})
        }
        else if (text=='设置'){
            router.push({path:'/Setting'})
        }
        const index = list.value.findIndex(item => item.text === text)
        for (let i=0;i<list.value.length;i++){
            if (i==index){
                if (list.value[index]){
                    list.value[index].mode=true
                } 
            }
            else{
                if (list.value[i]){
                    list.value[i].mode=false
                }
                
            }
        }
    }

    onBeforeMount(async()=>{
        let token=sessionStorage.getItem('token')
        data.value=await selectHome(token)
    })

</script>
<template>
    <div class="box" :style="{display:!route.meta.hide?'flex':'block',background:!route.meta.hide?'#F3F4F6':'white'}">
        <div class="left" v-if="!route.meta.hide">
            <div class="header">
                <h3>TaskFlow</h3>
                <div style="background: whitesmoke;height: 1px;width: 100%;"></div>
            </div>
            <div class="body">
                <button v-for="item in list" :key="item.text" @click="click(item.text)" class="click" :style="{background:item.mode?'#2563EB':'white',color:item.mode?'#EFF6FF':'black'}">{{ item.text }}</button>
            </div>
            <div class="under">
                <p >用户名：<span v-if="data">{{ data.message.username }}</span></p>
            </div>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
    
</template>
<style scoped >
    .box{
        width: 100%;
        height: 822px;
        margin: 0;
        padding: 0;
    }

    .left{
        height: 100%;
        width: 15%;
        background: white;
        border: 1px solid,#E5E7EB;
        display: flex;
        flex-direction: column;
        align-content: center;
        position: relative;
        h3{
            color: #2563EB;
            align-content: center;
        }
    }
    .header{
        width: 100%;
        margin: 30px;
        margin-left: 60px;
    } 
    .body{
        width: 90%;
        display: flex;
        height: 50%;
        flex-direction: column;
        justify-content: space-around;
        align-content: center;
        margin-left: 5%;
        button{
            background: white;
            border: none;
            border-radius: 5px;
            height: 50px;
        }
    }
    .under{
        text-align: center;
        margin-top: 40px;
    }
</style>