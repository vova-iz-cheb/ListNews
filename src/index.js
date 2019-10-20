import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'

const todoApp = function (state = {name: 'igor'}, action) {
  return state;
}

const store = createStore(todoApp);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);