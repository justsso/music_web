import React from 'react';
import './Home.css';
import { Menu, Carousel } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const MenuItemGroup = Menu.ItemGroup;
class Home extends React.Component {
    state = {
        current: 'index',
    }
    handleClick = (e) => {
        console.log('click', e);
        this.setState({
            current: e.key
        })
    }
    afterChange = (current) => {
        console.log(123, current);
    }
    beforeChange = (from, to) => {
        console.log('beforeChange', from, to);
    }

    render() {
        return (
            <Layout>
                <Header><Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                defaultSelectedKeys={["index"]}
                defaultOpenKeys={['index']}
                mode="horizontal"
            >
                <Menu.Item key="index" >
                    首页
                    </Menu.Item>
                <Menu.Item>
                    美国研究生留学
                    </Menu.Item>
                <Menu.Item>
                    美国本科留学
                    </Menu.Item>
                <Menu.Item>
                    托福培训
                    </Menu.Item>
                <Menu.Item>
                    雅思培训
                    </Menu.Item>
                <Menu.Item>
                    SAT/ACT培训
                    </Menu.Item>
                <Menu.Item>
                    Newpathway
                    </Menu.Item>
                <Menu.Item>
                    关于我们
                    </Menu.Item>
            </Menu></Header>
                <Content>
                <Carousel autoplay
                afterChange={this.afterChange}
                beforeChange={this.beforeChange}
                easing="easeInQuad"

            >
                <section><h3>1</h3></section>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
            </Carousel>
            <div>
                <h3>
                    [ 专注国际教育33年  美国留学申请 + 考试培训  + 职业规划 ]
                </h3>
            </div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>

            
            
          
        )
    }
}

export default Home; 