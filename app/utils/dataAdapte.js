/**
 *用于年平均温度、10年累计各月平均温度
 */
var dataAdaperchart = function(avg, max, min) {
    var list = {
        years: [],
        avg: [],
        max: [],
        min: []
    };
    var i = 0,
        j = 0,
        z = 0;
    $.map(avg, function(item, index) {
        list.years.push(item['date'].slice(0, 4) - 0);
        if (!item['value']) {
            item['value'] = 0;
            i++;
        }
        list.avg.push(item['value'].toFixed(1));
    });
    $.map(max, function(item, index) {
        if (!item['value']) {
            item['value'] = 0;
            j++;
        }
        list.max.push(item['value'].toFixed(1));
    });
    $.map(min, function(item, index) {
        if (!item['value']) {
            item['value'] = 0;
            z++;
        }
        list.min.push(item['value'].toFixed(1));
    });
    if (i === avg.length || j === max.length || z === min.length) {
        alert('数据获取失败！');
    };
    return list;
}
module.exports = {
    dataAdaperchart: dataAdaperchart
};