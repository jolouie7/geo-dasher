import React from 'react'
import { Link } from 'react-router-dom'

const DashCard = props => {
  let routeName, routeDistance, altTransport, routeId;
  if (props.route) {
    routeName = props.route.name
    routeDistance = props.route.distance

    props.route.alt_transportation ?
    altTransport = `, ${props.route.alt_transportation}` :
    altTransport = undefined

    routeId = props.route.id
  }

  if (props.type === "past") {
    let time;
    let date = new Date(props.dash.created_at).toString().split(" ");
    date = date.slice(1,5)
    date.splice(3, 0, "@")
    date = date.join(" ")
    props.dash.completed ? time = props.dash.travel_time : time = "Incomplete"
    return (
        <>
          <Link to={`/routes/${routeId}`}>
            <li type="past">
              <p> Name: {routeName} </p>
              <p> Distance: {routeDistance} </p>
              <p> Transportation: Walking{altTransport} </p>
              <p> Time: {time} </p>
              <p> Started: {date} </p>
            </li>
          </Link>
        </>
    )
  } else if (props.type === "active") {
    return (
        <>
          <Link to={`/users/${props.user.id}/active-dash`}>
            <li type="active">
              <p> Name: {routeName} </p>
              <p> Distance: {routeDistance} </p>
              <p> Transportation: Walking{altTransport} </p>
            </li>
          </Link>
        </>
    )
  } else {
    return (
        <>
          <Link to={`/routes/${routeId}`}>
            <li type="other">
              <p> Name: {routeName} </p>
              <p> Distance: {routeDistance} </p>
              <p> Transportation: Walking{altTransport} </p>
            </li>
          </Link>
        </>
    )
  }
}

export default DashCard
