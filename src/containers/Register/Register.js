import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';

import './Register.less';
import { register } from '../../actions/UserAction';

import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var {user_id, password,email} = values;
                register(user_id,password,email);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (  value && value.length < 5) {
            callback('密码不能少于5位')
        } else {
            if (value && value !== form.getFieldValue('password')) {
                callback('两次密码不一致!');
            } else {
                callback();
            }
        }
    }
    validateUserId = (rule, value, callback) => {
        console.log(rule, value);
        console.log('用户名校验');
        if ( (value && value.length > 10) || (value &&  value.length < 3)) {
            callback('英文或数字3-10位')
        }
        callback()

    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if ( value&& value.length < 5) {
            callback('密码不能少于5位')
        } else {
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit} className="myregister" >
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            用户名&nbsp;
                            <Tooltip title="起一个喜欢的名字?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('user_id', {
                        rules: [{ required: true, message: '必须输入用户名!', whitespace: true },
                        {
                            validator: this.validateUserId
                        }],
                    })(
                        <Input placeholder="英文或数字，3-10位" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '输入的是非法邮箱!',
                        }, {
                            required: true, message: '必输输入邮箱!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',validateFirst:true
                        }, {
                            validator: this.validateToNextPassword,validateFirst:true
                        }],
                    })(
                        <Input type="password" placeholder="不少于5位" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请输入确认密码!',validateFirst:true
                        }, {
                            validator: this.compareToFirstPassword,validateFirst:true
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}  placeholder="不少于5位"/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedNormalRegisterForm = Form.create()(Register);


const mapDispatchToProps = dispatch => ({
    register: bindActionCreators(register, dispatch),

})

// export default connect(null, mapDispatchToProps)(WrappedNormalLoginForm);


export default WrappedNormalRegisterForm;
