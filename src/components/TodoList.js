import "./TodoList.css";
import { projectFirestore } from "../firebase/config";
import SubmissionForm from "./SubmissionForm";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ArrowFwd from "../images/ArrowFwd.svg";

function TodoList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  return (
    <div className="todos-container-full">
      {error && <p>{error}</p>}
      {loading ? (
        <h4 className="loading">Loading.....</h4>
      ) : (
        data.map((todo) => (
          // <Link to={`/todos/${todo.id}`}>

          <div className="todo" key={todo.id}>
            <div className="todo-left">
              <div>
                <h3>{todo.title}</h3>
              </div>
              {/* <h4>{todo.description}</h4> */}

              <div>
                <p className="date-display">
                  {new Date(todo.date.seconds * 1000).toDateString()}
                </p>
              </div>
            </div>
            <div className="todo-right">
              {/* <button>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button> */}
              <Link to={`/todo/${todo.id}`}>
                <img src={ArrowFwd} alt="test"></img>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;
