const updateGame = (gameId, history, nextCP, game, sites,
  nextCoords, userId, route) => {

  let createdAt = new Date (new Date(game.created_at).toJSON())
  let updatedAt = Date.now()
  let timeDiff = (updatedAt - createdAt)
  let d = ( Math.floor((timeDiff/1000/60/60/24/365 - Math.floor(timeDiff/1000/60/60/24/365)) * 365) ).toString()
  let h = ( Math.floor((timeDiff/1000/60/60/24 - Math.floor(timeDiff/1000/60/60/24)) * 24) ).toString()
  let m = ( Math.floor((timeDiff/1000/60/60 - Math.floor(timeDiff/1000/60/60)) * 60) ).toString()
  let s = ( Math.floor((timeDiff/1000/60 - Math.floor(timeDiff/1000/60)) * 60) ).toString()
  h.length === 1 ? h = `0${h}` : h = h
  m.length === 1 ? m = `0${m}` : m = m
  s.length === 1 ? s = `0${s}` : s = s
  let travelTime = `${d}:${h}:${m}:${s}`
  let lastCoords = [sites[sites.length-1].x_coordinate, sites[sites.length-1].y_coordinate]

  if (nextCoords[0] === lastCoords[0] && nextCoords[1] === lastCoords[1]) {
    return (dispatch) => {
      dispatch({ type: "BEGIN_UPDATING_GAME" })
      return fetch(`http://localhost:3005/api/v1/games/${gameId}`, {
               method: "PATCH",
               headers: {
                 "Content-Type": 'application/json',
                 "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                 "Accept": 'application/json'
               },
               body: JSON.stringify({
                 current_checkpoint: nextCP,
                 travel_time: travelTime,
                 active: false,
                 completed: true
               })
             })
             .then(res => res.json())
             .then(updatedGame => {
                 dispatch({ type: "UPDATE_GAME", game: updatedGame })
                 fetch(`http://localhost:3005/api/v1/routes/${route.id}`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                          },
                          body: JSON.stringify({
                            times_completed: (route.times_completed + 1)
                          })
                        })
                        .then(res => res.json())
                        .then(updatedRoute => {
                          dispatch({type: "UPDATE_ROUTE", 
                                    route: updatedRoute })
                        })
             })
             .then(() => history.push(`/users/${userId}`))

    }
  } else {
    return (dispatch) => {
      dispatch({ type: "BEGIN_UPDATING_GAME" })
      return fetch(`http://localhost:3005/api/v1/games/${gameId}`, {
               method: "PATCH",
               headers: {
                 "Content-Type": 'application/json',
                 "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                 "Accept": 'application/json'
               },
               body: JSON.stringify({
                 current_checkpoint: nextCP,
                 travel_time: travelTime
               })
             })
             .then(res => res.json())
             .then(updatedGame => {
                 dispatch({ type: "UPDATE_GAME", game: updatedGame })
             })
    }
  }

}

export default updateGame
