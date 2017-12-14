import React from 'react';
import { Link } from 'react-router';
import './Tabs.less';

// common less
import '../../libs/styles/bootstrap.min.css';
import '../../styles/main.css';
require('bootstrap');


const Tabs = React.createClass({
    getInitialState() {
        return {
            curTab: {}
        }
    },
    componentWillMount: function () {
        var mapHeight = document.documentElement.clientHeight - 40;
        this.setState({
            heightStyle: {
                height: mapHeight + 'px'
            },
        });
    },
    componentDidMount: function () {

    },

    renderTabsNav: function(){
         var list = [];
        var _this = this;
        var nav = this.props.options;
        $.map(nav, function(item, index){
            list.push(<li className={"tabs-nav-item " + (_this.state.curTab.index === index? 'active' : '')} key={index} data-name={index}  data-check={item.hasCheck} onClick={_this.togglePanel}>{item.value}</li>);
        });

        return <ul className="clearfix">{list}</ul>;
    },

   
    togglePanel: function(e){
        var $node = $(e.target);
        var curTab =  {
                index: $node.attr('data-name'),
                value: $node.text(),
                hasCheck: $node.attr('data-check')
            };
        this.setState({
            curTab: curTab
        });
        this.props.callback(curTab);
    },

    render() {
        return (
            <div className="tabs">
                <div className="tabs-nav">
                    {this.renderTabsNav()}
                </div>
                <div className="tabs-component">
                        {this.props.children}
                </div>
            </div>
        )
    }
});

export default Tabs