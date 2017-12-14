import React from 'react';
import { Link } from 'react-router';
import './Navbar.less';

// common less
import '../../libs/styles/bootstrap.min.css';
import '../../styles/main.css';
require('bootstrap');

var logoImg = require('../../images/logo.png');

// nav menu items config
var NAV_CONFIG = require('../../configs/nav_config.js');


const Navbar = React.createClass({
    getInitialState() {
        return {
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



    // generate nav html
    generateNavMenuItems: function () {
        var doms = [],
            i = 0;

        for (; i < NAV_CONFIG.length; i++) {
            // if has son menu
            if (NAV_CONFIG[i].hasOwnProperty('sonList')) {
                if(NAV_CONFIG[i].sonList.length) {
                    var sonListDoms = [];
                    for (var t = 0; t < NAV_CONFIG[i].sonList.length; t++) {
                        sonListDoms.push(<li key={NAV_CONFIG[i].sonList[t].link}><Link to={ NAV_CONFIG[i].sonList[t].link } activeStyle={{ color: '#42a5f5' }}>{ NAV_CONFIG[i].sonList[t].navName }</Link></li>);
                    }

                    doms.push(
                        <li key={NAV_CONFIG[i].link}>
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                aria-haspopup="true" aria-expanded="false">
                                { NAV_CONFIG[i].navName }<span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                {sonListDoms}
                            </ul>
                        </li>);
                }
            } else {
                // if has not son menu
                doms.push(<li key={NAV_CONFIG[i].link}><Link to={ NAV_CONFIG[i].link } activeStyle={{ color: '#42a5f5' }}>{ NAV_CONFIG[i].navName }</Link></li>);
            }
        }

        return doms;
    },



    render() {
        return (
            <div className="navbar navbar-default navbar-fixed-top navbar-gago">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a href="#" className="navbar-brand" style={{ padding: 0 }}><img width="50" height="50" className="img-responsive"
                            src={logoImg} alt="gagogroup" /></a>
                        <span style={{ lineHeight: "50px", height: "50px", color: "#000", fontSize: "17px" }}>佳格耘境数字服务平台</span>
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav" style={{ marginTop: 0 }}>
                            { this.generateNavMenuItems() }
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                                    data-close-others="true">
                                    <i className="glyphicon glyphicon-bell"></i>
                                    <span className="badge badge-default">7</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">个人中心</a></li>
                                    <li><a href="#">退出</a></li>
                                </ul>
                            </li>
                            <li className="dropdown"><a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown"
                                role="button" aria-haspopup="true" aria-expanded="false"> <span
                                    className="glyphicon glyphicon-user" aria-hidden="true"></span>管理员<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">个人中心</a></li>
                                    <li><a href="#">退出</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

export default Navbar