const signUp = (e, signupInfo, history) => {
  e.preventDefault();
  return (dispatch) => {
    return fetch(process.env.REACT_APP_API_URL + '/api/v1/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: signupInfo.username,
          email: signupInfo.email,
          password: signupInfo.password,
          password_confirmation: signupInfo.password_confirmation
        }
      })
    })
    .then(res => res.json())
    .catch((msg) =>  console.log(msg))
    .then(resObj => {
      if (resObj['error']) {
        const errorList = resObj['error'].split('-')
        errorList.splice(-1, 1)
        const errorsHTML = errorList.join("<br/><br/>")
        document.querySelector('#error-list').innerHTML = errorsHTML
      } else {
        dispatch({ type: "SET_CURRENT_USER", user: resObj.user })
        dispatch({ type: "ADD_USER", user: resObj.user})
        localStorage.setItem('jwt', resObj['jwt'])
        return resObj.user.id
      }
    })
    .then((id) => typeof id === "number" ? history.push(`/users/${id}`) : null )
  }
}


export default signUp
