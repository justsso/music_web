import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import Logo from '../../resourses/imgs/logo.png';

import { initialState } from '../../store';
import {
    Layout, Button, Menu, Tabs, List, Avatar, Card, Icon, Modal, Popover, Input, message, Spin,
    Pagination
} from 'antd';

import './PlayMusic.less';
import MyHeader from '../../components/MyHeader/MyHeader';
import LeftNav from '../../components/LeftNav/LeftNav';

import { addRecord, addUserTagInfo, addSongSheetInfo } from '../../actions/UserAction';
import { getCookie } from '../../lib/fun';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
const Search = Input.Search;
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class PlayMusic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    componentDidMount() {

    }

    render() {
        const { addUserTagInfo, addSongSheetInfo } = this.props;
        return (
            <Layout style={{ minHeight: '100vh' }}  >
                <LeftNav></LeftNav>
                <Layout style={{ minHeight: '100vh' }}  >
                    <MyHeader></MyHeader>
                    <h3 className="h3" >歌曲列表</h3>
                    <Content className="content" >
                        <List
                            itemLayout="horizontal"
                            loading={this.props.loadingSearch}
                            locale={{ emptyText: '没有找到歌曲~' }}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 5,
                                position: 'bottom'
                            }}

                            dataSource={this.props.PlayMusicList}
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    style={{ padding: '10px 30px' }}
                                    actions={
                                        [
                                            <Icon type="play-circle" style={{ fontSize: 16, color: 'rgb(238,79,113)' }}
                                                onClick={
                                                    e => {
                                                        window.open(`/audio.html?song_id=${item.song_id}`,'_blank')
                                                        {/* window.location.href = `/audio.html?song_id=${item.song_id}`; */}
                                                        window.localStorage.currentSong = JSON.stringify(item);
                                                        window.localStorage.currentSongList = JSON.stringify(this.props.PlayMusicList);

                                                    }
                                                }
                                            />
                                        ]
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.cover_img} />}
                                        title={<a href={item.href}>{item.title}</a>}

                                    />
                                    {/* List.Item  actions={
                                        [
                                            <Icon type="star-o" />, 
                                            <Icon type="tags-o" />,
                                            <Icon type="plus-square-o" />,
                                            <a> 电音 </a>
                                        ]
                                    } */}
                                    歌手：<a>{item.author}</a>
                                </List.Item>
                            )}
                        >
                        </List>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}


const mapStateToProps = function (store = initialState) {
    return {
        userId: store.user.userId,
        PlayMusicList: store.home.PlayMusicList,
        loadingSearch: store.home.loadingSearch
    };
};

const mapDispatchToProps = dispatch => ({
    addRecord: bindActionCreators(addRecord, dispatch),
    addUserTagInfo: bindActionCreators(addUserTagInfo, dispatch),
    addSongSheetInfo: bindActionCreators(addSongSheetInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayMusic);
