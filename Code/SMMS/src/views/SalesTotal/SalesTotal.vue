<template>
    <div class="sales-total">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h3>销售统计</h3>
            </div>
            <!-- 选择日期 -->
            <div class="text item">  
                <div class="block">
                    <span class="demonstration">时间：</span>
                    <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                         <!-- 选择项 -->
                     <el-select v-model="select" placeholder="销售情况统计">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                            </el-select>
                        <el-button type="success">提交</el-button>
                </div>
                  <el-button type="success" @click="getData">加载新数据</el-button>
          </div>
            <!-- 1 准备一个容器 -->
     <div id="sellCharts" style="height:400px;"></div>
</el-card>
    </div>
</template>

<script>
//引入请求数据
import { getSellData } from '@/api/goods';
export default {
     name: 'hello',
        data () {
        return {
            // 选择的日期
            date: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            //选择项
            select:'',
            options:[
                  {
                    value: '选项1',
                    label: '黄金糕'
                 },
                  {
                    value: '选项2',
                    label: '黄金糕'
                 },
              ],
              xData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              seriesData:[820, 932, 901, 934, 1290, 1330, 1320],
           }
           //选择项
           
        },
        mounted(){
              //写配置 
            var option = {
                    //x轴
                    xAxis: {
                    type: 'category',
                    data: this.xData
                },
                   //y轴
                   yAxis: {
                    type: 'value'
                  },
                   //核心数据
                series: [{
                    data: this.seriesData,
                    type: 'bar'
                }]
              }
        this.drawCharts(option);  // 初始化
        },
        methods: {
            //加载数据
          getData(){
               getSellData()
                  .then(res =>{
                    //接收参数
                    let { category, value } =res;
                     //渲染
                     this.xData = category;
                     this.seriesData = value;
                        //写配置 
                        var option = {
                                //x轴
                                xAxis: {
                                type: 'category',
                                data: this.xData
                            },
                            //y轴
                            yAxis: {
                                type: 'value'
                            },
                            //核心数据
                            series: [{
                                data: this.seriesData,
                                type: 'line'
                            }]
                        }

                     this.drawCharts(option) //重新渲染数据
                //console.log(res);
                  })
                  .catch(err =>{
                      console.log(err);
                  })
                  
          },
            // 生成报表的函数
           drawCharts(option){
            // 基于准备好的dom，初始化echarts实例
            var sellCharts = this.echarts.init( document.getElementById('sellCharts') )
           
                // 3. 使用配置生成报表
            sellCharts.setOption( option )
          }
        }

}
</script>

<style lang="less">
   .sales-total{
        // 面板组件
        .el-card {
            // 面板头
            .el-card__header {
                background-color: #f1f1f1;
            }
            .el-card__body{
                .el-select{
                    margin-left: 5px;
                    margin-right: 5px;
                }
            }
        }
   }
</style>
