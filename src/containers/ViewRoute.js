import React from 'react'
import { connect } from 'react-redux'
import fetchRoutes from '../actions/fetchRoutes'
import createGame from '../actions/createGame'
import RouteInfo from '../components/RouteInfo'
import ViewRouteMap from '../components/ViewRouteMap'
import { Link } from 'react-router-dom'

class ViewRoute extends React.Component {

  findRoute = () => {
    let routeId = parseInt(this.props.match.params.id)
    return this.props.routes.find(route => route.id === routeId)
  }

  checkForActiveDash = () => {
    let activeDash = this.props.currentUser.games.find(game => game.active)
    let userId = this.props.currentUser.id
    if (activeDash) {
      return (
        `You're already dashing!
        Finish or quit your past dash to start this this one.`
      )
    } else {
      return undefined
    }
  }

  generateRouteInfo = () => {
    if ( this.findRoute() === undefined ) {
      return ""
    } else {
      let route = this.findRoute()
      return <RouteInfo route={route} />
    }
  }

  beginDash = () => {
    let userId = this.props.currentUser.id
    let routeId = parseInt(this.props.match.params.id)
    let activeDash = this.props.currentUser.games.find(game => game.active)
    if (activeDash === undefined) {
      this.props.createGame(routeId, userId)
      this.props.history.push(`/users/${userId}/active-dash`)
    }
  }

  redirectToActiveDash = () => {
    let userId = this.props.currentUser.id
    this.props.history.push(`/users/${userId}/active-dash`)
  }

  componentDidMount() {
    this.props.fetchRoutes()
  }

  render() {
    return (
      <main>
        <ViewRouteMap route={this.findRoute()}/>
        <br/><br/><br/>
        <button onClick={() => { this.beginDash() }}>Begin Dash!</button>
        <p id="error-msg" style={{color:"red"}}>
          {this.checkForActiveDash() ? this.checkForActiveDash() : undefined}
        </p>
        {this.checkForActiveDash() ?
         <button onClick={() => {this.redirectToActiveDash()}}>Go To Active Dash</button> :
         undefined
        }
        <br/>
          {this.generateRouteInfo()}
      </main>
    )
  }

}

const mapStateToProps = state => {
  return {
    routes: state.routes,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutes: () => { dispatch(fetchRoutes()) },
    createGame: (userId, routeId) => { dispatch(createGame(userId, routeId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoute)
