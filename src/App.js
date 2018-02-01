import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import './App.css';
import ToDo from './components/ToDo';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Logout from './components/Logout';
import { app, database } from './base';

class App extends Component {
	constructor(props) {
		super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.todosRef = database.ref('todos')
		this.state = {
      authenticated: false,
      currentUser: null,
			todos: [],
			newTodoDescription: ''
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

  componentDidMount() {
    this.todosRef.on('child_added', snapshot => {
			let todo = snapshot.val();
      todo.key = snapshot.key;
			this.setState({ todos: [...this.state.todos, todo]});
		});
    this.todosRef.on('child_removed', snapshot => {
      const key = snapshot.key;
      const filtered = this.state.todos.filter(todo => todo.key !== key);
      this.setState({ todos: filtered });
    });
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

	handleChange(e) {
		this.setState({ newTodoDescription: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.newTodoDescription) { return }
		const newTodo = { user_id: String(this.state.currentUser.uid), description: this.state.newTodoDescription, isCompleted: false };
    database.ref('todos').push(newTodo);
    this.setState({ newTodoDescription: '' });
	}

	toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

	deleteTodo(todo) {
		database.ref('todos').child(todo.key).remove();
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
      <BrowserRouter>
        <div className="App">
          <Route exact path="/logout" component={Logout}/>
          <NavBar authenticated={this.state.authenticated}/>
  				<section className="section">
  					<div className="container">
  						<p className="subtitle is-3 has-text-centered"> What would you like to</p>
  						<p className="title is-1 has-text-centered">Doo <span role="img" aria-label="poop emoji">💩</span> Doo?</p>
  					</div>
  				</section>
          { this.state.authenticated
            ?
            <Route exact path="/" render={() => (
              <section className="section">
                <div className="container is-fluid">
                  <ul className="todos container">
                    { this.state.todos.map( (todo, index) => {
                        if (todo.user_id === String(this.state.currentUser.uid)) {
                            return (
                              <ToDo
                                key={ index }
                                description={ todo.description }
                                isCompleted={ todo.isCompleted }
                                toggleComplete={ () => this.toggleComplete(index) }
                                deleteTodo={ () => this.deleteTodo(todo) }
                              />
                            )
                        }
                      }
                    )}
                  </ul>
                  <form className="submit-todo-form columns is-mobile is-centered">
                    <input type="text"
                      value={ this.state.newTodoDescription }
                      onChange={ (e) => this.handleChange(e) }
                      placeholder="Enter a doo.."
                      className="column is-two-thirds input is-success"
                    />
                    <input type="submit"
                      value="Save" onClick={ (e) => this.handleSubmit(e) }
                      className="coulmn button is-success"
                    />
                  </form>
                </div>
              </section>
            )}/>
            :
            <Login setCurrentUser={this.setCurrentUser} />
          }
			  </div>
      </BrowserRouter>
    );
  }
}

export default App;
