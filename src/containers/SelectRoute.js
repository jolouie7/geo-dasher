import React from 'react'
import { connect } from 'react-redux'
import fetchRoutes from '../actions/fetchRoutes'
import RouteCard from '../components/RouteCard'
import RouteFilter from './RouteFilter'



class SelectRoute extends React.Component {

  generateRoutes = () => {
    let routes;
    if (this.props.routes) {
      routes = this.props.routes
      return routes.map(route => {
        return <RouteCard key={route.id} route={route}/>
      })
    } else if (this.props.routes) {

    }
  }

  componentDidMount() {
    this.props.getRoutes()
  }

  render() {
    return (
      <main>
        <h1>Select Route</h1>
        <hr/>
        <RouteFilter/>
        <hr/>
        <ul id="routes-list">
          {this.generateRoutes()}
        </ul>
      </main>
    )
  }

}

const mapStateToProps = state => {
  return {
    routes: state.filteredRoutes,
    proximity: state.proximityFilter,
    distance: state.distanceFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoutes: () => { dispatch(fetchRoutes()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoute)
