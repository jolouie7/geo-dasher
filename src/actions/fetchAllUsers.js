const fetchAllUsers = () => {
  return (dispatch) => {
    return fetch('http://localhost:3005/api/v1/users', {
             method: "GET",
             headers: {
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
               "Accept": "application/json"
             }
           })
           .then(res => res.json())
           .then(users => {
             dispatch({ type: "SET_USERS", users: users})
           })
  }
}

export default fetchAllUsers
