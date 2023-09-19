import { useEffect, useState } from "react";
import "./App.css";
import { projectFirestore } from "./firebase/config";
import SubmissionForm from "./components/SubmissionForm";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />}></Route>
        <Route path="/submission" element={<SubmissionForm />}></Route>
        <Route path="/todo/:id" element={<Todo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
