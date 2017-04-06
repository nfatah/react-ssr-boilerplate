/* global localStorage */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../Redux/Store'
import { setUser, logoutUser } from '../Redux/modules/user'
import Routes from './Router/Routes'
import Layout from './Layout'
import setTokenToHeaders from '../auth/setTokenToHeaders'
import jwt from 'jsonwebtoken'

const App = (props) => {
  if (localStorage.token) {
    setTokenToHeaders(localStorage.token)
    const decodedToken = jwt.decode(localStorage.token)
    console.log('ClientApp: decodedToken', decodedToken)
    store.dispatch(setUser(decodedToken))
  } else {
    store.dispatch(logoutUser())
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes isAuthenticated={store.getState().user.isAuthenticated} />
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
