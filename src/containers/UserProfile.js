import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RouteCard from '../components/RouteCard'
import fetchRoutes from '../actions/fetchRoutes'
import fetchGames from '../actions/fetchGames'

// let activeDashTag = document.querySelector('#active-dash')
// let pastDashes = document.querySelector('#past-dashes')
// let createdDashes = document.querySelector('#created-dashes')

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
        return <RouteCard key={activeDash.id} id={activeRoute ? activeRoute.id : null} route={activeRoute} game={activeDash}/>
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
                Click <Link to="/routes">here</Link> to select a dash!
              </p>
      )
    } else {
      console.log(pastDashes)
      return pastDashes.map(dash => {
        let thisRoute = this.props.routes.find(route => route.id === dash.route_id)
        return <RouteCard key={dash.id} route={thisRoute} game={dash}/>
      })
    }
  }

  componentDidMount() {
    let user_id = this.props.match.params.id
    this.props.dispatch(fetchGames(user_id))
    this.props.dispatch(fetchRoutes())
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

        <hr/><h3>Created Routes</h3><hr/>
        <ul id="created-routes">
          {this.renderCreatedDashes()}
        </ul>
        <br/>

      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGames: state.userGames,
    routes: state.routes,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(UserProfile)


// 1. fetch all routes from http://localhost:3005/api/v1/routes & all
// games from http://localhost:3005/api/v1/games once the component is loaded
// DONE !!!

// 2. when user signs in filter through all routes stored in state &
// display the ones that this user created under section 'Created Dashes'

// 3. filter through all the games that belong to this user and store the
// one with an active attribute under the section 'Active Dash'
// DONE !!!

// 4. filter through all the games that belong to this user and store all
// that are not active under 'Past Dashes'
// DONE !!!
