const initialState = {
  currentUser: {},
  routes: [],
  userGames: [],
  filteredRoutes: [],
  distanceFilter: null,
  proximityFilter: null,
  loadedRoutes: false,
  users: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "START_REAUTH":
      return state
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.user}
    case "CLEAR_CURRENT_USER":
      return {...state, currentUser: {} }
    case "ADD_ROUTES":
      return {...state,
              routes: action.routes,
              filteredRoutes: action.routes,
              loadedRoutes: true }
    case "CREATE_GAME":
      return {...state,
              userGames: [...state.userGames, action.game],
              currentUser: {...state.currentUser,
                            games: [...state.currentUser.games, action.game]
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
    case "UPDATE_ROUTE":
      let newRoutes = state.routes.map(route => {
        if (route.id === action.route.id) {
          route = action.route
        }
        return route
      })
      return {...state, routes: newRoutes}
    case "SET_DISTANCE_FILTER":
      return {...state,
               distanceFilter: action.distance,
               filteredRoutes: state.routes.filter(route => route.distance <= action.distance)
             }
    case "SET_USERS":
      return {...state, users: action.users}
    default:
       return state
  }
}


export default rootReducer
