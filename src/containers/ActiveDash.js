import React from 'react'
import { connect } from 'react-redux'
import endDash from '../actions/endDash'

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

  getActiveId = () => {
    return this.getActiveRoute().id
  }

  componentDidMount() {
    this.userId = parseInt(this.props.match.params.id)
    this.gameId = this.getActiveDash().id
  }

  render() {
    return(
      <main>
        <h1>{this.getActiveRoute().name}</h1>
        <button onClick={() => {
          this.props.endDash(this.gameId, this.props.history ,this.userId) }
        }>
          End Dash
        </button>
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

const mapDispatchToProps = dispatch => {
  return {
    endDash: (gameId, history, userId) => dispatch(endDash(gameId, history, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveDash)
