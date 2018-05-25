import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './LeftNav.less';
import {
    Link
} from 'react-router-dom'

import {
    Layout, Menu, Breadcrumb, Icon, Avatar, Button, Row, Col, Card, Input,
    Pagination, Popover, Tag, Radio
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;

class LeftNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: true,
            defaultOpenKeys: ['sub1', 'sub2'],
            loadinghot: true,
            value: 1
        };
    }
    handleClick(e) {
        console.log(e.target)
        console.log(typeof e.target.getAttribute('style'));
    }

    render() {
        const text = <span>Title</span>;
        let loaded = this.state.loaded;
        const content = (
            <div onClick={this.handleClick.bind(this)}>
                <Tag color="#f50" name="#f50"></Tag>
                <Tag color="#2db7f5" name="#2db7f5"></Tag>
                <Tag color="#87d068" name="#87d068"></Tag>
                <Tag color="#666" name="#666"></Tag>
            </div>
        );
        return (
            <Sider width={280} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} >
                <div className="logo" />
                <div className='user-wrap'>
                    <Avatar size='large' icon="user" style={{ backgroundColor: 'rgb(50,61,60)' }}></Avatar>
                    <div>
                        {
                            loaded ?
                                (<span>昵称</span>) :
                                (<Button>登陆</Button>)
                        }
                    </div>
                </div>
                <Menu theme="light"
                    defaultSelectedKeys={['1','2']}
                    mode="inline"
                    defaultOpenKeys={this.state.defaultOpenKeys}
                    inlineCollapsed={false}>

                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="appstore-o" />
                            <span>发现音乐</span>
                        </Link>
                    </Menu.Item>
                    <Menu.ItemGroup title="我的音乐">
                        <Menu.Item key="2">
                            <Link to="/collection" >
                                <Icon type="heart-o" />
                                <span>我的收藏</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to='/tags'>
                                <Icon type="tags-o" />
                                <span>我的标签</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="5">
                            <Link to='/songsheet'>
                                <Icon type="coffee" />
                                <span>我的歌单</span>
                            </Link>
                        </Menu.Item>
                    </Menu.ItemGroup>

                    <Menu.ItemGroup title="功能">
                        <Menu.Item key="6">
                            <Icon type="message" />
                            <span>消息</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Popover placement="bottom" title="颜色" content={content} trigger="hover">
                                <Icon type="bulb" /> <span>更换主题</span>
                            </Popover>

                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="upload" />
                            <span>上传音乐</span>
                        </Menu.Item>
                    </Menu.ItemGroup>

                </Menu>
            </Sider>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        planlist: store.planlist
    };
};

export default connect(mapStateToProps)(LeftNav)