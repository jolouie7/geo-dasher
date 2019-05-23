const endDash = (gameId, history, userId) => {
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
               active: false
             })
           })
           .then(res => res.json())
           .then(game => {
             dispatch({ type: "END_DASH", game: game })
           })
           .then(() => history.push(`/users/${userId}`) )
  }
}

export default endDash
