import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class SignIn extends React.Component {

  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e, login_info) => {
    e.preventDefault();
    console.log(login_info.username)
    console.log(login_info.password)
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
          <input type="Submit" value="Sign In"/>
        </form>
        <p id="error-list" style={{color:"red"}}></p>
      </div>
    )
  }

}

export default SignIn
