import React from 'react';
import {Link} from 'react-router';

// common less
import '../../styles/main.css';

// props
// title: 当前选中的title
// status: dorpdown 根类名
// titleStatus: dorpdown-title 类名
// panelStatus: dorpdown-panel 类名
// iconStatus: 右边小三角的图标类名


const Dorpdown = React.createClass({
    getInitialState: function(){
        return {
            active: false,
            iconClassName: this.props.iconStatus || 'fa fa-caret-down transit'
        }
    },

    togglePanel: function(){
        this.setState({
            active: !this.state.active
        });
    },


    //TODO className的定制问题
    render: function(){
        return (
            <div className={"dorpdown " + this.props.status}>
                <div className={"dorpdown-title " + (this.props.titleStatus || '') + (this.state.active ? ' active' : '')} onClick={this.togglePanel}>{this.props.title}<i className={this.state.iconClassName}></i></div>
                <div className={"dorpdown-panel " + (this.props.panelStatus || '') + (this.state.active ? ' show' : '')} style={{display: 'none'}}>
                    {this.props.children}
                </div>

            </div>
        );
    }
});

export default Dorpdown;