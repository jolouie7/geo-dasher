import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends React.Component {

  goToCreateRoute = () => {
    this.props.history.push("/routes/new")
  }

  goToSelectRoute = () => {
    this.props.history.push("/routes")
  }

  goToUserProfile = () => {
    this.props.history.push(`/users/${this.props.currentUser.id}`)
  }

  signOut = () => {
    localStorage.removeItem('jwt')
    this.props.clearCurrentUser()
    this.props.history.push('/signin')
  }

  render() {
    console.log(`Nav Props:`, this.props)
    return (
      <nav id="nav">

        <img src="/images/add.png" alt="add-route" onClick={this.goToCreateRoute}/>


        <img src="/images/list.png" alt="select-route" onClick={this.goToSelectRoute}/>


        <img src="/images/user.png" alt="profile-page" onClick={this.goToUserProfile}/>

        <img src="/images/logout.png" alt="logout" onClick={this.signOut}/>

      </nav>
    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })
  }
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavBar)
)

// { this.props.currentUser ?
//   <NavBar currentUser={this.props.currentUser}/> :
//   ""}

// program told me not to use a link inside of a router
