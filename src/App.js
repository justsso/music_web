import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import store from './store';

import { Provider } from 'react-redux';
import LeftNav from './components/LeftNav/LeftNav';
import Home from './containers/Home/Home';
import Collection from './containers/Collection/Collection';
import Tags from './containers/Tags/Tags';
import SongSheet from './containers/SongSheet/SongSheet';

import {
  Layout, Menu, Breadcrumb, Icon, Avatar, Button, Row, Col, Card, Input,
  Pagination, Popover, Tag, Radio
} from 'antd';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router  >
          <Layout style={{ minHeight: '100vh' }}>
              <LeftNav />
                <div>
                  <Route path='/' exact component={Home} ></Route>
                  <Route path='/collection' component={Collection} ></Route>
                  <Route path='/tags' component={Tags} ></Route>
                  <Route path='/songsheet' component={SongSheet} ></Route>
                </div>
              </Layout>
          </Router>
      </Provider>
    );
  }
}


export default App;