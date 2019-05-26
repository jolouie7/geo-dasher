const updateRoute = (route) => {
  return (dispatch) => {
    return fetch(`http://localhost:3005/api/v1/routes/${route.id}`, {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`
             },
             body: JSON.stringify({
               times_completed: (route.times_completed + 1)
             })
           })
           .then(res => console.log(res))
           // .then(parsedJSON => {
           //   console.log(parsedJSON)
           //   dispatch({type: "UPDATE_ROUTE", id: id})
           // })
  }
}

export default updateRoute
