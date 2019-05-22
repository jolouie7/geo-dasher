const updateGame = (gameId, history, nextCP) => {
  console.log(gameId)
  console.log(history)
  console.log(nextCP)
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
               current_checkpoint: nextCP
             })
           })
           .then(res => res.json())
           .then(game => {
             console.log(game)
             dispatch({ type: "UPDATE_GAME" ,
                        game: game })
           })
  }
}

export default updateGame
