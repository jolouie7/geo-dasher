const reAuth = () => {
  return (dispatch) => {
    dispatch({ type: "START_REAUTH" })
    return fetch('http://localhost:3005/api/v1/reAuth', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resObj => {
      dispatch({ type: "SET_CURRENT_USER", user: resObj.user })
    })
  }
}

export default reAuth
