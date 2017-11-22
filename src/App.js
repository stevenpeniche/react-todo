import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js'


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{ description: 'Walk the cat', isCompleted: true },
				{ description: 'Throw the dishes away', isCompleted: false },
				{ description: 'Buy new dishes', isCompleted: false }
			],
			newTodoDescription: ''
		};
	}

	handleChange(e) {
		this.setState({ newTodoDescription: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.newTodoDescription) { return }
		const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
	}

	toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

	deleteTodo(index) {
		const todos = this.state.todos.filter( (todo) => todo !== this.state.todos[index])
		this.setState({ todos: todos })
	}

  render() {
    return (
      <div className="App">
				<section className="section">
					<div className="container">
						<p className="subtitle is-3 has-text-centered"> What would you like to</p>
						<p className="title is-1 has-text-centered">Doo <span role="img" aria-label="poop emoji">💩</span> Doo?</p>
					</div>
				</section>
				<section className="section">
					<div className="container is-fluid">
						<ul className="todos container">
							{ this.state.todos.map( (todo, index) =>
								<ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) } deleteTodo={ () => this.deleteTodo(index) }/>
							)}
						</ul>
						<div className="submit-todo-form columns is-mobile is-centered">
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
						</div>
					</div>
				</section>
			</div>
    );
  }
}

export default App;
