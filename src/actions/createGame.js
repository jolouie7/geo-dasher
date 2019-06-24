const createGame = (routeId, userId, history) => {
  return (dispatch) => {
    dispatch({ type: "START_CREATING_GAME" });
    return fetch(process.env.API_URL + `/api/v1/games`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        game: {
          route_id: routeId,
          user_id: userId
        }
      })
    })
    .then(res => res.json())
    .then(newGame => {
      dispatch({ type: "CREATE_GAME", game: newGame  })
    })
    .then(() => history.push(`/users/${userId}/active-dash`) )
  }
}

export default createGame
