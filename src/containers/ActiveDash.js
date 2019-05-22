import React from 'react'
import L from 'leaflet'
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
    let nextCoordsText = document.querySelector("#next-coords")
    this.userId = parseInt(this.props.match.params.id)
    this.gameId = this.getActiveDash().id
    this.activeDash = this.props.currentUser.games.find(game => game.active)
    this.routeSites = this.props.routes.find(route => route.id === this.activeDash.route_id).sites
    this.nextCheckpointIndex = (this.activeDash.current_checkpoint + 1)
    this.nextCheckpointCoords = [this.routeSites[this.nextCheckpointIndex].x_coordinate,
                                 this.routeSites[this.nextCheckpointIndex].y_coordinate]
    this.map =  L.map('map', { dragging: false ,
                              scrollWheelZoom: false,
                              keyboard: false,
                              boxZoom: false,
                              tap: false,
                              touchZoom: false,
                              doubleClickZoom: false,
                              zoomControl: false,
                              touchZoom: false  }).setView(this.nextCheckpointCoords, 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'streets-v9',
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
    }).addTo(this.map)

    L.marker(this.nextCheckpointCoords, {
        title: "Next Checkpoint"
    }).addTo(this.map).bindPopup("Next Checkpoint!");

    nextCoordsText.innerHTML = `<p>LATITUDE: ${this.nextCheckpointCoords[0]}</p>
                                <p>LONGITUDE: ${this.nextCheckpointCoords[1]}</p>`

  }

  render() {
    return(
      <main>
        <div id="map" style={style}></div>
        <h1>{this.getActiveRoute().name}</h1>
        <div id="next-coords"></div>
        <button onClick={() => {
          this.props.updateGame(this.gameId, this.props.history, this.nextCheckpointIndex)
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
    updateGame: (gameId, history, nextCP) => dispatch(updateGame(gameId, history, nextCP))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveDash)
