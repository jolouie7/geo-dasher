const signIn = (e, login_info, history) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch({ type: "BEGIN_SIGN_IN" })
    return fetch(process.env.REACT_APP_API_URL + '/api/v1/signin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: login_info.username,
          password: login_info.password
        }
      })
    })
    .then(res => res.json())
    .catch(() => null)
    .then(resObj => {
      if (resObj['message']) {
        document.querySelector('#error-list').innerHTML = resObj['message']
      } else {
        dispatch({ type: "SET_CURRENT_USER", user: resObj.user })
        localStorage.setItem('jwt', resObj['jwt'])
        return resObj.user.id
      }
    })
    .then((id) => typeof id === "number" ? history.push(`/users/${id}`) : null )
  }
}

export default signIn
