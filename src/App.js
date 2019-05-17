import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import WrongUrl from './components/WrongUrl'
import ProfilePage from './containers/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/wrong-page" component={WrongUrl}/>
        <Route path="/signin" render={(props) => <SignIn {...props}/>}/>
        <Route path="/signup" render={(props) => <SignUp {...props}/>}/>
        <ProtectedRoute path="/profile" component={ProfilePage}/>
        <Redirect to="/wrong-page"/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
