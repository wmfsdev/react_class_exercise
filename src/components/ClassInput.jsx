import React, { Component } from "react";
import { Counter } from "./Counter";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      edit: null,
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this)
    this.handleReSubmit = this.handleReSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleReSubmit(editedTodo) {
    this.setState((state) => ({
      todos: state.todos.map((item, index) => { 
        if (editedTodo === index) {
          return this.state.inputVal
        } else return item
      })
    }))
    this.setState(() => ({
      edit: null
    }))
    console.log(this.state)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  handleDelete(todo) {
    this.setState((state) => ({
      todos: state.todos.filter(item => item !== todo)
    }));
  }

  handleEdit(index) {
    this.setState(() => ({
      edit: index
    }))
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={ this.state.edit === null ? this.state.inputVal : "" }
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <>
            { this.state.edit === index
              ? <input name="edit" onChange={this.handleInputChange}/>
              : <li key={todo}>{todo}</li> }
            { this.state.edit === index 
              ? <button key={`resubmit-${index}`} type="button" name={"resubmit"} onClick={ () => this.handleReSubmit(index)}>re-submit</button>
              : <button key={`delete-${index}`} name={"delete"} onClick={ () => this.handleDelete(todo)}>delete</button>
            }
            <button key={`edit-${index}`} onClick={ () => this.handleEdit(index)}>edit</button>
            </>
          ))}
        </ul>
        <Counter count={this.state.todos} />
      </section>
    );
  }
}

export default ClassInput;