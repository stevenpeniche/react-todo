import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import './App.css';
import ToDos from './components/ToDos';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Logout from './components/Logout';
import { app, database } from './base';

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
  )
}


class App extends Component {
	constructor(props) {
		super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
		this.state = {
      authenticated: false,
      loading: true,
      currentUser: null,
		};
	}

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }

    return (
      <div style={{maxWidth: "1160px", margin: "0 auto"}}>
        <BrowserRouter>
          <div className="App">
            <NavBar authenticated={this.state.authenticated}/>
            <section className="section">
              <div className="container">
                <p className="subtitle is-3 has-text-centered"> What would you like to</p>
                <p className="title is-1 has-text-centered">Doo <span role="img" aria-label="poop emoji">💩</span> Doo?</p>
              </div>
            </section>
            <Route exact path="/login" render={(props) => {
              return <Login setCurrentUser={this.setCurrentUser} {...props} />
            }} />
            <Route exact path="/logout" component={Logout}/>
            <AuthenticatedRoute
              exact
              path="/"
              authenticated={this.state.authenticated}
              loading={this.state.loading}
              currentUser={this.state.currentUser}
              database={database}
              component={ToDos}
            />
  			  </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
