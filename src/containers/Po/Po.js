import React from 'react';
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
// import PlayMusic from '../PlayMusic/PlayMusic';

class Po extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        console.log('123')
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            axios.post('/add_song',
                {
                    ...values
                }
            ).then((res)=>{
                console.log(res);
            })
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <FormItem label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Input placeholder="placeholder" />
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
            <Row gutter={10} style={{width: '80vw', margin: '0 auto' }} >
                <Col span={8} >
                    <Form.Item label='song_id' >
                    {
                        getFieldDecorator('song_id',{
                            rules: [{ required: true,message:'必填'}]
                        })( 
                            <Input  placeholder="song_id" />
                    )}
                       
                    </Form.Item>

                </Col>
                <Col span={8} >
                    <Form.Item label='歌名' >
                        {
                            getFieldDecorator('title',{
                                rules: [{ required: true,message:'必填'}]
                            })(
                                <Input  placeholder="不必加.mp3" />
                            )
                        }
                       
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item label='路径' >
                    {
                            getFieldDecorator('address',{
                                rules: [{ required: true,message:'必填'}]
                            })(
                                <Input  placeholder="media/开头" />
                            )
                    }
                    </Form.Item>
                </Col>
            </Row>
            <Row   gutter={10}  style={{width: '80vw', margin: '0 auto' }} >
                <Col span={8} >
                    <Form.Item label='歌手' >
                    {
                            getFieldDecorator('author',{
                                rules: [{ required: true,message:'必填'}]
                            })(
                                <Input  placeholder="歌手" />
                            )
                    }
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item label='封面图' >
                    {
                            getFieldDecorator('cover_img',{
                                rules: [{ required: true,message:'必填'}]
                            })(
                                <Input  placeholder="歌曲图片" />
                            )
                    }
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item label='类型' >
                    {
                            getFieldDecorator('type',{
                                rules: [{ required: true,message:'必填'}]
                            })(
                                <Input  placeholder="歌曲类型" />
                            )
                    }
                    </Form.Item>
                </Col>
            </Row>
            <Row   gutter={10}  style={{width: '80vw', margin: '0 auto' }}>
                
                <Col span={8} >
                    <Form.Item label='操作' >
                        <Button htmlType="submit">添加</Button>
                        
                    </Form.Item>
                </Col>
            </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(Po);

export default WrappedAdvancedSearchForm;