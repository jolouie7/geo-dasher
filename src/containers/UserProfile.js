import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RouteCard from '../components/RouteCard'
import fetchRoutes from '../actions/fetchRoutes'
import fetchGames from '../actions/fetchGames'

class UserProfile extends React.Component {

  signOut = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin')
  }

  renderActiveDash = () => {
    let activeDash = this.props.userGames.find(game => game.active)
    if (activeDash === undefined) {
      return (<p> You are not currently dashing...
                <br/>
                Click <Link to="/routes">here</Link> to select a route!
              </p>
            )
    } else {
      let activeRoute;
      if (activeDash) {
        activeRoute = this.props.routes.find(route => route.id === activeDash.route_id)
        return (<RouteCard key={activeDash.id}
                          userId={this.props.currentUser}
                          id={activeRoute ? activeRoute.id : null}
                          route={activeRoute}
                          game={activeDash}/>)
      } else {
        return null
      }
    }
  }

  renderCreatedDashes = () => {
    let createdRoutes = this.props.routes.filter(route => route.creator === this.props.currentUser.username)
    if (createdRoutes === undefined) {
      return( <p>
                You haven't created any routes yet...
                <br/>
                Click <Link to="/routes/new">here</Link> to create a route!
              </p>
      )
    } else {
      return createdRoutes.map(route => {
        return <RouteCard key={route.id} route={route}/>
      })
    }

  }

  renderPastDashes = () => {
    let pastDashes = this.props.userGames.filter(game => !game.active)
    if (pastDashes === undefined || pastDashes.length === 0) {

      return( <p>
                You don't have any past dashes...
                <br/>
                Click <Link to="/routes">here</Link> to select a route!
              </p>
      )
    } else {
      return pastDashes.map(dash => {
        let thisRoute = this.props.routes.find(route => route.id === dash.route_id)
        return <RouteCard key={dash.id} route={thisRoute}/>
      })
    }
  }

  redirectToCreateRoute = () => {
    this.props.history.push("/routes/new")
  }

  componentDidMount() {
    let userId = this.props.match.params.id
    this.props.fetchGames(userId)
    this.props.fetchRoutes()
  }

  render() {
    let username;
    Object.keys(this.props.currentUser).length !== 0 ? username = this.props.currentUser.username : username = ""
    return (
      <main>
        <button onClick={this.signOut} style={{align:"left"}}>Sign Out</button>
        <h1 style={{align:"center"}}>{username}</h1>

        <hr/><h3>Active Dash</h3><hr/>
        <ul id="active-dash">
          {this.renderActiveDash()}
        </ul>
        <br/>



        <hr/><h3>Past Dashes</h3><hr/>
        <ul id="past-dashes">
          {this.renderPastDashes()}
        </ul>
        <br/>

        <hr/>
          <h3>Created Routes</h3>
        <hr/>
        <button onClick={() => {this.redirectToCreateRoute()}}>Create Route</button>
        <ul id="created-routes">
          {this.renderCreatedDashes()}
        </ul>
        <br/>

      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    userGames: state.userGames,
    routes: state.routes,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: (userId) => dispatch(fetchGames(userId)),
    fetchRoutes: () => dispatch(fetchRoutes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
