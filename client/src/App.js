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
import EditProfile from './components/Profile-Forms/EditProfile'
import AddExperience from './components/Profile-Forms/AddExperience'
import AddEducation from './components/Profile-Forms/AddEducation'
import Profiles from './components/Profiles/Profiles'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/routing/PrivateRoute'
import { loadUser } from './action/AuthAction'
import setAuthToken from './utils/setAuthToken'

// posts
import Posts from './components/Posts/Posts.js'
import Post from './components/post/Post'

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
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <Route exact path="/profiles" component={Profiles} />Profile
            <Route exact path="/profile/:id" component={Profile} />

            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/post/:id" component={Post} />
          </Switch>
        </section>
      </>
    </Router>
  );
}

export default App;
