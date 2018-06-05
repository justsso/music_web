import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { initialState } from '../../store';
import './Tags.less';
import { addTag, getTag, getTagItemInfo, addUserTagInfo, deleteTag } from '../../actions/UserAction';
import MyHeader from '../../components/MyHeader/MyHeader';
import LeftNav from '../../components/LeftNav/LeftNav';

import {getCookie} from '../../lib/fun';
import { handleDate } from '../../lib/fun';
import {
    Layout, Button, Tabs, List, Avatar, Card, Icon, Modal, Popover, Input, message, Spin,
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const TabPane = Tabs.TabPane;
const { Meta } = Card;
class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabPosition: 'top',
            loading: true,
            visible: false,
            text: '亲，登陆了才能使用这些功能哦',
            bqImgs: ['/imgs/bq_01.jpg',
                    '/imgs/bq_02.jpg',
                    '/imgs/bq_03.jpg',
                    '/imgs/bq_04.jpg',
                    '/imgs/bq_05.jpg',
                    '/imgs/bq_06.jpg']
        }
        this.isHave = this.isHave.bind(this);
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    isHave = (tag_name) => {
        var result = -1;
        for(let index = 0; index < this.props.tags.length; index++){
            if( this.props.tags[index].tag_name === tag_name){
                result = index;
                break;
            }
        }  
        return result
    }
    componentDidMount() {
        var user_id = getCookie('user_id');
        if(user_id){
            this.props.getTag(user_id);
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
        const { tags, loadingTags } = this.props;
        const { loading } = this.state;
        const { visible, confirmLoading, ModalText } = this.state;
        const lodingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
            <Layout style={{ minHeight: '100vh'}}  >
                <LeftNav></LeftNav>
                <Layout style={{ minHeight: '100vh'}}  >
                <MyHeader></MyHeader>
                <h3 className="h3" >标签</h3>
                {
                    this.state.text ? 
                    this.state.text : 
                    ''
                }
                {
                        loadingTags? 
                        (<div className="example">
                            <Spin indicator={lodingIcon} />
                        </div>)
                        : (<Content className="flex-content" >
                            {/* <Row> */}
                    {
                        tags.length ? 
                        tags.map((item, index) => {
                            return <Card key={index}
                                style={{ width: 200, margin: 20, height: 220 }}
                                cover={<img alt="example" 
                                    src={`${ this.state.bqImgs[ Math.floor( Math.random()*6) ]}`}/>
                                }
                                actions={[
                                    <Icon type="eye-o" onClick={e=> { 
                                        window.location.hash = `/content?type=tag&tag_name=${item.tag_name}`
                                    }} />, 
                                    <Icon type="edit" />, 
                                    <Icon type="delete" onClick={
                                        (e, tag_name)  => {

                                        console.log(item);
                                        Modal.confirm({
                                            title: '确认删除标签',
                                            content: '',
                                            onOk: () => {
                                                
                                                return new Promise( (resolve, reject) => {
                                                    setTimeout(() => {
                                                        resolve()
                                                    }, 100);
                                                    var user_id = getCookie('user_id');
                                                    this.props.deleteTag(user_id, item.tag_name)
                                                }).catch(err=> {

                                                })
                                            },
                                            onCancel: () => {

                                            }
                                        })
                                        }} />]}
                            >
                                <Meta
                                    title={item.tag_name}
                                    description={`创建时间:${handleDate(item.create_time)}`}
                                />
                            </Card>
                        }) :
                        '亲,还没有标签呢'
                    }
                    {
                        this.state.text === '' ?
                        <div className="newTag">
                        <Popover
                            content={ 
                                <div>
                                    <Input placeholder="回车确认" onPressEnter={ (e)=>{
                                        console.log(this)
                                        const tag_name = e.target.value;
                                        const user_id = getCookie('user_id');
                                      console.log(this.isHave(tag_name))
                                        if( this.isHave(tag_name) === -1 ){
                                            this.props.addTag(user_id, tag_name)
                                            console.log(this)
                                        }else {
                                            message.warn('和已有标签重复')
                                        }

                                        {/* this.props.addUserTagInfo( getCookie('user_id') ,'欢乐','130') */}
                                        }} />
                                </div> 
                            }
                            title="创建标签"
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <Button type="primary" >
                                <span><Icon type="tag" /> 创建标签</span>
                            </Button>
                        </Popover>
                    </div>
                        :
                        ''
                    }
                    
                    {/* </Row> */}
                </Content>)
                }
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = function (store = initialState) {
    return {
        tags: store.user.tags || [],
        userId: store.user.userId,
        loadingTags: store.user.loadingTags
    };
};

const mapDispatchToProps = dispatch => ({
    addTag: bindActionCreators(addTag, dispatch),
    getTag: bindActionCreators(getTag, dispatch),
    getTagItemInfo: bindActionCreators(getTagItemInfo, dispatch),
    addUserTagInfo: bindActionCreators(addUserTagInfo, dispatch),
    deleteTag: bindActionCreators(deleteTag, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Tags);