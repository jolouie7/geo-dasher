import React from 'react'
import { Link } from 'react-router-dom'

const RouteInfo = props => {

  function generateTopTimes() {
    let allGames = props.route.games.filter(game => game.completed)
    let allTimes = allGames.map(game => {
      let user = props.users.find(user => user.id === game.user_id)
      return [user, game.travel_time]
    })
    if (allTimes.length !== 0) {
      let topTimesInMs = allTimes.map(userAndTime => {
        userAndTime[1] = userAndTime[1].split(":").map(time => parseInt(time))
        let ms = 0
        userAndTime[1].forEach((int, index) => {
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
        return [userAndTime[0], ms]
      })

      topTimesInMs = topTimesInMs.sort((a,b) => a[1] - b[1])

      let sortedTimes = topTimesInMs.map(userAndTime => {
        let d = (Math.floor((userAndTime[1]/1000/60/60/24/365 - Math.floor(userAndTime[1]/1000/60/60/24/365)) * 365) ).toString()
        let h = (Math.floor((userAndTime[1]/1000/60/60/24 - Math.floor(userAndTime[1]/1000/60/60/24)) * 24) ).toString()
        let m = (Math.floor((userAndTime[1]/1000/60/60 - Math.floor(userAndTime[1]/1000/60/60)) * 60) ).toString()
        let s = (Math.floor((userAndTime[1]/1000/60 - Math.floor(userAndTime[1]/1000/60)) * 60) ).toString()
        h = h.length === 1 ? `0${h}` : h
        m = m.length === 1 ? `0${m}` : m
        s = s.length === 1 ? `0${s}` : s
        return [userAndTime[0], `${d}:${h}:${m}:${s}`]
      })
      sortedTimes.splice(3, sortedTimes.length-3)
      return sortedTimes.map(userAndTime => {
        if (userAndTime[0]) {
          return (<Link to={`/users/${userAndTime[0].id}`}>
                    <li>
                     {`${userAndTime[0].username} - ${userAndTime[1]}`}
                    </li>
                  </Link>)
        }
        return null
      })

    } else {
      return <h6>This route currently has no completions. Be the first!</h6>
    }
  }

  let timesCompleted = props.route.games.filter(game => game.completed).length

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
      <p>Finished {timesCompleted} times</p>
      <br/><br/>
      <h3>Leaderboard:</h3>
      <ol>
        {generateTopTimes()}
      </ol>
    </section>
  )
}

export default RouteInfo
