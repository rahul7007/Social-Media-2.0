import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/Layout/Alert'


const App = () => {
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
          </Switch>
        </section>
      </>
    </Router>
  );
}

export default App;
