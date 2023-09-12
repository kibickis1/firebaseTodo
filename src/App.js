import { useEffect, useState } from "react";
import "./App.css";
import { projectFirestore } from "./firebase/config";
import SubmissionForm from "./components/SubmissionForm";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ul>
        <Link to="/">Home page</Link> <br></br>
        <Link to="/submission">Submit</Link>
      </ul>
      {/* <TodoList /> */}
      <Routes>
        <Route path="/" element={<TodoList />}></Route>
        <Route path="/submission" element={<SubmissionForm />}></Route>
        <Route path="/todo/:id" element={<Todo />}></Route>
      </Routes>
      {/* <SubmissionForm /> */}

      {/* <Todo /> */}
    </div>
  );
}

export default App;
