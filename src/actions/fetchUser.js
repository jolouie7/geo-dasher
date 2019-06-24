const fetchUser = (userId) => {
  return (dispatch) => {
    dispatch({ type: "START_SETTING_CURRENT_USER" });
    return fetch(process.env.REACT_APP_API_URL + `/api/v1/users/${userId}`, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`
             }
           })
           .then(res => res.json())
           .then(userObj => {
               let user = userObj.user
               dispatch({ type: "SET_CURRENT_USER", user: user })
           })
           .catch(parsedJSON => null)
  }
}

export default fetchUser
