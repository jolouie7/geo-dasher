import { createStore } from 'redux'

const initialState = {
  authenticted: false,
  user_routes: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {...state, authenticated: true}
    case "LOG_OUT":
      return {...state, authenticated: false}
    default:
       return state
  }
}

// eventually the line below will combine reducers
const store = createStore(reducer)
export default store
