import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { initialState } from '../../store';

import { handleDate } from '../../lib/fun';

import {getSongList, addSongList, deleteSongSheet} from '../../actions/UserAction';
import MyHeader from '../../components/MyHeader/MyHeader';
import LeftNav from '../../components/LeftNav/LeftNav';
import {
    Layout, Button, Tabs, List, Avatar, Card, Icon, Modal, Popover, Input, message, Spin,
} from 'antd';
import {getCookie} from '../../lib/fun';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

class SongSheet extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tabPosition: 'top',
            loading: true,
            visible: false,
            text: '亲，登陆了才能使用这些功能哦'
        }
        this.isHave = this.isHave.bind(this)
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    isHave = (song_sheet_name) => {
        var result = -1;
        for(let index = 0; index < this.props.songSheets.length; index++){
            if( this.props.songSheets[index].song_sheet_name === song_sheet_name){
                result = index;
                break;
            }
        }  
        return result
    }
    componentDidMount(){
        var user_id = getCookie('user_id');
        if(user_id){
            this.props.getSongList(user_id);
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
    render(){
        const {songSheets, loadingSongSheet} = this.props; 
        console.log(songSheets)
        const lodingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
        <Layout style={{ minHeight: '100vh'}}  >
        <LeftNav></LeftNav>
        <Layout style={{ minHeight: '100vh'}}  >
            <MyHeader></MyHeader>
            <h3 className="h3" >歌单</h3>
            {
                this.state.text ?
                this.state.text : 
                ''
            }
            {
                loadingSongSheet ? 
                (<div className="example">
                            <Spin indicator={lodingIcon} />
                        </div>)
                :
                (<Content className="flex-content" >
                    {
                        songSheets.length> 0 ?
                        songSheets.map((item, index) => {
                            return <Card key={index}
                                style={{ width: 200, margin: 20,height: 220 }}
                                cover={
                                    <img alt="example"  src={`/imgs/${item.cover_img_addr  ? item.cover_img_addr : 'fm_01.jpg'}`}
                                 />}
                                actions={[
                                    <Icon type="eye-o" onClick={e=> { 
                                        window.location.hash = `/content?type=songsheet&tag_name=${item.song_sheet_name}`
                                    }} />, 
                                    <Icon type="edit" />, 
                                    <Icon type="delete" onClick={ e => {
                                        Modal.confirm({
                                            title: '确认删除该歌单',
                                            content: '',
                                            onOk: () => {
                                                return new Promise( (resolve, reject) => {
                                                    setTimeout(() => {
                                                        resolve()
                                                    }, 100);
                                                    var user_id = getCookie('user_id');
                                                    this.props.deleteSongSheet(user_id, item.song_sheet_name)

                                                }).catch(err=> {

                                                })
                                            },
                                            onCancel: () => {

                                            }
                                        })
                                    }} />]}
                            >
                                <Meta
                                    title={item.song_sheet_name}
                                    
                                />
                            </Card>
                        })
                        : 
                        '暂无歌单'
                    }
                    {
                        this.state.text === '' ?
                        <div className="newTag">
                        <Popover
                            content={ 
                                <div>
                                    <Input placeholder="回确认" onPressEnter={ (e)=>{
                                        console.log(this)
                                        const song_sheet_name = e.target.value;
                                        const user_id = getCookie('user_id');
                                        var result = this.isHave(song_sheet_name) 
                                        if( result === -1 ){

                                            this.props.addSongList(user_id, song_sheet_name)
                                            console.log(this)
                                        }else {
                                            message.warn('和已有歌单名称重复')
                                        }
                                        }} />
                                </div> 
                            }
                            title="创建歌单"
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <Button type="primary" >
                                <span><Icon type="tag" /> 创建歌单</span>
                            </Button>
                        </Popover>
                    </div> : ''
                    }
                    
                </Content>)

            }
            </Layout>
        </Layout>
        )
    }
}


// songSheets

const mapStateToProps = function (store = initialState) {
    return {
        songSheets: store.user.songSheets || [],
        userId: store.user.userId,
        songSheetInfo: store.user.songSheetInfo,
        loadingSongSheet: store.user.loadingSongSheet
    };
};

const mapDispatchToProps = dispatch => ({
    getSongList: bindActionCreators(getSongList, dispatch),
    addSongList: bindActionCreators(addSongList, dispatch),
    deleteSongSheet: bindActionCreators(deleteSongSheet, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SongSheet);