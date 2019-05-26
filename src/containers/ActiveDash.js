import React from 'react'
import L from 'leaflet'
import ActiveDashError from '../components/ActiveDashError'
import { connect } from 'react-redux'
import endDash from '../actions/endDash'
import updateGame from '../actions/updateGame'

const style = {
  width: "100%",
  height: "400px"
};

class ActiveDash extends React.Component {

  getActiveDash = () => {
    let activeDash = this.props.currentUser.games.find(game => game.active)
    if (activeDash) {
      return activeDash
    }
  }

  getActiveRoute = () => {
    if (this.props.currentUser.games) {
      let activeDash = this.props.currentUser.games.find(game => game.active)
      if (activeDash) {
        let activeRoute = this.props.routes.find(route => route.id === activeDash.route_id)
        return activeRoute
      }
    }
  }

  getActiveId = () => {
    return this.getActiveRoute().id
  }

  componentDidUpdate() {
    this.activeDash = this.props.currentUser.games.find(game => game.active)
    if (this.activeDash) {
      this.nextCheckpointIndex = (this.activeDash.current_checkpoint + 1)
      this.nextCheckpointCoords = [this.routeSites[this.nextCheckpointIndex].x_coordinate,
                                   this.routeSites[this.nextCheckpointIndex].y_coordinate]

      this.map.setView(this.nextCheckpointCoords, 12)

      this.marker.remove()
      this.marker = undefined

      this.marker = L.marker(this.nextCheckpointCoords, {
          title: "Next Checkpoint"
      }).addTo(this.map).bindPopup("Next Checkpoint!")

      this.nextCoordsText.innerHTML = `<p>LATITUDE: ${this.nextCheckpointCoords[0]}</p>
                                  <p>LONGITUDE: ${this.nextCheckpointCoords[1]}</p>`
    }
  }

  componentDidMount() {
    if (this.props.currentUser.games.find(game => game.active)) {
      this.nextCoordsText = document.querySelector("#next-coords")
      this.userId = parseInt(this.props.match.params.id)
      this.gameId = this.getActiveDash().id
      this.activeDash = this.props.currentUser.games.find(game => game.active)
      this.dashName = this.activeDash.name
      this.routeSites = this.props.routes.find(route => route.id === this.activeDash.route_id).sites
      this.nextCheckpointIndex = (this.activeDash.current_checkpoint + 1)
      this.nextCheckpointCoords = [this.routeSites[this.nextCheckpointIndex].x_coordinate,
                                   this.routeSites[this.nextCheckpointIndex].y_coordinate]
      this.map =  L.map('play-map', { dragging: false ,
                                scrollWheelZoom: false,
                                keyboard: false,
                                boxZoom: false,
                                tap: false,
                                touchZoom: false,
                                doubleClickZoom: false,
                                zoomControl: false}).setView(this.nextCheckpointCoords, 12);

      L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'streets-v9',
          accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }).addTo(this.map)

      this.marker = L.marker(this.nextCheckpointCoords, {
          title: "Next Checkpoint"
      }).addTo(this.map).bindPopup("Next Checkpoint!");

      this.nextCoordsText.innerHTML = `<p>LATITUDE: ${this.nextCheckpointCoords[0]}</p>
                                  <p>LONGITUDE: ${this.nextCheckpointCoords[1]}</p>`
    }
  }

  render() {
    if (this.props.currentUser.games.find(game => game.active)) {
      let routeName;
      this.getActiveRoute() ? routeName = this.getActiveRoute().name : routeName = undefined
      return(
        <main>
          <div id="play-map" style={style}></div>
          <h1>
            {routeName}
          </h1>
          <div id="next-coords"></div>
          <button onClick={() => {
            this.props.updateGame(this.gameId,
                                  this.props.history,
                                  this.nextCheckpointIndex,
                                  this.activeDash,
                                  this.routeSites,
                                  this.nextCheckpointCoords,
                                  this.userId)
          }}>
            At Checkpoint
          </button>
          <button onClick={() => {
            this.props.endDash(this.gameId, this.props.history ,this.userId) }
          }>
            End Dash
          </button>
        </main>
      )
    } else {
      return <ActiveDashError/>
    }
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
    endDash: (gameId, history, userId) => dispatch(endDash(gameId, history, userId)),
    updateGame: (gameId, history, nextCP, game, sites, nextCoords, userId) =>  (
      dispatch(updateGame(gameId, history, nextCP, game, sites, nextCoords, userId))
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveDash)
