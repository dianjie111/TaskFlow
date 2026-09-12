<template>
    <div class="header">
        <div class="left"><input type="text" placeholder="搜索项目，任务" ></div>
        <div class="right">欢迎回来</div>
    </div>
</template>
<style scoped>
    .header{
        width: 100%;
        background: white;
        border: 1px solid #E5E7EB;
        height: 7%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .left{
        
        input{
            border: 1px solid #E5E7EB;
            height: 30px;
            margin: 10px;
            margin-right: 20px;
        }
    }
    .right{
        color: #9CA3AF;
        margin-right: 20px;
    }
</style>