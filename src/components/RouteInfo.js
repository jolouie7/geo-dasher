import React from 'react'

const RouteInfo = props => {

  function generateTopTimes() {
    let topTimes = props.route.games.filter(game => game.completed)

    if (topTimes.length !== 0) {
      topTimes = topTimes.sort((a, b) => a - b )
      return topTimes.map(game => {
        return <li>{game.travel_time}</li>
      })
    } else {
      return <p>This route currently has no completions. Be the first!</p>
    }
  }

  return (
    <section>
      <h1>{props.route.name}</h1>
      <p>{props.route.description}</p>
      <br/>
      <h3>Created By: {props.route.creator}</h3>
      <br/>
      <h3>Distance: {props.route.distance} mi</h3>
      <br/>
      <h5>Transportation Allowed:</h5>
        <p>{props.route.alt_transportation}</p>
        <p>Walking</p>
      <br/>
      <p>Finished <i>{props.route.times_completed}</i> times</p>
      <br/><br/>
      <h3>Leaderboard:</h3>
      <ol>
        {generateTopTimes()}
      </ol>
    </section>
  )
}

export default RouteInfo
