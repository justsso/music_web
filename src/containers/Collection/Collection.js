import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { initialState } from '../../store';
import { getCollect, addCollect,cancelCollect } from '../../actions/UserAction';
import LeftNav from '../../components/LeftNav/LeftNav';
import {getCookie} from '../../lib/fun';

import {
    Layout, Icon, List, Avatar, Row, Col, Button, Card, Modal, message, Spin,
} from 'antd';
import MyHeader from '../../components/MyHeader/MyHeader';

import './Collection.less';
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const confirm = Modal.confirm;


class Collection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '亲，登陆了才能使用这些功能哦',
            loading: true
        }
        this.showConfirm = this.showConfirm.bind(this)
    }
    showConfirm(song_id) {
        let that = this;
        console.log(song_id);
        let s = song_id
        confirm({
            title: '取消收藏?',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 100);
                }).then((args) => {
                    that.props.cancelCollect( s )
                    
                }).catch((err) =>
                    console.log('Oops errors!', err));
            },
            onCancel() { },
        });
    }
    componentDidMount() {
        var user_id = getCookie('user_id');
        console.log( Boolean(user_id))
        if(user_id){
            this.props.getCollect();
            this.setState({
                text: ''
            })
        }else {
            this.setState({
                text: '亲，登陆之后才能使用这些功能哦',
                loading: false
            })
        }
    }

    render() {
        const { collect, loadingCollect } = this.props;
        const len = collect.length;
        const lodingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
            <Layout style={{ minHeight: '100vh'}}  >
                <LeftNav ></LeftNav>
                <Layout style={{ minHeight: '100vh'}}  >
                <MyHeader></MyHeader>
                <h3 className="h3" >收藏的歌曲</h3>
                <Content className="content" >
                {
                    this.state.text ? 
                    this.state.text : 
                    ''
                }
                {
                    loadingCollect ? 
                    (<div className="example">
                            <Spin indicator={lodingIcon} />
                        </div>)
                    :
                        len > 0 ?
                            (
                                <div>
                                    <Row className="song-header" >
                                        <Col span={7} offset={1} >
                                            <span> 歌曲 </span>
                                        </Col>
                                        <Col span={7} >
                                            <span>作者</span>
                                        </Col>
                                        <Col span={3} offset={5} >
                                            <span> 操作 </span>
                                        </Col>
                                    </Row>
                                    {collect.map((item, index) => {
                                        return <Row key={index} className="song-item" >
                                            <Col span={1} >
                                                <span> {index} </span>
                                            </Col>
                                            <Col span={7} >
                                                <span> {item.title} </span>
                                            </Col>
                                            <Col span={7} >
                                                <span>{item.author}</span>
                                            </Col>
                                            <Col span={1} offset={4} >
                                                <Icon type="play-circle-o" style={{ fontSize: 16, color: 'rgb(24,144,255)' }}
                                                    onClick={
                                                        e => {
                                                            {/* window.location.hash = `playmusic?song_id=${item.song_id}`; */}
                                                                window.location.href = `/audio.html?song_id=${item.song_id}&type=${item.type}`;
                                                                window.localStorage.currentSong = JSON.stringify(item);
                                                                window.localStorage.currentSongList = JSON.stringify(collect);
                                                                window.localStorage.currentSongIndex = index;
                                                        }
                                                    }
                                                />
                                            </Col>
                                            <Col span={1} >
                                                <Icon type="heart" style={{ fontSize: 16, color: '#fa541c' }} />
                                            </Col>
                                            <Col span={1} >
                                                <Icon type="delete" style={{ fontSize: 16, color: '#666' }}
                                                    onClick={
                                                      this.showConfirm.bind(this,item.song_id)
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    })}
                                </div>
                            )
                            :
                            '暂无歌曲'
                }
                </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = function (store = initialState) {
    return {
        collect: store.user.collect || [],
        userId: store.user.userId,
        loadingCollect: store.user.loadingCollect
    };
};

const mapDispatchToProps = dispatch => ({
    getCollect: bindActionCreators(getCollect, dispatch),
    cancelCollect: bindActionCreators(cancelCollect, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection);