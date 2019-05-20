import React from 'react'
import { connect } from 'react-redux'
import setProximityFilter from '../actions/setProximityFilter'
import setDistanceFilter from '../actions/setDistanceFilter'


class RouteFilter extends React.Component {

  handleDistanceChange = (e) => {
    let miles = (e.target.value)
    this.props.setDistance(miles)
  }

  render(){
    return (
      <>
        <label htmlFor="distanceFilter">Total Distance(max)</label>
        <br/>
        <select onChange={this.handleDistanceChange} name="distanceFilter">
          <option disabled selected value={1000.0}>-</option>
          <option value={1.0}>1</option>
          <option value={2.0}>2</option>
          <option value={3.0}>3</option>
          <option value={4.0}>4</option>
          <option value={5.0}>5</option>
          <option value={10.0}>10</option>
          <option value={20.0}>20</option>
          <option value={1000.0}>20+</option>
        </select>
      </>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    setDistance: (mi) => { dispatch(setDistanceFilter(mi)) },
    setProximity: (mi) => { dispatch(setProximityFilter(mi)) },
  }
}

export default connect(null, mapDispatchToProps)(RouteFilter)

// <label htmlFor="filterProximity">Miles away (max)</label>
// <br/>
// <select name="filterProximity">
//   <option value={1}>1</option>
//   <option value={2}>2</option>
//   <option value={3}>3</option>
//   <option value={1000}>3+</option>
// </select>
