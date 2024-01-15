import { useState, useRef } from "react";
import "./Todo.css";

export default function TODO() {
  const [todo, setTodo] = useState([]);
  const inputRef = useRef("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [editId, setEditId] = useState("");

  function Filedhandler(e) {
    if (
      inputRef.current.value !== "" &&
      inputRef.current.value.length > 0 &&
      todo.length >= 1
    ) {
      if (!buttonStatus) {
        setTodo([
          ...todo,
          { id: todo.length, todo: inputRef.current.value, isDone: false },
        ]);
      } else {
        setTodo(
          todo.map((item) => {
            if (item.id === editId) {
              item.todo = inputRef.current.value;
              setEditId("");
              setButtonStatus(false);
            }
            return item;
          })
        );
      }
    } else if (
      inputRef.current.value !== "" &&
      inputRef.current.value.length > 0
    ) {
      setTodo([
        { id: todo.length, todo: inputRef.current.value, isDone: false },
      ]);
    }
    inputRef.current.value = "";
  }

  const deleteHandler = (id) => {
    let updatedTodo = todo.filter((item) => item.id !== id);
    updatedTodo = updatedTodo.map((item, index) => {
      item.id = index;
      return item;
    });

    setTodo(updatedTodo);
  };

  const EditHandler = (item) => {
    setButtonStatus(true);
    setEditId(item.id);
    inputRef.current.value = item.todo;
  };

  const isDoneHandler = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  return (
    <div className="App">
      <input ref={inputRef} />

      <button className="save-button" onClick={(e) => Filedhandler(e)}>
        Save
      </button>

      <div>
        <h3>TODO List</h3>
        {todo.map((item) => (
          <div
            key={item.id}
            className={!item.isDone ? "todo-item" : "todo-item done"}
          >
            <span className="todo-text" onClick={() => isDoneHandler(item.id)}>
              {parseInt(item.id + 1)}. {item.todo}
            </span>
            <div>
              <button
                className="delete-button"
                onClick={() => deleteHandler(item.id)}
              >
                Delete
              </button>
              <button className="edit-button" onClick={() => EditHandler(item)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
