import React from 'react'
import UserBox from './UserBox'
import Nav from './Nav'

export default () => {
  return (
    <header className="header">
    <div className="container">
      <div className="row align-items-center">
        <Nav />
        <div className="col-auto order-1">
          <UserBox />
        </div>
      </div>
    </div>
  </header>
  )
}