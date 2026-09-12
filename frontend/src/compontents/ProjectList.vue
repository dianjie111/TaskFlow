<script setup lang="ts">
    import { selectProject,createProject } from '../utils/request';
    import { ref,onBeforeMount,provide } from 'vue';
    import { useShow } from '../utils/show';

    const token=ref<string>('')
    const name=ref<string>('')
    const description=ref<string>('')
    const owner=ref<string>('')
    const {show,open,stop}=useShow()

    

    onBeforeMount(async()=>{
        token.value=sessionStorage.getItem('token')
        let res=await selectProject(token.value)
        owner.value=res.username

    })

    const showClick_yes=()=>{
        open()
        
    }
    const showClick_no=()=>{
        stop()
        name.value=''
        description.value=''
        owner.value=''
    }

    const createClick=async ()=>{
        if (name.value!=''){
            let res=await createProject(token.value,name.value,description.value,owner.value)
            if (res=='ok'){
                stop()
                name.value=''
                description.value=''
                owner.value=''
            }
        }
        else{
            alert('请输入项目名称')
        }
        
    }
</script>
<template>
    <div class="box">
        <headers></headers>
        <div class="content">
            <div class="one"><span style="font-weight: 600;font-size: 19px;">项目</span><button class="showbtn" @click="showClick_yes">+  新建项目</button></div>
            <Transition name="mask-fade">
                <div class="mask" v-show="show"></div>
            </Transition>
            <Transition name="box-pop">
            <div class="new" v-show="show">
                <div class="one" style="padding: 0;font-size: 20px;"><span style="font-weight: 600;">新建项目</span><button class="lastbtn" @click="showClick_no">X</button></div>
                <p style="margin-top:20px ;">项目名称 <span style="color: red;">*</span></p>
                <input type="text" v-model="name" placeholder="请输入项目名称" width="90" style="height: 25px;border-radius: 5px;border: 1px solid #E5E7EB;">
                <p style="margin-top: 15px;">项目描述</p>
                <textarea name="" id="" cols="10" rows="10" v-model="description" placeholder="请输入项目描述(可选)"></textarea>
                <p style="margin-top: 15px;text-align: center;"><button class="no" @click="showClick_no">取消</button><button class="yes" @click="createClick">创建项目</button></p>
            </div>
            </Transition>
        </div>
    </div>
</template>
<style scoped >
    .box{
        width: 100%;
        height: 822px;
        min-width: 1276px;
    }
    .one{
        display: flex;
        padding: 20px;
        justify-content: space-between;
    }
    .showbtn{
        color: white;
        border-radius: 5px;
        background: #3B82F6;
        border: 0;
    }
    .new{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-height: 90%;
        overflow: auto;
        width: 40%;
        background: white;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-content: center;
        z-index: 999;
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    }
    .mask-fade-enter-active,
    .mask-fade-leave-active{
        transition: opacity 0.25s ease;
    }
    .mask-fade-enter-from,
    .mask-fade-leave-to{
        opacity: 0;
    }
    .box-pop-enter-active{
        transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .box-pop-leave-active{
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .box-pop-enter-from,
    .box-pop-leave-to{
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
    }
    .lastbtn{
        border: none;
        background: white;
    }
    .no{
        width: 60px;
    }
    .yes{
        background: #2563EB;
        border: 1px solid black;
        color: white;
        margin-left: 10px;
        width: 100px;
        height: 30px;
        border-radius: 5px;
    }
</style>
