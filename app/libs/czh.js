var handleOption: function(data, target, x, value) {
	//写所有表格的option配置
	var options = {
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
			data: data.years
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
						if(w.data != "0") {
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
			data: data.monthhighday
		}, {
			name: '≤3℃天数',
			type: 'line',
			stack: '总量2',
			label: {
				normal: {
					show: true,
					position: 'top',
					formatter: function(w) {
						if(w.data != "0") {
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
			data: data.monthlowday
		}]
	};
}
return options;
}

export default handleOption;