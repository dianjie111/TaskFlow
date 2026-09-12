import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import '../public/style.css'
import Header from './view/header.vue'

//vue引入echarts
import {
    TitleComponent,      // 标题
    TooltipComponent,    // 提示框
    LegendComponent,     // 图例
    GridComponent,       // 网格
    DatasetComponent,    // 数据集
    TransformComponent   // 数据转换
} from 'echarts/components'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { 
    BarChart,      // 柱状图
    LineChart,     // 折线图
    PieChart,      // 饼图
    ScatterChart,  // 散点图
    GaugeChart     // 仪表盘
} from 'echarts/charts'
use([
    // 渲染器
    CanvasRenderer,
    
    // 图表类型
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    GaugeChart,
    
    // 组件
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
])

let app=createApp(App)
app.use(router)
app.component('v-chart', ECharts)
app.component('headers',Header)
app.mount('#app')
