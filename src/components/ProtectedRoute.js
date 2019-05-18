import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class ProtectedRoute extends React.Component {

  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route
        {...props}
        render={props => (
          localStorage.getItem('jwt') !== null ?
            <Component {...props} /> :
            <Redirect to='/signin' />
        )}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
