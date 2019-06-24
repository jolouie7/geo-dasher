const reAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('jwt')) {
      console.log(process.env);
      debugger
      return fetch(process.env.REACT_APP_API_URL + '/api/v1/reAuth', {
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
    } else {
      return null
    }
  }
}
export default reAuth
