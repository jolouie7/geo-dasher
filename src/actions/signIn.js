const signIn = (e, login_info, history) => {
  e.preventDefault()
  console.log(login_info)
  return (dispatch) => {
    dispatch({ type: "BEGIN_SIGN_IN" })
    return fetch('http://localhost:3005/api/v1/signin', {
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
    .then(resObj => {
      if (resObj['message']) {
        document.querySelector('#error-list').innerHTML = resObj['message']
      } else {
        dispatch({ type: "SET_CURRENT_USER", user: resObj.user })
        localStorage.setItem('jwt', resObj['jwt'])
        history.push(`/users/${resObj.user.id}`)
        return resObj.user.id
      }
    })
    .then((id) => history.push(`/users/${id}`) )
  }
}

export default signIn

// handleSubmit = (e, login_info) => {
//   e.preventDefault();
//   fetch('http://localhost:3005/api/v1/signin', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//       user: {
//         username: login_info.username,
//         password: login_info.password
//       }
//     })
//   })
//   .then(res => res.json())
//   .then(resObj => {
//     if (resObj['message']) {
//       document.querySelector('#error-list').innerHTML = resObj['message']
//     } else {
//       localStorage.setItem('jwt', resObj['jwt'])
//       this.props.history.push(`/users/${resObj.user.id}`)
//     }
//   })
// }
