import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "./styles.css";
import Todos from "./components/Todos";
import Header from "./components/layout/header";
import AddTodos from "./components/AddTodos";
import uuid from "uuid";

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: "Take out the trash",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Dinner with wife",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Meeting with boss",
        completed: false
      }
    ]
  };

  // Toggle Todo Completed
  toggleComplete = id => {
    // console.log(id);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //delete Todo
  delTodo = id => {
    // console.log(id);
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  //Add Todo
  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    // console.log(this.state.todos);

    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddTodos addTodo={this.addTodo} />
          {/* <h1>Hello World</h1> */}
          <Todos
            todos={this.state.todos}
            toggleComplete={this.toggleComplete}
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
