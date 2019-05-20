import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import WrongUrl from './components/WrongUrl'
import UserProfile from './containers/UserProfile'
import Unauthorized from './components/Unauthorized'
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/wrong-page" component={WrongUrl}/>
        <Route exact path="/signin" render={(props) => <SignIn {...props}/>}/>
        <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
        { localStorage.getItem('jwt') ?
          <Route path="/users/:id" component={UserProfile}/> :
          <Unauthorized/>
        }
        <Redirect to="/wrong-page"/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
