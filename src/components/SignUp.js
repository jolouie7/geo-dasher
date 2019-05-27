import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import signUp from '../actions/signUp'

class SignUp extends React.Component {

  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  }

  fakeChange = () => {
    // this is only here to get rid of an error in the console
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <p>Sign Up</p>
        <form onSubmit={(e) => { this.props.signUp(e, this.state, this.props.history) }}>
          <label htmlFor="email">Email: </label>
          <input onChange={this.handleChange}
            name="email"
            type="email"
            value={this.state.email}
            autoComplete="off"/>
          <br/><br/>
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
          <label htmlFor="password_confirmation">Confirm Password: </label>
          <input onChange={this.handleChange}
            name="password_confirmation"
            type="password"
            value={this.state.password_confirmation}
            autoComplete="off"/>
          <br/><br/>
          <input type="Submit" onChange={this.fakeChange} value="Sign Up"/>
        </form>
        <p id="error-list" style={{color:"red"}}></p>
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (e, signupInfo, history) => { dispatch(signUp(e, signupInfo, history)) }
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
