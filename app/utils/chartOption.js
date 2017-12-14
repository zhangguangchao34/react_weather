//年平均温度 optionData:{years:[],avg:[],max:[],min:[]}
var junwenChart = function(optionData) {
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['平均温度', '最高温度', '最低温度']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            //  name: '单位:年',
            // axisLabel: { textStyle: { color: '#585858' } },
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            name: '单位:℃',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },
        series: [{
            name: '平均温度',
            type: 'line',
            stack: '总量1',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#EEAD0E',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.avg
        }, {
            name: '最高温度',
            type: 'line',
            stack: '总量2',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF4500',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }, {
            name: '最低温度',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#008B8B',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.min
        }]
    };
    return option;
};

//10年累计各月平均温度 optionData:{years:[],avg:[],max:[],min:[]}
/*var yuejunwenChart = function(optionData) {
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['平均温度', '最高温度', '最低温度']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            name: '单位:℃',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },

        series: [{
            name: '平均温度',
            type: 'line',
            stack: '总量1',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#EEAD0E',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.avg
        }, {
            name: '最高温度',
            type: 'line',
            stack: '总量2',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF4500',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }, {
            name: '最低温度',
            type: 'line',
            stack: '总量3',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#008B8B',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.min
        }]
    }
    return option;
};*/

//极值温度天数 optionData:{years:[],max:[],min:[]}
/*
var nianjizhiChart = function(optionData) {
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['≥35℃天数', '≤-3℃天数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            name: '单位:天',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },
        series: [{
            name: '≥35℃天数',
            type: 'line',
            stack: '总量2',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(w) {
                        if (w.data != "0") {
                            return w.data;
                        } else {
                            return '';
                        }
                    },
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF4500',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }, {
            name: '≤-3℃天数',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#008B8B',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.min
        }]
    };
    return option;
}
*/

//10年累计各月极值温度天数 optionData:{years:[],max:[],min:[]}
var yuejizhiChart = function(optionData) {
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['≥35℃天数', '≤3℃天数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            name: '单位:天',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },

        series: [{
            name: '≥35℃天数',
            type: 'line',
            stack: '总量3',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(w) {
                        if (w.data != "0") {
                            return w.data;
                        } else {
                            return '';
                        }
                    },
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF4500',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }, {
            name: '≤3℃天数',
            type: 'line',
            stack: '总量2',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(w) {
                        if (w.data != "0") {
                            return w.data;
                        } else {
                            return '';
                        }
                    },
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#008B8B',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.min
        }]
    };
    return option;
}

//日平均温差 optionData:{years:[],max:[]}
var rijunwenchaChart = function(optionData) {

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data: ['平均值']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            nameGap: 10,
            nameTextStyle: {
                color: '#585858'
            },
            name: '单位:℃',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },
        series: [{
            name: '平均值',
            type: 'line',
            stack: '总量2',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#EEAD0E',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }]
    };
    return option;
}
//日最大温差 optionData:{years:[],max:[]}
var rizuidawenchaChart = function(optionData) {
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data: ['最大值']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            nameGap: 10,
            nameTextStyle: {
                color: '#585858'
            },
            name: '单位:℃',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },
        series: [{
            name: '最大值',
            type: 'line',
            stack: '总量2',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#EEAD0E',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }]
    };
    return option;
}

//≥10℃的年度积温 optionData:{years:[],max:[]}
var junwenChart10 = function(optionData) {
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        // legend: {
        //     data: ['均温']
        // },
        grid: {
            left: '2%',
            right: '3%',
            bottom: '5%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            nameGap: 10,
            nameTextStyle: {
                color: '#585858'
            },
            name: '单位:℃',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },
        series: [{
            name: '积温',
            type: 'bar',
            barWidth: '50%',
            stack: '总量2',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#4169E1',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }]
    };
    return option;
}

//全年无霜天数 optionData:{years:[],max:[]}
var wushuangChart = function(optionData) {
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        // legend: {
        //     data: ['无霜天数']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: optionData.years
        },
        yAxis: {
            nameGap: 10,
            nameTextStyle: {
                color: '#585858'
            },
            name: '单位:天',
            axisLabel: {
                textStyle: {
                    color: '#585858'
                }
            },
            type: 'value'
        },
        series: [{
            name: '无霜天数',
            type: 'bar',
            stack: '总量2',
            barWidth: '50%',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontSize: 6
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#4169E1',
                },
                emphasis: {
                    color: 'rgb(0,156,226)'
                }
            },
            data: optionData.max
        }]
    };
    return option;
}

module.exports = {
    junwenChart: junwenChart, //年平均温度
    yuejunwenChart: yuejunwenChart, //10年累计各月平均温度
    nianjizhiChart: nianjizhiChart, //极值温度天数
    yuejizhiChart: yuejizhiChart, //10年累计各月极值温度天数
    rijunwenchaChart: rijunwenchaChart, //日平均温差
    rizuidawenchaChart: rizuidawenchaChart, //日最大温差
    junwenChart10: junwenChart10, //≥10℃的年度积温
    wushuangChart: wushuangChart, //全年无霜天数
};