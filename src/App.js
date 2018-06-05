import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import store from './store';
import { Provider } from 'react-redux';
import LeftNav from './components/LeftNav/LeftNav';
import Home from './containers/Home/Home';
import Collection from './containers/Collection/Collection';
import Tags from './containers/Tags/Tags';
import SongSheet from './containers/SongSheet/SongSheet';
import DetailContent from './containers/DetailContent/DetailContent';
import PlayMusic from './containers/PlayMusic/PlayMusic';
import Po from './containers/Po/Po';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

import {
  Layout
} from 'antd';

import './App.less';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
                <Route path='/' exact component={Home} ></Route>
                <Route path='/collection' component={Collection} ></Route>
                <Route path='/tags' component={Tags} ></Route>
                <Route path='/songsheet' component={SongSheet} ></Route>
                <Route path='/manage' component={Po}></Route>
                <Route path='/content' component={DetailContent} ></Route>
                <Route path='/login' component={Login} ></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/show' component={PlayMusic} ></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}


export default App;