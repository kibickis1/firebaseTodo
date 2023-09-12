import "./TodoList.css";
import { projectFirestore } from "../firebase/config";
import SubmissionForm from "./SubmissionForm";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

function TodoList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (event) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
      //I want to send this check to submission form.js so I could delete all values that are checked
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
    setIsSubscribed((current) => !current);
  };

  useEffect(() => {
    setLoading(true);

    projectFirestore.collection("todos").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No todos to load");
          setLoading(false);
        } else {
          let results = [];
          // console.log(snapshot);
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          console.log(results);
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  const deleteTodo = (id) => {
    projectFirestore.collection("todos").doc(id).delete();
  };

  return (
    <div className="todos-container-full">
      <Link to="submission">
        <button className="submission-form-button">Add Todo</button>
      </Link>

      {error && <p>{error}</p>}
      {loading ? (
        <h4 className="loading">Loading.....</h4>
      ) : (
        data.map((todo) => (
          // <Link to={`/todos/${todo.id}`}>
          <Link to={`/todo/${todo.id}`}>
            <div className="todo" key={todo.id}>
              <div className="todo-left">
                <input
                  type="checkbox"
                  className="checkbox"
                  value={isSubscribed}
                  onChange={handleChange}
                />
                <h3>{todo.title}</h3>
                <h4>{todo.description}</h4>
              </div>
              <div className="todo-rigth">
                <button>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default TodoList;
