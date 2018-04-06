/**
 * Created by Jepson on 2018/3/30.
 */

$(function() {

  // 第一个图表: 柱状图
  // 1. 准备 dom
  var eharts_1 = echarts.init(document.querySelector(".charts_1"));
  
  // 2. 指定图表的配置项和数据
  var option = {
    title: {
      // 大标题
      text: '2017年注册人数'
    },
    // 提示框
    tooltip: {},
    // 图例
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 2500, 1200, 600, 1800]
    }]
  };
  
  // 3. 使用刚指定的配置项和数据显示图表。
  eharts_1.setOption(option);
  
  
  // 第二个图表: 饼状图
  var eharts_2 = echarts.init(document.querySelector(".charts_2"));
  
  // 2. 指定图表的配置项和数据
  var option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','李宁','新百伦','阿迪王']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'李宁'},
          {value:135, name:'新百伦'},
          {value:1548, name:'阿迪王'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  
  // 3. 使用刚指定的配置项和数据显示图表。
  eharts_2.setOption(option2);
})