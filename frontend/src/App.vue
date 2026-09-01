<script setup lang="ts">
    import { ref} from 'vue';
    import {selectLogin,createLogin} from './utils/request'
    import {useRoute} from "vue-router"
    const mode=ref(false)
    const route=useRoute()

    const list=ref([
        {text:'首页',mode:true},
        {text:'项目',mode:false},
        {text:'任务',mode:false},
        {text:'日历',mode:false},
        {text:'成员',mode:false},
        {text:'报表',mode:false},
        {text:'设置',mode:false},
    ])


</script>
<template>
    <div class="box" :style="{display:!route.meta.hide?'flex':'block',background:!route.meta.hide?'#F3F4F6':'white'}">
        <div class="left" v-if="!route.meta.hide">
            <div class="header">
                <h3>TaskFlow</h3>
                <div style="background: whitesmoke;height: 1px;width: 100%;"></div>
            </div>
            <div class="body">
                <button v-for="item in list" :key="item.text" class="click">{{ item.text }}</button>
            </div>
            <div class="under">

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
        button:hover{
            background: #2563EB;
            color: #EFF6FF;
            border: none;
        }
    }
</style>