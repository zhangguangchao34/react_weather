import React from 'react';

// common less
import '../../styles/main.css';
import './dorpdown.css';

// props
// title: 当前选中的title
// status: dorpdown 根类名
// titleStatus: dorpdown-title 类名
// panelStatus: dorpdown-panel 类名
// iconStatus: 右边小三角的图标类名
// options: dorpdownList 数据
// options格式
// {city: {name: 'xzqh', value: '行政区划'},owner: {name: 'qsr',value: '权属人'}};


const DorpdownButton = React.createClass({
    getInitialState: function(){
        return {
            active: false,
            title: this.props.title || '请选择',
            iconClassName: this.props.iconStatus || 'fa fa-caret-down transit'
        }
    },

    togglePanel: function(){
        this.setState({
            active: !this.state.active
        });
    },

    renderDorpdownList: function(){
        var list = [],
            options = this.props.options,
            _this = this;

        if(this.props.itemType === 'link'){
            $.map(options, function(item, index){

                //TODO 做下拉菜单列表 关联路由
            });

            return list;
        }
        $.map(options, function(item, index){

            if(typeof item === 'string') {
                list.push(<p key={index} className={"dorpdown-item " + (_this.props.itemStatus || '')} data-id={index} data-name={index} onClick={_this.selectDorpdownItem}>{item}</p>);
            }else {
                list.push(<p key={index} className={"dorpdown-item " + (_this.props.itemStatus || '')} data-id={index} data-name={item.name} onClick={_this.selectDorpdownItem}>{item.value}</p>);
            }
        });

        return list;
    },

    selectDorpdownItem: function(e){
        var _this = this;
        this.togglePanel();
        var $node = $(e.target),
            value = $node.text();




        var selectedItem = {
            value: value,
            name: $node.attr('data-name'),
        };

        if(this.props.itemType !== 'link'){
            this.setState({
                title: selectedItem
            });
        }

        if(this.props.callback){
            this.props.callback(selectedItem);
        };
    },

    resetState: function(value){
        this.setState({
            title: value
        });
    },

    render: function(){
        return (
            <div className={"dorpdown " + (this.props.status || '')}>
                <div className={"dorpdown-title " + (this.props.titleStatus || '') + (this.state.active ? ' active' : '')} onClick={this.togglePanel}><span>{(typeof this.state.title) === 'string'? this.state.title:this.state.title.value}</span><i className={this.state.iconClassName}></i></div>
                <div className={"dorpdown-panel " + (this.props.panelStatus || '') + (this.state.active ? ' show' : '')} style={{display: 'none'}}>
                    {this.renderDorpdownList()}
                </div>

            </div>
        );
    }
});

export default DorpdownButton;