import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div>
      <h1>Please sign in to view this page</h1>
      <Link to="/signin"><button>Sign In</button></Link>
    </div>
  )
}

export default Unauthorized
