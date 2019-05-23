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
    case "START_ADDING_ROUTES":
      return state
    case "START_ADDING_GAMES":
      return state
    case "START_CREATING_GAME":
      return state
    case "START_ENDING_DASH":
      return state
    case "BEGIN_UPDATING_GAME":
      return state
    case "BEGIN_SIGN_IN":
      return state
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.user}
    case "ADD_ROUTES":
      return {...state, routes: action.routes, filteredRoutes: action.routes}
    case "ADD_GAMES":
      return {...state, userGames: action.games}
    case "CREATE_GAME":
      let newGamesAfterCreate = state.currentUser.games.map(game => {
        if (game.id === action.game.id) {
          game = action.game
        }
        return game
      })
      return {...state,
              userGames: newGamesAfterCreate,
              currentUser: {...state.currentUser,
                            games: newGamesAfterCreate
                           }
             }
    case "END_DASH":
      let newGamesAfterEnd = state.currentUser.games.map(game => {
        if (game.id === action.game.id) {
          game = {...game, active: false}
        }
        return game
      })
      return {...state,
              userGames: newGamesAfterEnd,
              currentUser: {...state.currentUser,
                            games: newGamesAfterEnd
                           }
             }
    case "UPDATE_GAME":
      let updatedGames = state.currentUser.games.map(game => {
        if (game.active) {
          game = action.game
        }
        return game
      })
      return {...state,
              userGames: updatedGames,
              currentUser: {...state.currentUser,
                             games: updatedGames
                           }
             }
    case "SET_DISTANCE_FILTER":
      return {...state,
               distanceFilter: action.distance,
               filteredRoutes: state.routes.filter(route => route.distance <= action.distance)
             }
    default:
       return state
  }
}


export default rootReducer
