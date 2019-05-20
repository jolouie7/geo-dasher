const initialState = {
  currentUser: {},
  routes: [],
  userGames: [],
  filteredRoutes: [],
  distanceFilter: null,
  proximityFilter: null

}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.user}
    case "START_ADDING_ROUTES":
      return state
    case "START_ADDING_GAMES":
      return state
    case "ADD_ROUTES":
      return {...state, routes: action.routes, filteredRoutes: action.routes}
    case "ADD_GAMES":
      return {...state, userGames: action.games}
    case "SET_DISTANCE_FILTER":
      console.log(state.routes[0].distance)
      return {...state,
               distanceFilter: action.distance,
               filteredRoutes: state.routes.filter(route => route.distance <= action.distance)
             }
    default:
       return state
  }
}


export default rootReducer
