import React from 'react';
import { render } from 'react-dom';
import Tabs from './../components/Tabs/Tabs.jsx';
import DorpdownButton from './../components/Dorpdown/DorpdownButton.jsx';
import CheckGroup from './../components/Checkbox/Check.jsx';
require('./../styles/weatherstyle.css');
require('./../images/logo.png');
var ajaxServer = require('./../utils/ajax.js');
var echarts = require('echarts');
var DataAdape = require('./../utils/dataAdapte.js');
var chartOption = require('./../utils/chartOption.js');

const GroundInfo = React.createClass({

    tabTitles: {
        nianjunwen: {
            value: '年平均温度',
            hasCheck: 'true'
        },
        leijijunwen: {
            value: '10年累计各月平均温度',
            hasCheck: 'true'
        },
        nianjizhi: {
            value: '年极值温度天数',
            hasCheck: 'true'
        },
        leijigeyue: {
            value: '10年累计各月极值温度天数',
            hasCheck: 'true'
        },
        rijunwencha: {
            value: '日平均温差',
            hasCheck: 'true'
        },
        riwenchacha: {
            value: '日最大温差',
            hasCheck: 'true'
        },
        nianjiwen: {
            value: '≥10℃的年度积温',
            hasCheck: 'true'
        },
        wushuang: {
            value: '全年无霜天气',
            hasCheck: 'true'
        }
    },

    getInitialState: function () {
        //TODO 修改默认的tab页
        return {
            heightStyle: {
                height: "auto"
            },
            curTab: {
                index: 'nianjunwen',
                value: '年平均温度',
                hasCheck: 'true',
                city: {
                    name: 56281,
                    value: '浦江县寿安村'
                }
            }
        };
    },
    componentWillMount: function () {
        var mapHeight = document.documentElement.clientHeight - 40;
        this.setState({
            heightStyle: {
                height: mapHeight + 'px'
            },
        })
    },
    componentDidMount: function () {

    },

    TabsCallback: function (options) {
        var list = [];
        var _this = this;
        var curTab = this.state.curTab;
        // console.log(options);
        if (curTab.options) {
            window.localStorage.setItem(curTab.value, JSON.stringify(curTab));

        }



        var chartOptions = window.localStorage.getItem('options.value');
        if (chartOptions && chartOptions !== 'undefined') {
            chartOptions = JSON.parse(chartOptions);
        }
        //TODO 写入localstorage
        if (chartOptions && chartOptions.city) {
            options.city = chartOptions.city;
            this.refs.cityDorpdown.resetState(chartOptions.city.value);

        } else {
            options.city = {
                name: 56281,
                value: '浦江县寿安村'
            };
            this.refs.cityDorpdown.resetState(curTab.city.value);

        }

        var monthCheckOptions = {
            'yiyue': {
                text: '一月',
                value: '1',
                checked: false
            },
            'eryue': {
                text: '二月',
                value: '2',
                checked: false
            },
            'sanyue': {
                text: '三月',
                value: '3',
                checked: false
            },
            'siyue': {
                text: '四月',
                value: '4',
                checked: false
            },
            'wuyue': {
                text: '五月',
                value: '5',
                checked: false
            },
            'liuyue': {
                text: '六月',
                value: '6',
                checked: false
            },
            'qiyue': {
                text: '七月',
                value: '7',
                checked: false
            },
            'bayue': {
                text: '八月',
                value: '8',
                checked: false
            },
            'jiuyue': {
                text: '九月',
                value: '9',
                checked: false
            },
            'shiyue': {
                text: '十月',
                value: '10',
                checked: false
            },
            'shiyiyue': {
                text: '十一月',
                value: '11',
                checked: false
            },
            'shieryue': {
                text: '十二月',
                value: '12',
                checked: false
            }
        };

        options.month = [];
        if (chartOptions && chartOptions.month) {
            $.map(chartOptions.month, function (item, index) {
                monthCheckOptions[item.key].checked = !monthCheckOptions[item.key].checked;
                month.push(item.value - 0);
            });
        }
        this.setState({
            curTab: options
        });
        if (this.refs.monthCheckgroup) {
            this.refs.monthCheckgroup.resetState(monthCheckOptions);
        }
        // var component = $('chartsComponent');
        // if (component.children().length > 0) {
        //     component.empty();
        // }
        return list
    },
    renderTabContainer: function () {
        var list = [],
            _this = this;
        list.push(
            <div key="left" className="tab-panel-left">
                {_this.renderTabPanelLeft() }
            </div>

        );
        list.push(<div key="right" className="tab-panel-right">
            {_this.renderTabPanelRight() }
        </div>);


        return list;
    },

    renderTabPanelLeft: function () {


        var list = [];
        var curTab = this.state.curTab;
        var _this = this;
        switch (curTab.value) {

            case '年平均温度':
                var monthOptions = "[1,2,3,4,5,6,7,8,9,10,11,12]";
                if (curTab.month && curTab.month.length > 0) {
                    monthOptions = "[" + curTab.month.toString() + "]";
                }
                var city = curTab.city.name;
                var url = 'http://dev.gagogroup.cn/api//weather/analysis/annual_average_temperature?stid=' + city + '&years=[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014]&months=' + monthOptions + '&type=tmp';
                var yearsavg = $.ajax({
                    type: 'get',
                    url: url
                });
                var yearsmax = $.ajax({
                    type: 'get',
                    url: 'http://dev.gagogroup.cn/api//weather/analysis/annual_average_temperature?stid=' + city + '&years=[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014]&months=' + monthOptions + '&type=tmax'
                });
                var yearsmin = $.ajax({
                    type: 'get',
                    url: 'http://dev.gagogroup.cn/api//weather/analysis/annual_average_temperature?stid=' + city + '&years=[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014]&months=' + monthOptions + '&type=tmin'
                });
                $.when(yearsavg, yearsmax, yearsmin).done(function (a, b, c) {

                    var list = DataAdape.dataAdaperchart(a[0].data, b[0].data, c[0].data);
                    var chart = echarts.init(document.getElementById('chartsComponent'));
                    chart.setOption(chartOption.junwenChart(list));
                    window.onresize = function () {
                        chart.resize();
                    };
                }).fail(function () {
                    alert("数据获取失败");
                });
                break;
            case '10年累计各月极值温度天数':
                var monthOptions = "[1,2,3,4,5,6,7,8,9,10,11,12]";
                if (curTab.month && curTab.month.length > 0) {
                    monthOptions = "[" + curTab.month.toString() + "]";
                }
                var city = curTab.city.name;
                var url = 'http://dev.gagogroup.cn/api//weather/analysis/monthly_average_temperature?stid=' + city + '&years=[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014]&months=' + monthOptions + '&type=tmp';
                var yearsavg = $.ajax({
                    type: 'get',
                    url: url
                });
                var yearsmax = $.ajax({
                    type: 'get',
                    url: 'http://dev.gagogroup.cn/api//weather/analysis/monthly_average_temperature?stid=' + city + '&years=[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014]&months=' + monthOptions + '&type=tmax'
                });
                var yearsmin = $.ajax({
                    type: 'get',
                    url: 'http://dev.gagogroup.cn/api//weather/analysis/monthly_average_temperature?stid=' + city + '&years=[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014]&months=' + monthOptions + '&type=tmin'
                });
                $.when(yearsavg, yearsmax, yearsmin).done(function (a, b, c) {
                    var list = DataAdape.dataAdaperchart(a[0].data, b[0].data, c[0].data);
                    var chart = echarts.init(document.getElementById('chartsComponent'));
                    chart.setOption(chartOption.yuejunwenChart(list));
                    window.onresize = function () {
                        chart.resize();
                    };
                }).fail(function () {
                    alert("数据获取失败");
                });
                break;
            default:
                $('#chartsComponent').html('');

                return <div>{this.state.curTab.value}</div>

        }
    },

    getWeatherSuccess: function (data) {
        if (!data.data || data.data.length === 0) {
            console.log("请求失败或请求结果无数据");
            return;
        }
        var chart = echarts.init(document.getElementById('chartsComponent'));
        chart.setOption(option);
        window.onresize = function () {
            chart.resize();
        };
    },

    renderTabPanelRight: function () {
        var list = [];
        var _this = this;
        var city = this.renderSelectCity();
        var month = this.renderSelectMonth();


        list.push(<div key="city" className="side-box"><h4 className="side-title">地区选择</h4><div className="side-component">{city}</div></div>);
        if (this.state.curTab.hasCheck === 'true') {
            list.push(<div key="month" className="side-box"><h4 className="side-title">月份选择（日期）</h4><div className="side-component">{month}</div></div>);
        }


        return list;
    },

    selectCityCallback: function (options) {
        console.log("城市选择框："); console.log(options);
        var curTab = this.state.curTab;

        curTab.city = options;
        this.setState({
            curTab: curTab
        });
    },
    renderSelectCity: function () {
        var list = [],
            _this = this,
            filterOptions = {
                56281: '浦江县寿安村',
                57315: '仪陇县赛金镇'
            };

        list.push(<DorpdownButton ref="cityDorpdown" key="buttons" options={filterOptions} title="浦江县寿安村" callback={_this.selectCityCallback}>
        </DorpdownButton>);
        return list;
    },

    renderSelectMonth: function () {
        var list = [],
            _this = this;
        var monthCheckOptions = {
            'quanbu': {
                text: '全部',
                value: '0',
                checked: true
            },
            'yiyue': {
                text: '一月',
                value: '1',
                checked: false
            },
            'eryue': {
                text: '二月',
                value: '2',
                checked: false
            },
            'sanyue': {
                text: '三月',
                value: '3',
                checked: false
            },
            'siyue': {
                text: '四月',
                value: '4',
                checked: false
            },
            'wuyue': {
                text: '五月',
                value: '5',
                checked: false
            },
            'liuyue': {
                text: '六月',
                value: '6',
                checked: false
            },
            'qiyue': {
                text: '七月',
                value: '7',
                checked: false
            },
            'bayue': {
                text: '八月',
                value: '8',
                checked: false
            },
            'jiuyue': {
                text: '九月',
                value: '9',
                checked: false
            },
            'shiyue': {
                text: '十月',
                value: '10',
                checked: false
            },
            'shiyiyue': {
                text: '十一月',
                value: '11',
                checked: false
            },
            'shieryue': {
                text: '十二月',
                value: '12',
                checked: false
            }
        };

        list.push(<CheckGroup ref="monthCheckgroup" key="checkbox" options={monthCheckOptions} callback={_this.CheckMonthCallback}></CheckGroup>);

        return list;
    },

    CheckMonthCallback: function (data) {

        var curTab = this.state.curTab;

        if (!curTab.options) {
            curTab.options = {};

        }
        curTab.month = [];

        $.map(data, function (item) {
            curTab.month.push(item.value - 0);
        });


        this.setState({
            curTab: curTab
        });
    },

    render() {

        return (
            <div id="weather" className="weather" style={{ height: '100%', background: '#00a0e8', padding: '20px' }}>
                <Tabs options={this.tabTitles} callback={this.TabsCallback}>
                    <div key="left" className="tab-panel-left">
                        <div id="chartsComponent" style={{ height: '100%' }}>{this.renderTabPanelLeft() }</div>
                    </div>
                    <div key="right" className="tab-panel-right">
                        {this.renderTabPanelRight() }
                    </div>
                </Tabs>
            </div>
        )
    }
})
export default GroundInfo;
