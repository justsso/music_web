import React, { Component } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import store from './store';
// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <BrowserRouter >
//           <div>
//             <Router path='/' Component={Home}></Router>
//           </div>
//         </BrowserRouter>
//       </Provider>
//     );
//   }
// }

class App extends Component {
  render() {
    return (
      <Home></Home>
    );
  }
}


export default App;