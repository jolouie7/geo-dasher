import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class UserProfile extends React.Component {

  logout = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin')
  }

  componentDidMount() {
    let id = this.props.match.params.id
    fetch(`http://localhost:3005/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(parsedJSON => {
      if (parsedJSON.user !== undefined) {
        let user_routes = parsedJSON.user.routes.filter(route => {
          return route.creator === parsedJSON.user.username
        })
      } else {
        this.props.history.push("/wrong-page")
      }
      // dispatch this logic to state in store
    })
  }

  render() {
    return (
      <main>
        <button onClick={this.logout} style={{align:"left"}}>Log Out</button>
        <h1 style={{align:"center"}}>Your Profile</h1>
      </main>
    )
  }

}


export default connect()(UserProfile)


// if (this.props.params) {
//   fetch(`http://localhost:3005/api/v1/users/${this.props.params.id}`, {
//     method: "GET",
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('jwt')}`
//     }
//   })
//   .then(res => res.json())
//   .then(parsedJSON => console.log(parsedJSON))
// }
