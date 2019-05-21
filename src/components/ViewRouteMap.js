import React from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'

const style = {
  width: "100%",
  height: "400px"
};

class ViewRouteMap extends React.Component {

  componentDidMount() {
    let x_coord = this.props.route.sites[0].x_coordinate
    let y_coord = this.props.route.sites[0].y_coordinate

    this.map = L.map('map', { dragging: false ,
                              scrollWheelZoom: false,
                              keyboard: false,
                              boxZoom: false,
                              tap: false,
                              touchZoom: false,
                              doubleClickZoom: false,
                              zoomControl: false,
                              touchZoom: false  }).setView([x_coord, y_coord], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'streets-v9',
        accessToken: 'pk.eyJ1IjoibWF0am9jYW1wYmVsbCIsImEiOiJjanZudXE5ZGsxcnZzM3lwZmR5YThxdWRoIn0.LhhhzBe2q0GWgtnJYZvBcg'
    }).addTo(this.map)

    L.marker([x_coord, y_coord], {
        title: "Start Here!"
    }).addTo(this.map).bindPopup("Start Here!");

  }

  render() {
    return (
      <div id="map" style={style} />
    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ViewRouteMap)
