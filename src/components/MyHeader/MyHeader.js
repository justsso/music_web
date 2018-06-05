import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import Logo from '../../resourses/imgs/logo.png';
import {search} from '../../actions/HomeAction';
import { initialState } from '../../store';
import {
    Layout, Row, Col, Input
} from 'antd';
const { Header, Content, Footer } = Layout;
const Search = Input.Search;
class MyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(value) {
        this.props.search(value);
        window.location.hash = '/show';
    }
    render() {
        return <Header style={{ background: '#fff' }}>
            <Row gutter={8}>
                <Col span={4}>
                    <div className="logo-wrap">
                        <img src={Logo} />
                    </div>
                </Col>
                <Col span={8}>
                    <Search
                        placeholder="输入歌名"
                        onSearch={value => {
                            if(value){
                                this.handleSearch(value)
                            }
                        }
                        }
                        style={{ width: 200 }}
                        size="large"
                        enterButton
                        style={{ width: '400px' }}
                    />
                </Col>
            </Row>
        </Header>
    }
}


const mapDispatchToProps = dispatch => ({
    search: bindActionCreators(search, dispatch)
})

export default  connect(null, mapDispatchToProps)(MyHeader);