import React from 'react'
import { withRouter } from 'react-router'
import auth from '../utils/auth.js'
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

let Login = React.createClass({
    getInitialState() {
        return {
            error: false,
        }
    },

    componentWillMount() {
        // auth.authLogin('dev', 'miye2', 'miye456');
        this.props.router.replace('/GroundInfo');
        // if (this.state.token) {
        //     this.props.router.replace('/GroundInfo');
        // } else {
        //     console.log(this.state.token);

        //     this.props.router.replace('/GroundInfo');
        //     // document.location.href = 'http://portal.gagogroup.cn';
        // }
    },

    handleSubmit(event) {
        // event.preventDefault();
        // const email = this.props.form.getFieldsValue().userName;
        // const pass = this.props.form.getFieldsValue().password;

        // auth.login(email, pass, (loggedIn) => {
        //     if (!loggedIn)
        //         return this.setState({ error: true });

        //     const { location } = this.props;

        //     if (location.state && location.state.nextPathname) {
        //         this.props.router.replace(location.state.nextPathname)
        //     } else {
        //         this.props.router.replace('/dashboard')
        //     }
        // })
    },

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormItem label="账户">
                    <Input placeholder="请输入账户名" {...getFieldProps('userName') }/>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password" placeholder="请输入密码" {...getFieldProps('password') }/>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
                {this.state.error && (<p>Bad login information</p>) }
            </Form>

        )
    }

})
Login = Form.create()(Login);

export default withRouter(Login)
