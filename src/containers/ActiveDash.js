import React from 'react'
import { connect } from 'react-redux'

class ActiveDash extends React.Component {

  getActiveDash = () => {
    let activeDash = this.props.currentUser.games.find(game => game.active)
    if (activeDash) {
      return activeDash
    }
  }

  getActiveRoute = () => {
    let activeDash = this.props.currentUser.games.find(game => game.active)
    if (activeDash) {
      let activeRoute = this.props.routes.find(route => route.id === activeDash.route_id)
      return activeRoute
    }
  }

  render() {
    return(
      <main>
        <h1>{this.getActiveRoute().name}</h1>

      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    routes: state.routes
  }
}

export default connect(mapStateToProps)(ActiveDash)
