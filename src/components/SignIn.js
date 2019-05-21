import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e, login_info) => {
    e.preventDefault();
    fetch('http://localhost:3005/api/v1/signin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: login_info.username,
          password: login_info.password
        }
      })
    })
    .then(res => res.json())
    .then(resObj => {
      if (resObj['message']) {
        document.querySelector('#error-list').innerHTML = resObj['message']
      } else {
        console.log(resObj)
        this.props.history.push(`/users/${resObj.user.id}`)
        localStorage.setItem('jwt', resObj['jwt'])
      }
    })
  }

  render() {
    return (
      <div>
        <p>Sign In</p>
        <form onSubmit={(e) => { this.handleSubmit(e, this.state) }}>
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
      </div>
    )
  }

}



export default connect()(SignIn)
