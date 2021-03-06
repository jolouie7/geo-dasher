import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavLink } from 'reactstrap';

class NavBar extends React.Component {

  signOut = () => {
    localStorage.removeItem('jwt')
    this.props.clearCurrentUser()
  }

  render() {
    return (
      <div>
        <Navbar className="nav" color="light" light expand="md">
          <Nav className="ml-auto" navbar>
            <NavLink href={`/users/${this.props.currentUser.id}`}>
              <i className="glyphicon glyphicon-user" list-style-type={"none"}></i>
            </NavLink>
            <NavLink href={'/routes'}>
              <i className="glyphicon glyphicon-list-alt" list-style-type={"none"}></i>
            </NavLink>
            <NavLink href={"/routes/new"}>
              <i className="glyphicon glyphicon-plus" list-style-type={"none"}></i>
            </NavLink>
            <NavLink href={"/signin"}>
              <i className="glyphicon glyphicon-log-out"
                 list-style-type={"none"}
                 onClick={this.signOut}
              ></i>
            </NavLink>
          </Nav>
        </Navbar>
      </div>
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
