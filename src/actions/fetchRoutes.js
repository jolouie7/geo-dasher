const fetchRoutes = () => {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_ROUTES" })
    return fetch(`http://localhost:3005/api/v1/routes`, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`
             }
           })
           .then(res => res.json())
           .then(routes => {
             dispatch({ type: "ADD_ROUTES", routes: routes })
           })
  }
}

export default fetchRoutes
