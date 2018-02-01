import React, { Component } from 'react';

class ToDo extends Component {
	strikeIfComplete(isCompleted) {
		if(isCompleted) {
			return <strike>{ this.props.description }</strike>
		}
		return this.props.description
	}

	changeButtonIfComplete(isCompleted) {
		if(isCompleted) {
      return <strong>Completed</strong>
		} else {
      return <strong>Not Completed</strong>
    }
	}

	render() {
		return (
			<li className="card">
				<header className="card-header">
					<p className="card-header-title">{ this.strikeIfComplete(this.props.isCompleted) }</p>
				</header>
				<footer className="card-footer">
					<a type='button' onClick={ this.props.toggleComplete } className="card-footer-item">
						{ this.changeButtonIfComplete(this.props.isCompleted) }
					</a>
					<a type='button' onClick={ this.props.deleteTodo } className="card-footer-item">
						<font color="red"><strong>Delete</strong></font>
					</a>
				</footer>
			</li>
		)
	}
}

export default ToDo;
