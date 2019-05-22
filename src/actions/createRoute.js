import L from 'leaflet'

const createRoute = (routeInfo, username, distance, history) => {
  return (dispatch) => {
    dispatch({ type: "START_CREATING_ROUTE"});
    return fetch(`http://localhost:3005/api/v1/routes`, {
             method: "POST",
             headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
               "Accept": 'application/json'
             },
             body: JSON.stringify({
               route: {
                 name: routeInfo.name,
                 description: routeInfo.description,
                 creator: username,
                 alt_transportation: routeInfo.altTransportation,
                 distance: distance
               }
             })
           })
           .then(res => res.json())
           .then(route => {
             console.log(route)
             console.log(routeInfo.checkpoints)
             let coordList = routeInfo.checkpoints.map(checkpoint => {
               return [checkpoint.lat, checkpoint.lng]
             })
             coordList.forEach(coord => {
               fetch(`http://localhost:3005/api/v1/sites`, {
                 method: "POST",
                 headers: {
                   "Content-Type": 'application/json',
                   "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                 },
                 body: JSON.stringify({
                   site: {
                     route_id: route.id,
                     x_coordinate: coord[0],
                     y_coordinate: coord[1]
                   }
                 })
               })
             })
           })
           .catch(error => console.log(error))
           .then(() => history.push('/routes'))

  }
}

export default createRoute

// #<Route id: 1, name: "Access Labs Dash",
// distance: 1.0, description: "A fun dash for all students!",
// times_completed: 0, alt_transportation: "Transit", creator: "guy_hartgood",
// created_at: "2019-05-21 16:48:36", updated_at: "2019-05-21 16:48:36">

// const createGame = (routeId, userId, history) => {
//   return (dispatch) => {
//     dispatch({ type: "START_CREATING_GAME" });
//     return fetch(`http://localhost:3005/api/v1/games`, {
//       method: "POST",
//       headers: {
//         "Content-Type": 'application/json',
//         "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
//         "Accept": 'application/json'
//       },
//       body: JSON.stringify({
//         game: {
//           route_id: routeId,
//           user_id: userId
//         }
//       })
//     })
//     .then(res => res.json())
//     .then(newGame => {
//       dispatch({ type: "CREATE_GAME", game: newGame  })
//     })
//     .then(() => history.push(`/users/${userId}/active-dash`) )
//   }
// }
