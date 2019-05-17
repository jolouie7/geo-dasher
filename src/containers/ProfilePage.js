import React from 'react'

class ProfilePage extends React.Component {

  logout = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin')
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

export default ProfilePage
