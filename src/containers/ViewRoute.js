import React from 'react'
import { connect } from 'react-redux'
import fetchRoutes from '../actions/fetchRoutes'
import RouteInfo from '../components/RouteInfo'
import ViewRouteMap from '../components/ViewRouteMap'

class ViewRoute extends React.Component {

  findRoute = () => {
    let routeId = parseInt(this.props.match.params.id)
    return this.props.routes.find(route => route.id === routeId)
  }

  generateRouteInfo = () => {
    if ( this.findRoute() === undefined ) {
      return ""
    } else {
      let route = this.findRoute()
      return <RouteInfo route={route} />
    }
  }

  componentDidMount() {
    this.props.fetchRoutes()
  }

  render() {
    return (
      <main>
        <ViewRouteMap route={this.findRoute()}/>
        <br/><br/><br/>
        {this.generateRouteInfo()}
      </main>
    )
  }

}

const mapStateToProps = state => {
  return {
    routes: state.routes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutes: () => { dispatch(fetchRoutes()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoute)
