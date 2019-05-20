import React from 'react'
import { Link } from 'react-router-dom'

const DashCard = props => {
  let routeName, routeDistance, altTransport;
  if (props.route && props.game) {
    routeName = props.route.name
    routeDistance = props.route.distance
    altTransport = props.route.alt_transportation
  }
  return (
      <li>
        <p>
          Name: {routeName} - Distance: {routeDistance} - Transportation: Walking, {altTransport}
        </p>
      </li>
  )
}

export default DashCard
