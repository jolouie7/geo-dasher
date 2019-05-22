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
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.user}
    case "ADD_ROUTES":
      return {...state, routes: action.routes, filteredRoutes: action.routes}
    case "ADD_GAMES":
      return {...state, userGames: action.games}
    case "CREATE_GAME":
      return {...state,
              userGames: [...state.userGames, action.game],
              currentUser: {...state.currentUser,
                            games: [...state.currentUser.games, action.game]
                           }
             }
    case "END_DASH":
      let newGames = state.currentUser.games.map(game => {
                          if (game.id === action.game.id) {
                            game.active = false
                          }
                        })
      return {...state,
              userGames: [...state.userGames, newGames],
              currentUser: {...state.currentUser,
                             games: [...state.currentUser.games, action.game]
                           }
             }
    case "UPDATE_GAME":
      let updatedGames = state.currentUser.games.map(game => {
        if (game.active) {
          return action.game
        }
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
