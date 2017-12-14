import React from 'react';
import { Link } from 'react-router';
import '../styles/dashboard.css';
import auth from './../utils/auth';

import Navbar from './../components/NavBar/Navbar.jsx';

const Dashboard = React.createClass({
    getInitialState() {
        return {
            heightStyle: {
                height: "auto"
            }
        }
    },
    componentWillMount: function () {
        auth.authLogin('dev');

        var mapHeight = document.documentElement.clientHeight - 40;
        this.setState({
            heightStyle: {
                height: mapHeight + 'px'
            },
        });
    },
    componentDidMount: function () {

    },
    handleLogout: function () {
        auth.loginOut();
    },
    render() {
        return (
            <div className="gago-container">
                <Navbar />

                <div className="gago-map-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

export default Dashboard