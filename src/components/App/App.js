import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
//import AddItem from '../AddItem/AddItem';

import './App.css';

class App extends Component {
  componentDidMount () {
    console.log('HERE I AM ',this.props.reduxState);
    this.props.dispatch({type: 'FETCH_USER'});
    this.props.dispatch({type: 'FETCH_ITEMS' }); 
    
  }

  
  render() {
    return (
     
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component = {InfoPage}
              // render={(props) => <InfoPage setItem = {this.props.reduxState.setItem} dispatch ={this.props.dispatch} /> }
              // component={InfoPage}
            />

            {/* <ProtectedRoute
              exact
              path="/addItem"
              component={AddItem}
            /> */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
            
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}
const putStateOnProps = (reduxState) => ({reduxState})
export default connect(putStateOnProps)(App);

{/* <Route path="/details" render={(props) => <Details {...props} dispatch={this.props.dispatch} />} /> */}


// const PrivateRoute = ({ component: Component, handleLogout, isAuthenticated, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated === true
//       ? <Component {...props} handleLogout={handleLogout} />
//       : <Redirect to="/Login" />
//   )} />
// );

