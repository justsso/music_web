import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';

import './LeftNav.less';
import {
    Link
} from 'react-router-dom'
import {
    Layout, Menu, Breadcrumb, Icon, Avatar, Button, Row, Col, Input, Form, Popover,message
,    Tag, Radio, Modal
} from 'antd';
import {getCookie, setCookie} from '../../lib/fun';
import  {login} from '../../actions/UserAction';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
const FormItem = Form.Item;

class LeftNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: true,
            defaultOpenKeys: ['sub1', 'sub2'],
            loadinghot: true,
            value: 1,
            collapsed: false,
            visible: false,
            user_id: '',
            selectedKeys: []
        };
        this.onLogout = this.onLogout.bind(this)
    }
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        // 点击了去注册
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    onLogout = () => {
        setCookie('user_id','')
        message.success('退出成功');
        window.location.reload();
    
    }
    onSelect = (obj) => {
        console.log(obj);
        window.localStorage.activeKey =  obj.key;

        // { item, key, selectedKeys }
        
    }
    handleClick(e) {
        console.log(e.target)
        console.log(typeof e.target.getAttribute('style'));
    }
    componentDidMount(){
        var user_id = getCookie('user_id');
        let activeKey = window.localStorage.activeKey
        this.setState({
            selectedKeys: [activeKey],
            user_id
        })
    }
    render() {
        const text = <span>Title</span>;
        let user_id = this.state.user_id;
        const content = (
            <div onClick={this.handleClick.bind(this)}  onClick ={ e=>{
                console.log(e.target.getAttribute('name'));
                window.localStorage.color = e.target.getAttribute('name');
                }} >
                <Tag color="#f50" name="#f50"></Tag>
                <Tag color="#2db7f5" name="#2db7f5"></Tag>
                <Tag color="#87d068" name="#87d068"></Tag>
                <Tag color="#666" name="#666"></Tag>
            </div>
        );
        return (
            <Sider 
                collapsible={true}
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                
            >
                <div className="logo" />
                <div className='user-wrap'>
                    <Avatar size='large' icon="user" style={{ backgroundColor: 'rgb(50,61,60)' }}></Avatar>
                    <div>
                        {
                            user_id ?
                                (<div>  
                                    {user_id}
                                    <p><a  
                                    onClick = { this.onLogout }
                                    >退出</a> </p>
                                    </div>) :
                                (<Button onClick={
                                    e=>{
                                     window.location.hash = '/login'
                                    }    
                                } >登陆</Button>)
                        }
                    </div>
                </div>
                <Menu theme="light"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    defaultOpenKeys={this.state.defaultOpenKeys}
                    inlineCollapsed={false}
                    selectedKeys={this.state.selectedKeys}
                    onSelect = {this.onSelect.bind(this)}
                    >
                    
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

                    {/* <Menu.ItemGroup title="功能">
                        <Menu.Item key="6">
                            <Icon type="message" />
                            <span>消息</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="upload" />
                            <span>上传音乐</span>
                        </Menu.Item>
                    </Menu.ItemGroup> */}
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

const mapDispatchToProps = dispatch => {
    return {
        login: bindActionCreators(login, dispatch)
    }
}

export default connect(mapStateToProps)(LeftNav)