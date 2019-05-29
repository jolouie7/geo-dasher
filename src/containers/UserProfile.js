import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RouteCard from '../components/RouteCard'
import fetchRoutes from '../actions/fetchRoutes'
import fetchGames from '../actions/fetchGames'
import reAuth from '../actions/reAuth'

class UserProfile extends React.Component {

  renderActiveDash = () => {
    if (this.user.games) {
      let activeDash = this.user.games.find(game => game.active)
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
                            user={this.user}
                            id={activeRoute ? activeRoute.id : null}
                            route={activeRoute}
                            game={activeDash}
                            type={"active"}/>)
        } else {
          return null
        }
      }
    }
  }

  renderCreatedDashes = () => {
    let createdRoutes = this.props.routes.filter(route => route.creator === this.user.username)
    if (createdRoutes === undefined) {
      return( <p>
                You haven't created any routes yet...
                <br/>
                Click <Link to="/routes/new">here</Link> to create a route!
              </p>
      )
    } else {
      return createdRoutes.map(route => {
        return <RouteCard key={route.id}
                          route={route}
                          type={"created"}/>
      })
    }
  }

  renderPastDashes = () => {
    if (this.user.games) {
      let pastDashes = this.user.games.filter(game => !game.active)
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
          return <RouteCard key={dash.id}
                            dash={dash}
                            route={thisRoute}
                            type={"past"}/>
        })
      }
    }
  }

  redirectToCreateRoute = () => {
    this.props.history.push("/routes/new")
  }

  getUser = () => {
    let thisUser = this.props.users.find(user => {
      return user.id === parseInt(this.props.match.params.id)
    })
    return thisUser
  }

  componentDidMount() {
    this.props.reAuth()
    this.props.fetchRoutes()
  }

  componentDidUpdate() {
    if (this.props.users.length > 0) {
      this.user = this.getUser()
    }
  }

  render() {
    let username;
    return (
      <main>
        {
          this.user ?
          <h1 style={{align:"center"}}>{this.user.username}</h1> :
          undefined
        }


        {
          this.props.currentUser.id === parseInt(this.props.match.params.id) &&
          this.user ?
          <>
            <hr/><h3>Active Dash</h3><hr/>
            <ul id="active-dash">
              {this.renderActiveDash()}
            </ul>
            <br/>
          </> :
          undefined
        }

        <hr/><h3>Past Dashes</h3><hr/>
        <ul id="past-dashes">
          { this.user ? this.renderPastDashes() : null}
        </ul>
        <br/>

        <hr/>
          <h3>Created Routes</h3>
        <hr/>

        <ul id="created-routes">
          { this.user ? this.renderCreatedDashes() : null}
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
    currentUser: state.currentUser,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutes: () => dispatch(fetchRoutes()),
    reAuth: () => dispatch(reAuth()),
    clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
