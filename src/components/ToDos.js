import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import ToDo from './ToDo';

class ToDos extends Component {
  constructor(props) {
    super(props);
    this.todosRef = this.props.database.ref('todos')
    this.state = {
      todos: [],
      newTodoDescription: ''
    };
  }

  handleChange(e) {
		this.setState({ newTodoDescription: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.newTodoDescription) { return }
		const newTodo = { user_id: String(this.props.currentUser.uid), description: this.state.newTodoDescription, isCompleted: false };
    this.props.database.ref('todos').push(newTodo);
    this.setState({ newTodoDescription: '' });
	}

	toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    console.log(todos);
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

	deleteTodo(todo) {
		this.props.database.ref('todos').child(todo.key).remove();
	}

  componentDidMount() {
    this.todosRef.on('child_added', snapshot => {
      let todo = snapshot.val();
      if(todo.user_id === this.props.currentUser.uid) {
        todo.key = snapshot.key;
        this.setState({ todos: [...this.state.todos, todo]});
      }
    });
    this.todosRef.on('child_removed', snapshot => {
      const key = snapshot.key;
      const filtered = this.state.todos.filter(todo => todo.key !== key);
      this.setState({ todos: filtered });
    });
  }

  render() {
    if (this.props.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }

    return (
      <section className="section">
        <div className="container is-fluid">
          <ul className="todos container">
            {this.state.todos.filter(todo =>
              todo.user_id === String(this.props.currentUser.uid)
            ).map((todo, index) => {
              return (
                <ToDo
                  key={ index }
                  description={ todo.description }
                  isCompleted={ todo.isCompleted }
                  toggleComplete={ () => this.toggleComplete(index) }
                  deleteTodo={ () => this.deleteTodo(todo) }
                />
              )
            })}
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
    );
  }
}

export default ToDos;
