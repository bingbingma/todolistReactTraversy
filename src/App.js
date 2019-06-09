import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import ReactDOM from "react-dom";
import "./styles.css";
import Todos from "./components/Todos";
import Header from "./components/layout/header";
import AddTodos from "./components/AddTodos";
import About from "./components/pages/About";
// import uuid from "uuid";
import axios from "axios";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => this.setState({ todos: res.data }));
    // .then(res => console.log(res.data));
  }

  // OLD STATIC TODOS BEFORE WE ARE TRYING AXIOS TO https://jsonplaceholder.typicode.com/todos
  // state = {
  //   todos: [
  //     {
  //       id: uuid.v4(),
  //       title: "Take out the trash",
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: "Dinner with wife",
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: "Meeting with boss",
  //       completed: false
  //     }
  //   ]
  // };

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
    axios.delete(`https://jsonplaceholder.typicode.com/todos:${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  //Add Todo
  addTodo = title => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));

    //OLD STATIC
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // };
  };

  render() {
    // console.log(this.state.todos);

    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodos addTodo={this.addTodo} />
                  {/* <h1>Hello World</h1> */}
                  <Todos
                    todos={this.state.todos}
                    toggleComplete={this.toggleComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
