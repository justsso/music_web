import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Logo from '../../resourses/imgs/logo.png';
import './Home.less';
import { songNew } from '../../resourses/data/HomeData';
import {
    Layout, Menu, Icon, Row, Col, Card, Input,
    Pagination, Popover
} from 'antd';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
const Search = Input.Search;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultOpenKeys: ['sub1', 'sub2'],
            loadinghot: true,
            value: 1
        };
    }

    handleSearch(e) {
        console.log(123, e);
    }

    componentDidMount() {
        axios.get('/sss').then(function (res) {
            console.log('请求得到数据');
            console.log(res);
        }).catch(err => {
        })
    }
    render() {

        setTimeout(() => {
            this.setState({
                loadingnew: false,
                loadinghot: false
            })
        }, 1000);
        return (
            <Layout style={{ minHeight: '100vh', marginLeft: 300 }} >
                <Layout>
                    <Header style={{ background: '#fff' }}>
                        <Row gutter={8}>
                            <Col span={4}>
                                <div className="logo-wrap">
                                    <img src={Logo} />
                                </div>
                            </Col>
                            <Col span={8}>
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
                    <Content style={{ margin: '16px' }}>
                        <Row gutter={8}>
                            <Col span={8} hoverable="true">
                                <Card title="新歌首发" extra={<a href="#">More</a>} loading={this.state.loadingnew}>
                                    <Row type="flex" justify="space-between" style={{ height: "50px" }}>
                                        <Col span={21}>
                                            <span>
                                                Fall Out Boy - Immortals - End Credit版
                                        </span>
                                        </Col>
                                        <Col span={3}>
                                            <Icon type="play-circle-o" />
                                        </Col>
                                    </Row>
                                    {
                                        songNew.map((item, index) => {
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }}
                                                key={index}>
                                                <Col span={21}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}>
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
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }}
                                                key={index}>
                                                <Col span={21}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}>
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
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }}
                                                key={index}>
                                                <Col span={21}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}>
                                                    <Icon type="play-circle-o" />
                                                </Col>
                                            </Row>

                                        })
                                    }
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example"
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Card.Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example"
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Card.Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example"
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Card.Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card
                                    hoverable="true"
                                    style={{ width: 240 }}
                                    cover={<img alt="example"
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
                        <Row gutter={8}>
                            <Col span={8} hoverable="true">
                                <Card title="新歌首发" extra={<a href="#">More</a>} loading={this.state.loadingnew}>
                                    <Row type="flex" justify="space-between" style={{ height: "50px" }}>
                                        <Col span={21}>
                                            <span>
                                                Fall Out Boy - Immortals - End Credit版
                                        </span>
                                        </Col>
                                        <Col span={3}>
                                            <Icon type="play-circle-o" />
                                        </Col>
                                    </Row>
                                    {
                                        songNew.map((item, index) => {
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }}
                                                key={index}>
                                                <Col span={21}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}>
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
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }}
                                                key={index}>
                                                <Col span={21}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}>
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
                                            return <Row type="flex" justify="space-between5" style={{ height: "50px" }}
                                                key={index}>
                                                <Col span={21}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Col>
                                                <Col span={3}>
                                                    <Icon type="play-circle-o" />
                                                </Col>
                                            </Row>

                                        })
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        planlist: store.planlist
    };
};

export default connect(mapStateToProps)(Home);