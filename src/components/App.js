import React from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ResetPassword from './ResetPassword';
import {BrowserRouter as Router, Route, Switch} from'react-router-dom';
import 'antd/dist/antd.css';
import '../style/style.css';

function App(){
  return(
    <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/home" component={HomePage}/>
          <Route path="/reset-password" component={ResetPassword}/>
        </Switch>
    </Router>
  );
}

export default App;