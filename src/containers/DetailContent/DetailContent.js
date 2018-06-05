import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { initialState } from '../../store';
import './DetailContent.less';
import {
    Layout, Icon, List, Avatar, Row, Col, Button, Card, Spin,
} from 'antd';
import MyHeader from '../../components/MyHeader/MyHeader';
import LeftNav from '../../components/LeftNav/LeftNav';

import { getTagItemInfo, getSongSheetDetail } from '../../actions/UserAction';
import { getParameterByName, getCookie } from '../../lib/fun';


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
                                                    window.location.hash = `playmusic?song_id=${item.song_id}`
                                                }
                                            }
                                        />
                                    </Col>
                                    <Col span={1} >
                                        <Icon type="delete" style={{ fontSize: 16, color: '#666' }}
                                            onClick={
                                                this.showConfirm
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
        songSheetItemInfo: store.user.songSheetItemInfo || [],
        loadingSongSheetItem: store.user.loadingSongSheetItem,
        detailContentInfo: store.user.detailContentInfo || [],
        loadingDetailContentInfo: store.user.loadingDetailContentInfo
    };
};

const mapDispatchToProps = dispatch => ({
    getTagItemInfo: bindActionCreators(getTagItemInfo, dispatch),
    getSongSheetDetail: bindActionCreators(getSongSheetDetail, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailContent);