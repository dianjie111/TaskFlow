<script setup lang="ts">
    import { onBeforeMount, ref, computed,inject} from 'vue';
    import {useRoute,useRouter} from "vue-router"
    import { selectHome } from './utils/request';
    import { useShow } from './utils/show';
    const mode=ref(false)
    const route=useRoute()
    const router=useRouter()
    const data=ref({})
    const username=ref('')
    const {show}=useShow()

    const list=ref([
        {text:'首页',path:'/home'},
        {text:'项目',path:'/projectList'},
        {text:'任务',path:'/rwView'},
        {text:'日历',path:'/rlView'},
        {text:'成员',path:'/People'},
        {text:'报表',path:'/tzView'},
        {text:'设置',path:'/Setting'},
    ])

    // 当前页面对应的侧边栏项，直接由路由推导，刷新后也能保持正确高亮
    const currentText=computed(()=>{
        const item=list.value.find(i=>i.path===route.path)
        return item?item.text:''
    })


    const click=(text:string)=>{
        const item=list.value.find(i=>i.text===text)
        if (item){ router.push({path:item.path}) }
    }

    onBeforeMount(async()=>{
        let token:string=sessionStorage.getItem('token')
        if (token!='default'){
            data.value=await selectHome(token)
            if (data.value){
                username.value=data.value.message['username']
            }
        }
        
    })

</script>
<template>
        <div class="box"  :style="{display:!route.meta.hide?'flex':'block',background:!route.meta.hide?'#F3F4F6':'white'}">
            <div class="left" v-if="!route.meta.hide">
                <div class="header">
                    <h3>TaskFlow</h3>
                    <div style="background: whitesmoke;height: 1px;width: 100%;"></div>
                </div>
                <div class="body">
                    <button v-for="item in list" :key="item.text" @click="click(item.text)" class="click" :style="{background:item.text===currentText?'#2563EB':'white',color:item.text===currentText?'#EFF6FF':'black'}">{{ item.text }}</button>
                </div>
                <div class="under">
                    <p >用户名：<span v-if="data">{{ username }}</span></p>
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
        z-index: 99;
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
        margin-top: 30px;
        h3{
            margin-left: 60px;
        }
        
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