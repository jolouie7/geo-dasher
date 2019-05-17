import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import logo from './assets/logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/signin" render={(props) => <SignIn {...props}/>}/>
        <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
      </Router>
    </div>
  );
}

export default App;
