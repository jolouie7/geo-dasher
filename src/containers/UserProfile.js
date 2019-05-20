import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import DashCard from '../components/DashCard'
import fetchRoutes from '../actions/fetchRoutes'
import fetchGames from '../actions/fetchGames'

// let activeDashTag = document.querySelector('#active-dash')
// let pastDashes = document.querySelector('#past-dashes')
// let createdDashes = document.querySelector('#created-dashes')

class UserProfile extends React.Component {

  signOut = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin')
  }

  renderActiveDash = () => {
    const activeDashTag = document.querySelector('#active-dash')
    let activeDash = this.props.userGames.find(game => game.active === true)
    if (activeDash === undefined) {
      activeDashTag.innerHTML = `<p> You are not currently dashing! </p>`
    } else {
      activeDashTag.innerHTML = <DashCard />
    }
  }

  componentDidMount() {
    let user_id = this.props.match.params.id
    this.props.dispatch(fetchGames(user_id))
    this.props.dispatch(fetchRoutes())
  }

  componentDidUpdate() {
    this.renderActiveDash()
  }

  render() {

    return (
      <main>
        <button onClick={this.signOut} style={{align:"left"}}>Sign Out</button>
        <h1 style={{align:"center"}}>Your Profile</h1>

        <hr/><h3>Active Dash</h3><hr/>
        <ul id="active-dash"></ul>
        <br/>

        <hr/><h3>Past Dashes</h3><hr/>
        <ul id="past-dashes"></ul>
        <br/>

        <hr/><h3>Created Dashes</h3><hr/>
        <ul id="created-dashes"></ul>
        <br/>

      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGames: state.user_games,
    routes: state.routes
  }
}

export default connect(mapStateToProps)(UserProfile)


// 1. fetch all routes from http://localhost:3005/api/v1/routes & all
// games from http://localhost:3005/api/v1/games once the component is loaded
// DONE!

// 2. when user signs in filter through all routes stored in state &
// display the ones that this user created under section 'Created Dashes'

// 3. filter through all the games that belong to this user and store the
// one with an active attribute under the section 'Active Dash'

// 4. filter through all the games that belong to this user and store all
// that are not active under 'Past Dashes'
