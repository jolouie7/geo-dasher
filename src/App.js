import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import WrongUrl from './components/WrongUrl'
import UserProfile from './containers/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
          <Route exact path="/wrong-page" component={WrongUrl}/>
          <Route path="/signin" render={(props) => <SignIn {...props}/>}/>
          <Route path="/signup" render={(props) => <SignUp {...props}/>}/>
          <Route path="/users/:id" component={UserProfile}/>
          <Redirect to="/wrong-page"/>
        </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticted: state.authenticted
  }
}

export default connect(mapStateToProps)(App);
