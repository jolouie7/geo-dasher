const initialState = {
  currentUser: {},
  routes: [],
  userGames: [],
  filteredRoutes: [],
  distanceFilter: null,
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
    case "ADD_ROUTE":
      return {...state,
               currentUser: {...state.currentUser, routes: [...state.currentUser.routes, action.route]},
               routes: [...state.routes, action.route],
               filteredRoutes: [...state.filteredRoutes, action.route]
              }
    case "ADD_ROUTES":
      return {...state,
              routes: action.routes,
              filteredRoutes: action.routes,
              loadedRoutes: true }
    case "CREATE_GAME":
      let thisUser = state.users.find(user => user.id === action.game.user_id)
      let newUsersGames = state.users.map(user => {
        if (user.id === thisUser.id) {
          user = {...user, games: [...user.games, action.game]}
          return user
        } else {
          return user
        }
      })
      return {...state,
              userGames: [...state.userGames, action.game],
              currentUser: {...state.currentUser,
                            games: [...state.currentUser.games, action.game]
                          },
              users: newUsersGames
             }
    case "END_DASH":
      let quittingUser = state.users.find(user => user.id === action.game.user_id)
      let newGamesAfterEnd = state.currentUser.games.map(game => {
        if (game.id === action.game.id) {
          game = {...game, active: false}
        }
        return game
      })
      let allUsers = state.users.map(user => {
        if (user.id === quittingUser.id) {
          user = {...user, games: newGamesAfterEnd}
          return user
        } else {
          return user
        }
      })
      return {...state,
              userGames: newGamesAfterEnd,
              currentUser: {...state.currentUser,
                            games: newGamesAfterEnd
                          },
              users: allUsers
             }
    case "UPDATE_GAME":
      let updatingUser = state.users.find(user => user.id === action.game.user_id)
      let updatedGames = state.currentUser.games.map(game => {
        if (game.active) {
          game = action.game
        }
        return game
      })
      let listUsers = state.users.map(user => {
        if (user.id === updatingUser.id) {
          user = {...user, games: updatedGames}
          return user
        } else {
          return user
        }
      })
      return {...state,
              userGames: updatedGames,
              currentUser: {...state.currentUser,
                             games: updatedGames
                           },
              users: listUsers
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
    case "ADD_USER":
      return {...state, users: [...state.users, action.user]}
    case "SET_USERS":
      return {...state, users: action.users}
    default:
       return state
  }
}


export default rootReducer
