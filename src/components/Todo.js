import React, { useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { useState } from "react";
import { projectFirestore, Timestamp } from "../firebase/config";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
import Delete from "../images/Delete.svg";
import Edit from "../images/Edit.svg";

export default function Todo(props) {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteOpen, setdeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { id } = useParams();
  const [editedTodoTitle, setEditedTodoTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTodoDate, setEditedTodoDate] = useState("");
  const [titleLength, setTitleLength] = useState(0);

  useEffect(() => {
    setLoading(true);

    projectFirestore
      .collection("todos")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setLoading(false);
          setData(doc.data());
          console.log(data);
        } else {
          setLoading(false);
          setError("Todo does not exist");
        }
      });
  }, [id]);

  const manageDeleteForm = () => {
    setdeleteOpen(!deleteOpen);
  };

  const manageEditForm = () => {
    setEditOpen(!editOpen);
  };

  // Convert the date string to a JavaScript Date object
  const dateObject = new Date(editedTodoDate); //CODE ADDED VIA CHAT GPT

  // Create a Firestore Timestamp from the Date object
  const timestamp = firebase.firestore.Timestamp.fromDate(dateObject); //CODE ADDED VIA CAHT GPT

  const deleteTodo = (id) => {
    projectFirestore.collection("todos").doc(id).delete(); //LOGIC THAT DELETES TODO!
    navigate("/");
  };

  const updateTodo = (e) => {
    e.preventDefault();

    // Check if any of the fields have new values
    if (editedTodoTitle || editedDescription || editedTodoDate) {
      const updatedData = {};

      // Only include fields with new values
      if (editedTodoTitle) {
        updatedData.title = editedTodoTitle;
      }

      if (editedDescription) {
        updatedData.description = editedDescription;
      }

      if (editedTodoDate) {
        // Convert the date string to a JavaScript Date object
        const dateObject = new Date(editedTodoDate);

        // Create a Firestore Timestamp from the Date object
        const timestamp = firebase.firestore.Timestamp.fromDate(dateObject);

        updatedData.date = timestamp;
      }

      // Update the Firestore document with the new data
      projectFirestore.collection("todos").doc(id).update(updatedData);

      setEditedTodoTitle("");
      setEditedDescription("");
      setEditedTodoDate("");
      manageEditForm();
    } else {
      // No new data entered, do nothing or show an error message
      // You can add your own logic here if needed
    }
  };

  const captureEditedTodoTitle = (e) => {
    setEditedTodoTitle(e.target.value);
    setTitleLength(e.target.value.length);
  };

  const captureEditedTodoText = (e) => {
    setEditedDescription(e.target.value);
  };

  const captureEditedTodoDate = (e) => {
    setEditedTodoDate(e.target.value);
  };

  return (
    <div>
      {data && (
        <div className="todo-container">
          {loading && <p className="loading-container">Loading.....</p>}
          <div className="delete-logic-container">
            {error != "Todo does not exist" && ( //==================BUTTON THAT OPENS DELETE TO DO MODAL==================
              <img
                onClick={manageDeleteForm}
                src={Delete}
                className="delete-button"
              ></img> //==================END BUTTON THAT OPENS DELETE TO DO MODAL==================
            )}
            {error != "Todo does not exist" && (
              <img
                className="edit-button"
                onClick={manageEditForm}
                src={Edit}
              ></img>
            )}

            {deleteOpen && ( //================== START DELETE MODAL ==================
              <div>
                <div
                  className="background-cover-delete-modal"
                  onClick={manageDeleteForm}
                ></div>
                <div className="delete-modal">
                  <h1>Are you sure you want to delete this todo?</h1>
                  <p>
                    This will delete this todo permanently. You cannot undo this
                    action.
                  </p>
                  <button onClick={manageDeleteForm} className="delete-cancel">
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteTodo(id)}
                    className="delete-confirm"
                  >
                    Delete
                  </button>
                </div>
              </div> // ==================END DELETE MODAL==================
            )}
          </div>
          {/*==================START TODO INFO DISPLAY==================*/}
          {error && <p>{error}</p>}
          <h1 className="todo-title">{data.title}</h1>{" "}
          <div className="date-container">
            <h4 className="todo-date">
              {data.date &&
                new Date(data.date && data.date.seconds * 1000).toDateString()}
            </h4>
            <h4 className="todo-hours">
              {data.date &&
                new Date(
                  data.date && data.date.seconds * 1000
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </h4>
          </div>
          {error != "Todo does not exist" && (
            <h2 style={{ marginTop: 0 }}>Description</h2>
          )}
          <p className="todo-description">
            {data.description != ""
              ? data.description
              : "No description available...."}
          </p>
        </div> //==================END TODO INFO DISPLAY==================
      )}
      {/* ===============START EDIT MODAL */}
      {editOpen && (
        <div>
          <div
            onClick={manageEditForm}
            className="background-cover-edit-modal"
          ></div>
          <div className="edit-todo-update-form">
            <h1>Updating your todo!</h1>
            <form>
              {titleLength == 45 ? (
                <label>
                  Todo Name - <span>Character limit reached!</span>
                </label>
              ) : (
                <label>Todo Name</label>
              )}

              <input
                placeholder="The name of the todo...."
                onChange={(e) => captureEditedTodoTitle(e)}
                value={editedTodoTitle}
                maxLength={45}
              ></input>
              <label>Date</label>
              <input
                type="datetime-local"
                onChange={captureEditedTodoDate}
                value={editedTodoDate}
              ></input>
              <label>Description (optional)</label>
              <input
                onChange={captureEditedTodoText}
                value={editedDescription}
              ></input>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  className="delete-todo-edit"
                  type="button"
                  onClick={manageEditForm}
                >
                  Cancel
                </button>
                <button
                  className="submit-todo-edit"
                  type="submit"
                  onClick={updateTodo}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    // ===============END EDIT MODAL===============
  );
}
