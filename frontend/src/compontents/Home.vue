<script setup lang="ts">
    import { selectHome } from '../utils/request';
    import { onBeforeMount, ref, computed } from 'vue';
    import { homeDate } from '../utils/dataChuli';
    import type { EChartsOption } from 'echarts'

    interface shujv{
        text:string,
        count:number
    }
    

    const data=ref([])
    const list=ref<shujv[]>([])
    const task_list=ref([])
    const option=ref<EChartsOption>()
    const currentPage=ref(1)
    const pageSize=7
    const totalPages=computed(()=>Math.max(1,Math.ceil(task_list.value.length/pageSize)))
    const pageTasks=computed(()=>{
        const start=(currentPage.value-1)*pageSize
        return task_list.value.slice(start,start+pageSize)
    })
    
    
    
    onBeforeMount(async()=>{
        let token:string=sessionStorage.getItem('token')
        data.value=await selectHome(token)
        console.log(data.value)
        let [project_count,task_count,tast_doing,task_done,tk_list,all_task_doing,all_task_done]=homeDate(data.value)
        list.value=[
            {text:'项目总数',count:project_count},
            {text:'任务总数',count:task_count},
            {text:'进行中任务',count:all_task_doing},
            {text:'已完成任务',count:all_task_done}
        ]
        task_list.value=tk_list
        console.log(list.value)

        let echart_data=[
            {value:0,name:'未完成'},
            {value:tast_doing,name:'进行中'},
            {value:task_done,name:'已完成'}
        ]
        const total = echart_data.reduce((sum, item) => sum + item.value, 0);
        option.value={
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',      // 垂直排列
                right: '4%',             // 靠右，且留出足够空间避免超出画布
                top: 'middle',           // 垂直居中
                icon: 'circle',          // 圆形图标
                align: 'left',
                itemWidth: 8,            // 点更小
                itemHeight: 8,
                itemGap: 22,             // 增加间距，防止拥挤
                textStyle: {
                color: '#333',
                fontSize: 13,
                rich: {                // 富文本排版
                    name: { color: '#4B5563', width: 48, align: 'left' },
                    vp:   { color: '#111827', fontWeight: 'bold', width: 78, align: 'right' }
                }
                },
                formatter: (name) => {
                const item = echart_data.find(i => i.name === name);
                if (!item) return name;
                // 计算百分比，如果总数为 0 则避免 NaN
                const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
                // 格式：名称靠左，数值 (百分比%) 靠右
                return `{name|${name}}{vp|${item.value} (${percent}%)}`;
                }
            },

            series: [
                {
                name: '任务状态',
                type: 'pie',
                radius: ['38%', '52%'],
                center: ['28%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'center',
                    formatter: () => `{num|${total}}\n{txt|总任务}`,
                    rich: {
                    num: { color: '#111827', fontSize: 26, fontWeight: 'bold', lineHeight: 32 },
                    txt: { color: '#9CA3AF', fontSize: 13, lineHeight: 20 }
                    }
                },
                labelLine: { show: false },
                color: ['#F59E0B', '#3B82F6', '#22C55E'],
                data: echart_data
                }
            ]
        }
    })
    const prevPage=()=>{
        if(currentPage.value>1) currentPage.value--
    }
    const nextPage=()=>{
        if(currentPage.value<totalPages.value) currentPage.value++
    }

</script>
<template>
    <div class="box">
        <div class="header">
            <div class="left"><input type="text" placeholder="搜索项目，任务" ></div>
            <div class="right">欢迎回来</div>
        </div>
        <div class="content">
            <h3 style="padding: 20px;">首页</h3>
            <div class="contents">
                <div class="on">
                    <div class="card" v-for="(item,index) in list" :key="item.text" >
                        <p>{{ item.text }}</p>
                        <h3>{{ item.count }}</h3>
                    </div>
                </div>
                <div class="under">
                    <div class="uncard">
                        <h4>我负责的任务</h4>
                        <div v-for="(item,index) in pageTasks" :key="index">
                            <div    class="line">
                                <div class="uncd_left">{{ item.title }} <br><span style="color: #9CA3AF;font-size: 12px;">项目{{ item.project_name }}</span></div>
                                <div>{{ item.status=='doing'?'进行中':'已完成' }}</div>
                                <div style="width: 30%;">{{ item.deadline }}</div>
                            </div>
                        </div>
                        <div class="pagination">
                            <button @click="prevPage" :disabled="currentPage<=1">上一页</button>
                            <button @click="nextPage" :disabled="currentPage>=totalPages">下一页</button>
                        </div>
                    </div>
                    <div class="uncard">
                        <h4>任务状态分布</h4>
                        <v-chart class="chart" :option="option" autoresize />
                    </div>
                </div>
            </div>
        </div>
        <div class="under"></div>
    </div>
</template>
<style scoped >
    .box{
        width: 100%;
        height: 822px;
        min-width: 1276px;
    }
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
    .contents{
        width: 95%;
        margin: 0 auto;
    }
    .on{
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .card{
        background: white;
        width: 23%;
        border-radius: 10px;
        border: 1px solid #E5E7EB;
        p{
            font-size: 10px;
            color: #9CA3AF;
            padding-top: 10px;
        }
        p,h3{
            margin-left: 10px;
            text-align: center;
        }
    }
    .under{
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-top: 50px;
        
        h4{
            margin: 10px;
        }
    }
    .uncard{
        width: 47%;
        background: white;
        border-radius: 10px;
        border: 1px solid #E5E7EB; 
        height: 500px;
        box-sizing: border-box;
    }
    .line{
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-top: 10px;
        div{
            margin-left: 10px;
        }
    }
    .uncd_left{
        width: 40%;
    }
    .pagination{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin: 18px 0;
    }
    .pagination button{
        padding: 6px 22px;
        background: #fff;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        color: #374151;
        font-size: 14px;
        cursor: pointer;
    }
    .pagination button:disabled{
        color: #9ca3af;
        border-color: #e5e7eb;
        cursor: not-allowed;
        background: #f9fafb;
    }
    .chart{
        width: calc(100% - 20px);
        height: 400px;
        margin: 0 auto;
    }
</style>
