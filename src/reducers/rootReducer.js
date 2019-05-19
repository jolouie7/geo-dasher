import { createStore } from 'redux'

const initialState = {
  routes: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
       return state
  }
}

// eventually the line below will combine reducers
const store = createStore(reducer)
export default store
