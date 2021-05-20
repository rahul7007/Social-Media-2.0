import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css';

import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/Layout/Alert'
import Dashboard from './components/Dashboard/Dashboard'
import CreateProfile from './components/Profile-Forms/CreateProfile'
import PrivateRoute from './components/routing/PrivateRoute'
import { loadUser } from './action/AuthAction'
import setAuthToken from './utils/setAuthToken'

// we need to check to see if there's a token and if so,we'll put in global header, 
if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"))

}

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
        </section>
      </>
    </Router>
  );
}

export default App;
