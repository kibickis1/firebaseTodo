import React, { useState, useEffect, useCallback } from "react";
import "./SubmissionForm.css";
import { projectFirestore, Timestamp } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";

function SubmissionForm() {
  const navigate = useNavigate();

  const [todoTitle, setTodoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [subForm, openSubForm] = useState(false);
  const [titleLength, setTitleLength] = useState(0);

  const [isFormValid, setIsFormValid] = useState(false);
  const [submitButton, setSubmitButton] = useState("Fill out form");
  console.log(isFormValid);

  const captureTodoTitle = (e) => {
    setTodoTitle(e.target.value);
    setTitleLength(e.target.value.length);
  };

  const captureTodoText = (e) => {
    setDescription(e.target.value);
  };

  const captureTodoDate = (e) => {
    setTodoDate(e.target.value);
  };

  const captureUserTodoInfo = async (e) => {
    e.preventDefault();

    // Convert the date string to a JavaScript Date object
    const dateObject = new Date(todoDate); //CODE ADDED VIA CHAT GPT

    // Create a Firestore Timestamp from the Date object
    const timestamp = firebase.firestore.Timestamp.fromDate(dateObject); //CODE ADDED VIA CAHT GPT

    const documentToFirestore = {
      title: todoTitle,
      description: description,
      date: timestamp,
    };

    console.log(documentToFirestore);

    try {
      await projectFirestore.collection("todos").add(documentToFirestore);
      console.log(projectFirestore);
    } catch (err) {
      console.log(err);
    }

    setTodoTitle("");
    setDescription("");
    setTodoDate("");
    navigate("/");
  };

  const checkForm = () => {
    if (todoTitle !== "" && todoDate !== "") {
      setIsFormValid(true);
      setSubmitButton("Submit");
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    checkForm();
  }, [todoTitle, description, todoDate]);

  return (
    <div className="submission-form-container">
      <div className="sub-form-full">
        <div className="sub-form">
          <form onSubmit={captureUserTodoInfo}>
            {titleLength == 45 ? (
              <label>
                Todo Name - <span>Character limit reached!</span>
              </label>
            ) : (
              <label>Todo Name</label>
            )}
            <input
              placeholder="The name of the todo...."
              value={todoTitle}
              maxLength={45}
              onChange={(e) => captureTodoTitle(e)}
            ></input>
            <label>Date</label>
            <input
              type="datetime-local"
              value={todoDate}
              onChange={(e) => captureTodoDate(e)}
            ></input>
            <label>Description (optional)</label>
            <input
              value={description}
              onChange={(e) => captureTodoText(e)}
            ></input>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button disabled={!isFormValid} className="submit-todo">
                {submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubmissionForm;
