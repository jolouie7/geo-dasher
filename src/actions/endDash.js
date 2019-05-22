const endDash = (gameId, history, userId) => {
  console.log(history)
  console.log(gameId)
  console.log(userId)
  return (dispatch) => {
    dispatch({ type: "START_ENDING_DASH" });
    return fetch(`http://localhost:3005/api/v1/games/${gameId}`, {
             method: "PATCH",
             headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
               "Accept": 'application/json'
             },
             body: JSON.stringify({
               game: {
                 active: false
               }
             })
           })
           .then(res => res.json() )
           .then(parsedJSON => console.log(parsedJSON) )
  }
}

export default endDash

// .then(game => {
//   console.log(game)
//   dispatch({ type: "END_DASH", game: game })
// })
// .catch(error => console.log(error))


// fetch(`http://localhost:3005/api/v1/games/${gameId}`,{
//          method: "PATCH",
//          headers: {
//            "Content-Type": 'application/json',
//            "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
//            "Accept": 'application/json'
//          },
//          body: JSON.stringify({
//            game: {
//              active: false
//            }
//          })
//        })
//        .then(res => res.json())
//        .then(game => {
//          dispatch({ type: "END_DASH", game: game })
//          console.log(history)
//          console.log(userId)
//        })
//        .then(() => history.push(`/users/${userId}`))
