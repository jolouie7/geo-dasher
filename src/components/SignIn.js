import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import signIn from '../actions/signIn'

class SignIn extends React.Component {

  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  fakeChange = () => {
    // this is only here to get rid of an error in the console
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => { this.props.signIn(e, this.state, this.props.history) }}>
          <label htmlFor="username">Username: </label>
          <input onChange={this.handleChange}
            name="username"
            type="text"
            value={this.state.username}
            autoComplete="off"/>
          <br/><br/>
          <label htmlFor="password">Password: </label>
          <input onChange={this.handleChange}
            name="password"
            type="password"
            value={this.state.password}
            autoComplete="off"/>
          <br/><br/>
          <input type="Submit" onChange={this.fakeChange} value="Sign In"/>
        </form>
        <p id="error-list" style={{color:"red"}}></p>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <h4>
          Signing in as a guest? Use these credentials:
        </h4>
        <p>
          Username: guy_hartgood - password: =_WNj+e-y7D5-v!G
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (e, login_info, history) => { dispatch(signIn(e, login_info, history)) }
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
