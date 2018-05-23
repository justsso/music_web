import React from 'react';
import Logo from '../../resourses/imgs/logo.png';
import './Home.less';
import { songNew } from '../../resourses/data/HomeData';
import {
    Layout, Menu, Breadcrumb, Icon, Avatar, Button, Row, Col, Card, Input,
    Pagination, Popover, Tag, Radio
} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
const Search = Input.Search;
const RadioGroup = Radio.RadioGroup;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: true,
            defaultOpenKeys: ['sub1', 'sub2'],
            loadinghot: true,
            value: 1
        };
    }

    handleSearch(e) {
        console.log(123, e);
    }
    handleClick(e) {
        console.log(e.target)
        console.log( typeof e.target.getAttribute('style'));
        
        
    }

    render() {
        const text = <span>Title</span>;
        const content = (
            <div onClick={this.handleClick.bind(this)} >
                <Tag color="#f50" name="#f50" ></Tag>
                <Tag color="#2db7f5"  name="#2db7f5" ></Tag>
                <Tag color="#87d068" name="#87d068" ></Tag>
                <Tag color="#666" name="#666"></Tag>
            </div>
        );

        let loaded = this.state.loaded;
        setTimeout(() => {
            this.setState({
                loadingnew: false,
                loadinghot: false
            })
        }, 1000);
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider>
                    <div className="logo" />
                    <div className='user-wrap' >
                        <Avatar size='large' icon="user" style={{ backgroundColor: 'rgb(238,79,113)' }} ></Avatar>
                        <div>
                            {
                                loaded ?
                                    (<span>昵称</span>) :
                                    (<Button>登陆</Button>)
                            }
                        </div>
                    </div>
                    <Menu theme="light"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        defaultOpenKeys={this.state.defaultOpenKeys}
                        inlineCollapsed={false} >

                        <Menu.Item key="1">
                            <Icon type="appstore-o" />
                            <span>发现音乐</span>
                        </Menu.Item>
                        <Menu.ItemGroup title="我的音乐" >
                            <Menu.Item key="2">
                                <Icon type="heart-o" />
                                <span>我的收藏</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="tags-o" />
                                <span>我的标签</span>
                            </Menu.Item>
                            
                            <Menu.Item key="5">
                                <Icon type="coffee" />
                                <span>我的歌单</span>
                            </Menu.Item>
                        </Menu.ItemGroup>

                        <Menu.ItemGroup title="功能" >
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

                <Layout>
                    <Header style={{ background: '#fff' }}>
                        <Row gutter={8} >
                            <Col span={4}>
                                <div className="logo-wrap">
                                    <img src={Logo} />
                                </div>
                            </Col>
                            <Col span={8} >
                                <Search
                                    placeholder="输入歌名"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 200 }}
                                    onPressEnter={this.handleSearch.bind(this)}
                                    size="large"
                                    enterButton
                                    style={{ width: '400px' }}
                                />
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ margin: '16px' }} >
                        <Row gutter={8} >
                            <Col span={8} hoverable="true" >
                                <Card title="新歌首发" extra={<a href="#">More</a>} loading={this.state.loadingnew} >
                                    <Row type="flex" justify="space-between" style={{ height: "50px" }}  >
                                        <Col span={21} >
                                            <span>
                                                Fall Out Boy - Immortals - End Credit版
                                        </span>
                                        </Col>
                                        <Col span={3}  >
                                            <Icon type="play-circle-o" />
                                        </Col>
                                    </Row>
                                    {
                                        songNew.map((item, index) => {
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }} key={index} >
                                                <Col span={21} >
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}  >
                                                    <Icon type="play-circle-o" />
                                                </Col>
                                            </Row>

                                        })
                                    }
                                    <Pagination current={this.state.current} onChange={this.onChange} total={50} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="热歌榜单" extra={<a href="#">More</a>} loading={this.state.loadinghot}>
                                    {
                                        songNew.map((item, index) => {
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }} key={index}>
                                                <Col span={21} >
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}  >
                                                    <Icon type="play-circle-o" />
                                                </Col>
                                            </Row>

                                        })
                                    }
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="热歌榜单" extra={<a href="#">More</a>} loading={this.state.loadinghot}>
                                    {
                                        songNew.map((item, index) => {
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }} key={index}>
                                                <Col span={21} >
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}  >
                                                    <Icon type="play-circle-o" />
                                                </Col>
                                            </Row>

                                        })
                                    }
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} >
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Card.Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>

                            <Col span={6} >
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Card.Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>

                            <Col span={6} >
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Card.Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>

                            <Col span={6} >
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Card.Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} offset={6}>col-12 col-offset-6</Col>
                        </Row>
                    </Content>

                </Layout>
            </Layout>
        )
    }
}

export default Home; 