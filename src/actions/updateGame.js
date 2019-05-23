const updateGame = (gameId, history, nextCP, game, sites, nextCoords, userId) => {
  let createdAt = new Date (new Date(game.created_at).toJSON())
  let updatedAt = Date.now()
  let timeDiff = (updatedAt - createdAt)
  let d = ( Math.floor((timeDiff/1000/60/60/24/365 - Math.floor(timeDiff/1000/60/60/24/365)) * 365) )
  let h = ( Math.floor((timeDiff/1000/60/60/24 - Math.floor(timeDiff/1000/60/60/24)) * 24) )
  let m = ( Math.floor((timeDiff/1000/60/60 - Math.floor(timeDiff/1000/60/60)) * 60) )
  let s = ( Math.floor((timeDiff/1000/60 - Math.floor(timeDiff/1000/60)) * 60) )
  let travelTime = `${d}:${h}:${m}:${s}`
  let lastCoords = [sites[sites.length-1].x_coordinate, sites[sites.length-1].y_coordinate]
  if (nextCoords[0] == lastCoords[0] && nextCoords[1] == lastCoords[1]) {
    console.log("Finished")
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
             })
             .then(() => history.push(`/users/${userId}`))
    }
  } else {
    console.log("Unfinished")
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
