const initialState = {
  routes: [],
  userGames: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_ADDING_ROUTES":
      return state
    case "START_ADDING_GAMES":
      return state
    case "ADD_ROUTES":
      return {...state, routes: action.routes}
    case "ADD_GAMES":
      return {...state, userGames: action.games}
    default:
       return state
  }
}


export default rootReducer
