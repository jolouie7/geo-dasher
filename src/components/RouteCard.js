import React from 'react'
import { Link } from 'react-router-dom'

const DashCard = props => {
  let routeName, routeDistance, altTransport, routeId;
  if (props.route) {
    routeName = props.route.name
    routeDistance = props.route.distance
    altTransport = props.route.alt_transportation
    routeId = props.route.id
  }
  return (
      <>
        <Link to={`/routes/${routeId}`}>
          <li>
            <p>
              Name: {routeName} - Distance: {routeDistance} - Transportation: Walking, {altTransport}
            </p>
          </li>
        </Link>
      </>
  )
}

export default DashCard

// <Link to="/dashes/new">
// <Link to={`/dashes/${props.route.id}`}>
// </Link>
