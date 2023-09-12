import React, { useState, useEffect, useCallback } from "react";
import "./SubmissionForm.css";
import { projectFirestore } from "../firebase/config";

function SubmissionForm(props) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [subForm, openSubForm] = useState(false);
  const [todoInput, setTodoInput] = useState({
    title: "",
    todoText: "",
    date: "",
  });

  const captureTodoTitle = (e) => {
    setTodoTitle(e.target.value);
  };

  const captureTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const captureTodoDate = (e) => {
    setTodoDate(e.target.value);
  };

  const captureUserTodoInfo = async (e) => {
    e.preventDefault();

    const documentToFirestore = {
      title: todoTitle,
      todoText: todoText,
      date: todoDate,
    };
    console.log(documentToFirestore);

    try {
      await projectFirestore.collection("todos").add(documentToFirestore);
      console.log(projectFirestore);
    } catch (err) {
      console.log(err);
    }

    setTodoTitle("");
    setTodoText("");
    setTodoDate("");
  };

  // useEffect(() => {
  //   captureUserTodoInfo();
  // }, []);

  return (
    <div className="submission-form-container">
      <div className="sub-form-full">
        <div className="sub-form">
          <form onSubmit={captureUserTodoInfo}>
            <label>Todo</label>
            <input
              value={todoTitle}
              onChange={(e) => captureTodoTitle(e)}
            ></input>
            <label>Description</label>
            <input
              value={todoText}
              onChange={(e) => captureTodoText(e)}
            ></input>
            <label>Date</label>
            <input
              type="date"
              value={todoDate}
              onChange={(e) => captureTodoDate(e)}
            ></input>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubmissionForm;
