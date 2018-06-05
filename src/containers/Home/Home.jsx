import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import Logo from '../../resourses/imgs/logo.png';
import './Home.less';
import { getNewSong, getHotSong, getMayBeLike, getRecommend } from '../../actions/HomeAction';
import { getCollect, addCollect, cancelCollect } from '../../actions/UserAction';
import { initialState } from '../../store';
import {getCookie} from '../../lib/fun';
import {
    Layout, Menu, Icon, Row, Col, Card, Input,
    Pagination, Popover, message
} from 'antd';
import MyHeader from '../../components/MyHeader/MyHeader';
import LeftNav from '../../components/LeftNav/LeftNav';

const { Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
const Search = Input.Search;

class Home extends React.Component {
    constructor(props) {
        console.log('CONSTRUC')
        super(props)
        this.state = {
            newSong: [],
            hotSong: [],
            mayLikeSong: [],
            recommendSong: [],
            loadingNewSong: true,
        };
    }
    componentDidMount() {

        this.props.getNewSong();
        this.props.getHotSong()
        this.props.getMayBeLike();
        this.props.getRecommend();
        // axios.get('/recommendation').then(res => {
        //     console.log(res);
        //     this.setState({
        //         recommendSong: res.data
        //     })
        // }).catch(err => {

        // })
    }

    render() {
        var {newSong, hotSong, mayBeLike, userId, recommendSong } = this.props;
        var { mayLikeSong } = this.state;
        var user_id = getCookie('user_id');
        return (
            <Layout style={{ minHeight: '100vh'}} >
                <LeftNav></LeftNav>
                <Layout style={{ minHeight: '100vh'}} >
                    <MyHeader></MyHeader>
                    <Content>
                        <Row gutter={8}   >
                            <Col span={8} hoverable="true" >
                                <Card title="新歌首发" extra={<a href="#">More</a>}>
                                    {
                                
                                        newSong.map((item, index) => {
                                            return <Row type="flex" className="song-item"
                                                key={index}>
                                                <Col span={4} >
                                                    <img
                                                        src={`${item.cover_img}`}
                                                        className="song-img-small" />
                                                </Col>
                                                <Col span={13} >
                                                    <span style={{ color: '#222' }} >
                                                        {item.title}
                                                    </span>
                                                </Col>
                                                <Col span={2} offset={2}  >
                                                    <Icon type="play-circle-o" style={{ fontSize: 16, color: 'rgb(24,144,255)' }}
                                                        onClick={
                                                            e => {
                                                                {/* window.location.hash = `playmusic?song_id=${item.song_id}`; */}
                                                                window.location.href = `/audio.html?song_id=${item.song_id}`;
                                                                window.localStorage.currentSong = JSON.stringify(item);
                                                                window.localStorage.currentSongList = JSON.stringify(newSong);
                                                                window.localStorage.currentSongIndex = index;
                                                            }
                                                        }
                                                    />
                                                </Col>
                                                <Col span={2} offset={1} >
                                                    <Icon type="heart" style={{ fontSize: 16 }}
                                                        className={item.like ? "red-heart" : "white-heart"}
                                                        onClick={e => {
                                                            if (!user_id) {
                                                                message.warn('先登陆再收藏')
                                                                return;
                                                            }
                                                            if (item.like) {
                                                                this.props.cancelCollect( item.song_id)
                                                            } else {
                                                                this.props.addCollect( item.song_id)
                                                            }
                                                        }} />
                                                </Col>
                                            </Row>
                                        })
                                    }
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="热歌榜单" extra={<a href="#">More</a>}>
                                    {
                                        hotSong.map((item, index) => {
                                            return <Row
                                                key={index} className="song-item" >
                                                <Col span={4} >
                                                    <img
                                                        src={`${item.cover_img}`}
                                                        className="song-img-small" />
                                                </Col>
                                                <Col span={13}>
                                                    <span style={{ color: '#222' }} >
                                                        {item.title}
                                                    </span>
                                                </Col>
                                                <Col span={2} offset={1}>
                                                    <Icon type="play-circle-o" style={{ fontSize: 16, color: 'rgb(24,144,255)' }}
                                                        onClick={
                                                            e => {
                                                                {/* window.location.hash = `playmusic?song_id=${item.song_id}`; */}
                                                                window.location.href = `/audio.html?song_id=${item.song_id}`;
                                                                window.localStorage.currentSong = JSON.stringify(item);
                                                                window.localStorage.currentSongList = JSON.stringify(hotSong);
                                                                window.localStorage.currentSongIndex = index;
                                                            }
                                                        }
                                                    />
                                                </Col>
                                                <Col span={2} offset={1} >
                                                    {
                                                        item.like ?
                                                            <Icon type="heart" style={{ fontSize: 16, color: '#fa541c' }}
                                                                onClick={e => {
                                                                    this.props.cancelCollect( item.song_id)

                                                                }} />
                                                            :
                                                            <Icon type="heart-o"
                                                                onClick={e => { 
                                                                    if (!user_id) {
                                                                        message.warn('先登陆再收藏')
                                                                        return;
                                                                    }
                                                                    this.props.addCollect( item.song_id)
                                                                }} />
                                                    }
                                                </Col>
                                            </Row>
                                        })
                                    }
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="猜你喜欢" extra={<a href="#">More</a>}>
                                    {
                                        mayBeLike.map((item, index) => {
                                            return <Row
                                                key={index} className="song-item" >
                                                <Col span={4} >
                                                    <img
                                                        src={`${item.cover_img}`}
                                                        className="song-img-small" />
                                                </Col>
                                                <Col span={15}>
                                                    <span style={{ color: '#222' }} >
                                                        {item.title}
                                                    </span>
                                                </Col>
                                                <Col span={2} offset={2} >
                                                    <Icon type="play-circle-o" style={{ fontSize: 16, color: 'rgb(24,144,255)' }}
                                                        onClick={
                                                            e => {
                                                                {/* window.location.hash = `playmusic?song_id=${item.song_id}`; */}
                                                                window.location.href = `/audio.html?song_id=${item.song_id}`;
                                                                window.localStorage.currentSong = JSON.stringify(item);
                                                                window.localStorage.currentSongList = JSON.stringify(mayBeLike);
                                                                window.localStorage.currentSongIndex = index;
                                                            }
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        })
                                    }
                                </Card>
                            </Col>
                        </Row>

                        <Row className="dujia" type="flex" justify="space-between" align="top" >
                            {
                                recommendSong.map((item, index) => {
                                    if (index < 8) {
                                        return <Col span={3} key={index}  >
                                            <Card
                                                hoverable="true"
                                                style={{ width: 'auto' }}
                                                cover={<img alt="example"
                                                    src={`${item.cover_img}`}
                                                    onClick={
                                                        e => {
                                                                {/* window.location.hash = `playmusic?song_id=${item.song_id}`; */}
                                                                window.location.href = `/audio.html?song_id=${item.song_id}`;
                                                                window.localStorage.currentSong = JSON.stringify(item);
                                                                window.localStorage.currentSongList = JSON.stringify(recommendSong);
                                                                window.localStorage.currentSongIndex = index;
                                                            }
                                                    }
                                                />}
                                            >
                                                <Card.Meta
                                                    title={item.title}
                                                    description={item.author}
                                                />
                                            </Card>
                                        </Col>
                                    }
                                })
                            }
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = function (store = initialState) {
    return {
        newSong: store.home.newSong || [],
        hotSong: store.home.hotSong || [],
        collect: store.user.collect || [],
        userId: store.user.userId,
        mayBeLike: store.home.mayBeLike || [],
        recommendSong: store.home.recommendSong || []
    };
};

const mapDispatchToProps = dispatch => ({
    getNewSong: bindActionCreators(getNewSong, dispatch),
    getCollect: bindActionCreators(getCollect, dispatch),
    addCollect: bindActionCreators(addCollect, dispatch),
    getHotSong: bindActionCreators(getHotSong, dispatch),
    getMayBeLike: bindActionCreators(getMayBeLike, dispatch),
    cancelCollect: bindActionCreators(cancelCollect, dispatch),
    getRecommend: bindActionCreators(getRecommend,dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(Home);