import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import reAuth from './actions/reAuth'
import fetchGames from './actions/fetchGames'
import fetchRoutes from './actions/fetchRoutes'
import fetchAllUsers from './actions/fetchAllUsers'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import UserProfile from './containers/UserProfile'
import CreateRoute from './containers/CreateRoute'
import ActiveDash from './containers/ActiveDash'
import SelectRoute from './containers/SelectRoute'
import ViewRoute from './containers/ViewRoute'
import WrongUrl from './components/WrongUrl'
import Unauthorized from './components/Unauthorized'
import NavBar from './containers/NavBar'
import './App.scss';

class App extends React.Component {

  componentDidMount() {
    this.props.reAuth()
    this.props.fetchRoutes()
    this.props.fetchAllUsers()
  }

  render() {
    return (
      <div className="App">
        <h1 className="geodasher">
          GeoDasher
            <img className="world" src="/images/world-icon.png"/>
        </h1>
        <Router>
          <Switch>
            <Route exact path="/wrong-page" component={WrongUrl}/>
            <Route exact path="/signin" render={(props) => <SignIn {...props}/>}/>
            <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
            { Object.keys(this.props.currentUser).length !== 0 &&
               Object.keys(this.props.routes).length !== 0 ?
              <>
                <Switch>
                  <Route exact path="/users/:id/active-dash" render={(props) => <ActiveDash {...props}/>}/>
                  <Route exact path="/users/:id" render={(props) => <UserProfile {...props}/>}/>
                  <Route exact path="/routes" render={(props) => <SelectRoute {...props}/>}/>
                  <Route exact path="/routes/new" render={(props) => <CreateRoute {...props}/>}/>
                  <Route exact path="/routes/:id" render={(props) => <ViewRoute {...props}/>}/>
                </Switch>
              </> :

              localStorage.getItem('jwt') ?
              <>
                <div className="loader"></div>
              </> :
              <Unauthorized/>

            }
            <Redirect to="/wrong-page"/>
          </Switch>
          { localStorage.getItem('jwt') ?
            <NavBar currentUser={this.props.currentUser}/> :
            ""}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    routes: state.routes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reAuth: () => dispatch(reAuth()),
    fetchRoutes: () => dispatch(fetchRoutes()),
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
