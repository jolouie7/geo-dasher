const fetchGames = (user_id) => {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_GAMES" });
    return fetch(`http://localhost:3005/api/v1/users/${user_id}`, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`
             }
           })
           .then(res => res.json())
           .then(userObj => {
             console.log(userObj)
             let games = userObj["user"]["games"]
             dispatch({ type: "ADD_GAMES", games: games })
           })
  }
}

export default fetchGames
