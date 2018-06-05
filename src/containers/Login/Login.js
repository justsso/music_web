import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/UserAction';
import './Login.less'


import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                
                this.props.login(values.userid, values.password);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrap" >
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userid', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                    或者 <a href="/#/register">立即注册</a>
                </FormItem>
            </Form>
            </div>
        )
    }

}
const WrappedNormalLoginForm = Form.create()(Login);

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(login, dispatch),

})

export default connect(null, mapDispatchToProps)(WrappedNormalLoginForm);


