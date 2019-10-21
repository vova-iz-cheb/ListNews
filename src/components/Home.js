import React from 'react'
import News from '../containers/News'

export default () => {
  return (
    <div className="container grow1">
      <main className="main">
        <div className="row">
          <div className="col">
            <h1>News:</h1>
            <News />
          </div>
        </div>
      </main>
    </div>
  )
}