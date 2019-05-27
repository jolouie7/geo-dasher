import React from 'react'

const RouteInfo = props => {

  function generateTopTimes() {
    let allGames = props.route.games.filter(game => game.completed)
    let allTimes = allGames.map(game => game.travel_time)
    if (allTimes.length !== 0) {
      let topTimesInMs = allTimes.map(time => {
        time = time.split(":").map(time => parseInt(time))
        let ms = 0
        let timesInMs = time.map((int, index) => {
          switch (index) {
            case 0:
              ms += int * 86400000
              break
            case 1:
              ms += int * 3600000
              break
            case 2:
              ms += int * 60000
              break
            case 3:
              ms += int * 1000
              break
            default:
              return undefined
          }
        })
        return ms
      })
      topTimesInMs = topTimesInMs.sort((a,b) => a - b)
      let sortedTimes = topTimesInMs.map(time => {
        let d = (Math.floor((time/1000/60/60/24/365 - Math.floor(time/1000/60/60/24/365)) * 365) ).toString()
        let h = (Math.floor((time/1000/60/60/24 - Math.floor(time/1000/60/60/24)) * 24) ).toString()
        let m = (Math.floor((time/1000/60/60 - Math.floor(time/1000/60/60)) * 60) ).toString()
        let s = (Math.floor((time/1000/60 - Math.floor(time/1000/60)) * 60) ).toString()
        h.length === 1 ? h = `0${h}` : h = h
        m.length === 1 ? m = `0${m}` : m = m
        s.length === 1 ? s = `0${s}` : s = s
        return `${d}:${h}:${m}:${s}`
      })
      console.log(sortedTimes)
      sortedTimes.splice(3, sortedTimes.length-3)
      return sortedTimes.map(time => {
        return <li>{time}</li>
      })

    } else {
      return <h6>This route currently has no completions. Be the first!</h6>
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
      <p>Finished {props.route.times_completed} times</p>
      <br/><br/>
      <h3>Leaderboard:</h3>
      <ol>
        {generateTopTimes()}
      </ol>
    </section>
  )
}

export default RouteInfo
