import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    Layout, Menu, Breadcrumb, Icon, Avatar, Button, Row, Col, Card, Input,
    Pagination, Popover, Tag, Radio
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;



class SongSheet extends React.Component {



    render(){


        return (
        <Layout  style={{ minHeight: '100vh' ,marginLeft:300 }} >
                <h1>我的歌单页面</h1>  
            </Layout>
        )
    }
}

export default SongSheet;