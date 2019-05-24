const reAuth = () => {
  return (dispatch) => {
    dispatch({ type: "START_REAUTH" })
  }
}

export default reAuth
