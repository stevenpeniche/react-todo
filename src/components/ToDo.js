import React, { Component } from 'react';

class ToDo extends Component {
	strikeIfComplete(isCompleted) {
		if(isCompleted) {
			return <font style={{"color": "#808080"}}><strike>{ this.props.description }</strike></font>
		}
		return this.props.description
	}

	render() {
		return (
			<li className="todo box" onClick={ this.props.toggleComplete }>
        <div className="delete-button-container">
          <button type='button' onClick={ this.props.deleteTodo } className="delete-button delete" />
        </div>
				<p className="todo-description">
          { this.strikeIfComplete(this.props.isCompleted) }
        </p>
			</li>
		)
	}
}

export default ToDo;
