import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { initialState } from '../../store';
import './DetailContent.less';
import {
    Layout, Icon, List, Avatar, Row, Col, Button, Card, Spin,Modal
} from 'antd';
import MyHeader from '../../components/MyHeader/MyHeader';
import LeftNav from '../../components/LeftNav/LeftNav';

import { getTagItemInfo, 
        getSongSheetDetail,
        deleteSFromTag,
        deleteSFromSongSheet } 
    from '../../actions/UserAction';
import { getParameterByName, getCookie } from '../../lib/fun';
const confirm = Modal.confirm;
const { Header, Content, Footer, Sider } = Layout;
class DetailContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ""
        }
    }

    componentDidMount() {
        var tag_name = getParameterByName('tag_name');
        var type = getParameterByName('type');
        console.log('type',type)
        this.setState({
            title: tag_name
        })
        console.log(tag_name)
        if (type === 'tag') {
            var user_id = getCookie('user_id');
            this.props.getTagItemInfo(user_id, tag_name)
        }else if(type ==='songsheet'){
            var user_id = getCookie('user_id');
            this.props.getSongSheetDetail(user_id, tag_name)
        }
    }
    showConfirm(song_id) {
        let that = this;
        console.log(song_id);
        let s = song_id;
        var tag_name = getParameterByName('tag_name');
        var type = getParameterByName('type');
        confirm({
            title: '删除歌曲?',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 100);
                }).then((args) => {
                    // that.props.cancelCollect( s )
                    // 从歌单中或者从标签中删除
                    var user_id = getCookie('user_id');
                    if(type === 'tag'){
                        that.props.deleteSFromTag(user_id,song_id,tag_name)
                    }else if(type === 'songsheet'){
                        that.props.deleteSFromSongSheet(user_id,song_id,tag_name)
                    }
                }).catch((err) =>
                    console.log('Oops errors!', err));
            },
            onCancel() { },
        });
    }

    render() {
        const { tagItemInfo, loadingDetailContentInfo, detailContentInfo } = this.props;
        const lodingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

        return <Layout style={{ minHeight: '100vh'}}  >
            <LeftNav></LeftNav>
            <Layout style={{ minHeight: '100vh'}} >
            <MyHeader></MyHeader>
            <h3 className="h3" >{this.state.title}</h3>
            <Content className="content" >
                {
                    loadingDetailContentInfo?
                    <div className="example">
                            <Spin indicator={lodingIcon} />
                        </div>
                        :
                        detailContentInfo.length > 0 ?
                        <div style={{width: '100%'}} >
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
                            {detailContentInfo.map((item, index) => {
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
                                                    window.location.href = `/audio.html?song_id=${item.song_id}&type=${item.type}`;
                                                    window.localStorage.currentSong = JSON.stringify(item);
                                                    window.localStorage.currentSongList = JSON.stringify(detailContentInfo);
                                                    window.localStorage.currentSongIndex = index;
                                                }
                                            }
                                        />
                                    </Col>
                                    <Col span={1} >
                                        <Icon type="delete" style={{ fontSize: 16, color: '#666' }}
                                            onClick={
                                                this.showConfirm.bind(this, item.song_id)
                                            }
                                        />
                                    </Col>
                                </Row>
                            })}
                        </div>
                        :
                        <div>还没有添加歌曲哦</div>  
                }
            </Content>
            </Layout>
        </Layout>
    }
}

const mapStateToProps = function (store = initialState) {
    return {
        userId: store.user.userId,
        tagItemInfo: store.user.tagItemInfo|| [],
        detailContentInfo: store.user.detailContentInfo || [],
        loadingDetailContentInfo: store.user.loadingDetailContentInfo
    };
};

const mapDispatchToProps = dispatch => ({
    getTagItemInfo: bindActionCreators(getTagItemInfo, dispatch),
    getSongSheetDetail: bindActionCreators(getSongSheetDetail, dispatch),
    deleteSFromTag: bindActionCreators(deleteSFromTag,dispatch),
    deleteSFromSongSheet: bindActionCreators(deleteSFromSongSheet,dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailContent);