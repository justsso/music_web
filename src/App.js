import React, { Component } from 'react';
import {
  BrowserRouter as  Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import store from './store';



import createHistory from 'history/createBrowserHistory'
let history = createHistory()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} >
          <Switch>
            
            <Route path='/jkl' component={Home}  ></Route>
            {/* <Home></Home> */}
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