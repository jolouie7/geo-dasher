import React from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'
import fetchRoutes from '../actions/fetchRoutes'
import createGame from '../actions/createGame'
import RouteInfo from '../components/RouteInfo'

const style = {
  width: "100%",
  height: "400px"
};

class ViewRoute extends React.Component {

  findRoute = () => {
    let routeId = parseInt(this.props.match.params.id)
    return this.props.routes.find(route => route.id === routeId)
  }

  checkForActiveDash = () => {
    let activeDash = this.props.currentUser.games.find(game => game.active)
    if (activeDash) {
      return true
    }
  }

  generateRouteInfo = () => {
    if ( this.findRoute() === undefined && this.props.users) {
      return ""
    } else {
      let route = this.findRoute()
      return <RouteInfo route={route} users={this.props.users}/>
    }
  }

  beginDash = (clientLatLng) => {
    let userId = this.props.currentUser.id
    let routeId = parseInt(this.props.match.params.id)
    let activeDash = this.props.currentUser.games.find(game => game.active)

      if (activeDash === undefined && clientLatLng === undefined) {
        this.props.createGame(routeId, userId, this.props.history)
      } else if (activeDash === undefined && clientLatLng) {
        if (this.clientLatLng) {
          let distanceInFt = this.map.distance(this.marker.getLatLng(), this.clientLatLng) * 3.28084
          if (distanceInFt < 150) {
            this.error.innerHTML = ''
            this.props.createGame(routeId, userId, this.props.history)
          } else {
            this.error.innerHTML = `Not close enough! You are ${Math.floor(distanceInFt)} ft away.`
          }
        }
      }


  }

  redirectToActiveDash = () => {
    let userId = this.props.currentUser.id
    this.props.history.push(`/users/${userId}/active-dash`)
  }

  setupMap = () => {

    return () => {
      if (this.mapRendered === false) {
        let x_coord = this.route.sites[0].x_coordinate
        let y_coord = this.route.sites[0].y_coordinate

        this.map =  L.map('view-map', {
                            dragging: false,
                            scrollWheelZoom: false,
                            keyboard: false,
                            boxZoom: false,
                            tap: false,
                            touchZoom: false,
                            doubleClickZoom: false,
                            zoomControl: false
                          })
                          .locate({
                            timeout: 20000,
                            watch: true,
                            enableHighAccuracy: true
                          }).setView([x_coord, y_coord], 12);

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">
            OpenStreetMap</a> contributors,
            <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
            Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
            maxZoom: 18,
            id: 'streets-v9',
            accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
        }).addTo(this.map)

        this.onLocationFound = (e) => {
          this.clientLatLng = e.latlng
          console.log(e.latlng)
        }

        this.map.on('locationfound', this.onLocationFound)

        this.map.on('locationerror', (e) => {
          console.log(e.message)
        })

        this.marker = L.marker([x_coord, y_coord], {
            title: "Start Here!"
        }).addTo(this.map).bindPopup("Start Here!");
        this.mapRendered = true;
      }
    }
  }

  componentDidMount() {
    this.error = document.querySelector('#error')
    this.route = this.findRoute()
    this.errors = document.querySelector('#error-msg')
    this.props.fetchRoutes()
    if (this.checkForActiveDash()) {
      let activeDashButton = document.querySelector(`#to-active-dash`)
      activeDashButton.style.display = "inline-block"
      this.errors.innerHTML = `You're already dashing!
      Finish or quit your past dash to start this this one.`
    }
    this.mapRendered = false;
  }

  componentDidUpdate() {
    if (this.route.sites[0]) {
      this.setupMap()()
    }
  }

  render() {
    let route;
    this.findRoute() ? route = this.findRoute() : route = undefined
    return (
      <main>
        { route !== undefined ?
          <div id="view-map" style={style} /> :
          "" }
        <p id="error" style={{color: "red"}}></p>
        <br/>
        <button onClick={() => { this.beginDash() }}>Cheat Start</button>
        <button onClick={() => { this.beginDash(this.clientLatLng) }}>Smart Start</button>
        <p id="error-msg" style={{color:"red"}}>
        </p>
        <button id="to-active-dash"
                onClick={() => {this.redirectToActiveDash()}}
                style={{display:'none'}}
              >
          Active Dash
        </button>

        <br/>
          {this.generateRouteInfo()}
      </main>
    )
  }

}

const mapStateToProps = state => {
  return {
    routes: state.routes,
    currentUser: state.currentUser,
    loadedRoutes: state.loadedRoutes,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutes: () => { dispatch(fetchRoutes()) },
    createGame: (userId, routeId, history) => { dispatch(createGame(userId, routeId, history)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoute)
