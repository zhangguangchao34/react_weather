/**
 * 添加天气echart图表
 */
var echarts = require('echarts');
var $=require('../../bower_components/jquery/dist/jquery');
var weatherEcharts = function(x, y, type) {
    var resultdata = [];
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
    var date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    var hour = myDate.getHours();
    var timest = year + "-" + month + "-" + date;
    var url = 'http://123.56.205.244:8004/weather/predict/array/raw?lon=' + x + '&lat=' + y + '&token=29e15fafd4a3d5d6ca2d121c49131587';
    $.ajax({
        type: 'get',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            if (type == "1") {
                var datahour = [];
                var finale = [];
                var dataf = [];
                var dataResult = data.results;
                if (!dataResult)
                    return resultdata.push("数据更新中");
                for (var i = 0; i < dataResult.length; i++) {
                    if (timest == dataResult[i].frcstdate) {
                        dataf.push(dataResult[i]);
                    }
                }
                for (var j = 0; j < dataf.length; j++) {
                    if (hour >= dataf[j].frcsthour) {
                        console.log(dataf[j]);
                        datahour.push(dataf[j]);
                    }else{
                        datahour.push(dataf[0]);
                    }
                }
                resultdata.push((datahour[datahour.length - 1].val[0]).toFixed(2), (datahour[datahour.length - 1].val[1]).toFixed(2), (datahour[datahour.length - 1].val[2]).toFixed(2), (datahour[datahour.length - 1].val[3]).toFixed(2), (datahour[datahour.length - 1].val[5]).toFixed(2), (datahour[datahour.length - 1].val[4]).toFixed(2), datahour[datahour.length - 1].val[6], datahour[datahour.length - 1].val[7]);

            } else {
                var dataxAxis = [],
                    dataseries = [],
                    findatazm = [], //降水
                    jwfinadata = [],
                    xdwdfinadata = [];
                var datarelut = data.results;

                for (var j = 0; j < datarelut.length; j++) {
                    var time = datarelut[j].frcstdate.substring(5, 7) + '月' + datarelut[j].frcstdate.substring(8, 10) + '日' + datarelut[j].frcsthour + '时';
                    dataxAxis.push(time);
                    findatazm.push((datarelut[j].val[0]).toFixed(2)); //降水
                    jwfinadata.push((datarelut[j].val[5]).toFixed(2)); //均温
                    xdwdfinadata.push((datarelut[j].val[2]).toFixed(2)); //相对温度
                };

                /*降水*/
                var jsoption = {
                    title: {
                        text: '降水',
                        padding: 15
                    },
                    tooltip: {
                        trigger: 'axis'
                            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            // }
                    },
                    legend: {
                        data: type,
                        textStyle: {
                            color: '#585858'
                        }
                    },
                    backgroundColor: '#ffffff',
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '3%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: [{
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: { color: '#585858' },
                            interval: 7

                        },
                        type: 'category',
                        data: dataxAxis
                    }],
                    yAxis: [{
                        nameGap: 10,
                        nameTextStyle: {
                            color: '#585858'
                        },
                        name: '单位:mm',
                        axisLabel: { textStyle: { color: '#585858' } },
                        type: 'value'
                    }],
                    series: [{
                        name: '降水',
                        type: 'line',
                        stack: '总量',
                        data: findatazm
                    }]
                };
                /*均温*/
                var jwoption = {
                    title: {
                        text: '均温',
                        padding: 15
                    },
                    tooltip: {
                        trigger: 'axis'
                            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            // }
                    },
                    backgroundColor: '#ffffff',
                    legend: {
                        data: type,
                        textStyle: {
                            color: '#585858'
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '3%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: [{
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: { color: '#585858' },
                            interval: 7

                        },
                        type: 'category',
                        data: dataxAxis
                    }],
                    yAxis: [{
                        nameGap: 10,
                        nameTextStyle: {
                            color: '#585858'
                        },
                        name: '单位:℃',
                        axisLabel: { textStyle: { color: '#585858' } },
                        type: 'value'
                    }],
                    series: [{
                        name: '均温',
                        type: 'line',
                        stack: '总量',
                        data: jwfinadata,
                        markLine: {
                            data: [{
                                name: '警戒线',
                                yAxis: 28
                            }]
                        }
                    }]
                };
                var xdwdoption = {
                    title: {
                        text: '相对湿度',
                        padding: 15
                    },
                    tooltip: {
                        trigger: 'axis'
                            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            // }
                    },
                    backgroundColor: '#ffffff',
                    legend: {
                        data: type,
                        textStyle: {
                            color: '#585858'
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '3%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: [{
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: { color: '#585858' },
                            interval: 7

                        },
                        type: 'category',
                        data: dataxAxis
                    }],
                    yAxis: [{
                        nameGap: 10,
                        nameTextStyle: {
                            color: '#585858'
                        },
                        name: '单位:%',
                        axisLabel: { textStyle: { color: '#585858' } },
                        type: 'value'
                    }],
                    series: [{
                        name: '相对湿度',
                        type: 'line',
                        stack: '总量',
                        data: xdwdfinadata,
                        markLine: {
                            data: [{
                                name: '警戒线',
                                yAxis: 70
                            }]
                        }
                    }]
                };
                var myChart = echarts.init(document.getElementById("main"));
                myChart.setOption(jsoption);
                var jwmyChart = echarts.init(document.getElementById("main1"));
                jwmyChart.setOption(jwoption);
                var xdwdmyChart = echarts.init(document.getElementById("main2"));
                xdwdmyChart.setOption(xdwdoption);
                setTimeout(function() {
                    window.onresize = function() {
                        myChart.resize();
                        jwmyChart.resize();
                        xdwdmyChart.resize();
                    }
                }, 1);
            }
        },
        error: function(data) {
            $('#main').html('数据正在跟新中......');
        }
    });
    return resultdata||"";
}

module.exports = weatherEcharts;
