const fetchGames = (userId) => {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_GAMES" });
    return fetch(`http://localhost:3005/api/v1/users/${userId}`, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`
             }
           })
           .then(res => res.json())
           .then(userObj => {
               let games = userObj.user.games
               let user = userObj.user
               dispatch({ type: "SET_CURRENT_USER", user: user })
               dispatch({ type: "ADD_GAMES", games: games })
           })
           .catch(parsedJSON => null)
  }
}

export default fetchGames
