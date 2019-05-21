import React from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'

const style = {
  width: "100%",
  height: "400px"
};

class CreateRoute extends React.Component {

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  addCheckpoint = (lat, lon) => {
    if (this.marker && this.state.checkpoints.length < 5) {
      let cpLat = this.marker.getLatLng().lat
      let cpLon = this.marker.getLatLng().lng
      this.coordList.innerHTML += `<li>Lat: ${cpLat}, Lon: ${cpLon}</li>`
      this.setState({ checkpoints: [...this.state.checkpoints, [lat, lon]]})
      this.marker.remove();
      this.marker = undefined;
      this.addCpError.innerHTML = ""
    } else if (this.state.checkpoints.length === 5) {
      this.addCpError.innerHTML = "You can't have more than 5 checkpoints!"
    } else if (this.marker === undefined) {
      this.addCpError.innerHTML = "You must add a marker to the map first!"
    }
  }

  removeCheckpoint = () => {
    this.coordList.lastElementChild.remove()
    let newCheckpointsList = this.state.checkpoints.slice(0, -1)
    this.setState({ checkpoints: newCheckpointsList })
  }

  constructor() {
    super()
    this.state = {
      checkpoints: [],
      altTransportation: "",
      name: "",
      description: ""
    }
  }

  componentDidMount() {
    this.marker = undefined;
    this.addCpError = document.querySelector('#add-cp-error')
    this.coordList = document.querySelector('#coordinates-list')
    this.map = L.map('map').locate({watch: false, enableHighAccuracy: true, setView: true, maxZoom: 12});

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'streets-v9',
        accessToken: 'pk.eyJ1IjoibWF0am9jYW1wYmVsbCIsImEiOiJjanZudXE5ZGsxcnZzM3lwZmR5YThxdWRoIn0.LhhhzBe2q0GWgtnJYZvBcg'
    }).addTo(this.map)

    this.map.on('click', (e) => {
      if (this.marker === undefined) {
        this.marker = L.marker([e.latlng.lat, e.latlng.lng], {title: 'checkpoint'}).addTo(this.map)
        this.marker.bindPopup(`${this.marker.getLatLng()}`)
      } else {
        this.marker.setLatLng([e.latlng.lat, e.latlng.lng])
        this.marker.bindPopup(`${this.marker.getLatLng()}`)
      }
    })
  }

  render() {
    return (
      <main>
        <div id="map" style={style} />
        <button id="add-checkpoint" onClick={this.addCheckpoint}>Add Checkpoint</button>
        <button id="remove-checkpoint" onClick={this.removeCheckpoint}>Remove Checkpoint</button>
        <p id="add-cp-error" style={{color:"red"}}></p>
        <h1>Create Route</h1>
        <label htmlFor="name">Name:</label><br/>
        <input name="name"
               type="text"
               maxLength="35"
               onChange={this.handleChange}
               value={this.state.name}/>
        <br/><br/>
        <label htmlFor="description">Description:</label><br/>
        <textarea name="description"
                  type="textarea"
                  rows="4"
                  maxLength="140"
                  onChange={this.handleChange}
                  value={this.state.description}/>
        <br/><br/>
        <select defaultValue="" onChange={this.handleChange} name="altTransportation">
          <option value="">Only Walking</option>
          <option value="transit">Transit</option>
          <option value="bike">Bicycle</option>
          <option value="vehicle">Vehicle</option>
        </select>
        <ol id="coordinates-list">
        </ol>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(CreateRoute)
