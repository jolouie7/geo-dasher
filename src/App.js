import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import UserProfile from './containers/UserProfile'
import CreateRoute from './containers/CreateRoute'
import ActiveDash from './containers/ActiveDash'
import SelectRoute from './containers/SelectRoute'
import ViewRoute from './containers/ViewRoute'
import WrongUrl from './components/WrongUrl'
import Unauthorized from './components/Unauthorized'
import './App.scss';

class App extends React.Component {

  componentDidMount() {
    console.log(this.props.currentUser)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/wrong-page" component={WrongUrl}/>
            <Route exact path="/signin" render={(props) => <SignIn {...props}/>}/>
            <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
            { localStorage.getItem('jwt') ?
              <Route exact path="/users/:id/active-dash" render={(props) => <ActiveDash {...props}/>}/> :
              <Unauthorized/>
            }
            { localStorage.getItem('jwt') ?
              <Route exact path="/users/:id" render={(props) => <UserProfile {...props}/>}/> :
              <Unauthorized/>
            }
            { localStorage.getItem('jwt') ?
              <Route exact path="/routes/new" render={(props) => <CreateRoute {...props}/>}/> :
              <Unauthorized/>
            }
            { localStorage.getItem('jwt') ?
              <Route exact path="/routes" render={(props) => <SelectRoute {...props}/>}/> :
              <Unauthorized/>
            }
            { localStorage.getItem('jwt') ?
              <Route exact path="/routes/:id" render={(props) => <ViewRoute {...props}/>}/> :
              <Unauthorized/>
            }
            <Redirect to="/wrong-page"/>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App);
