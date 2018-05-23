import React, { Component } from 'react';
import {
  HashRouter as  Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import store from './store';

import { Provider } from 'react-redux';

import Home from './containers/Home/Home';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router  >
          <Switch>
            <Route path='/' component={Home} ></Route>
            <Home></Home>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

//  
// class App extends Component {
//   render() {
//     return (
//       <Home></Home>
//     );
//   }
// }


export default App;