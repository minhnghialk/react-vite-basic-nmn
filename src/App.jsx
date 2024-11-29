import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  /*   const data = {
    name: "Nguyen Minh Nghia",
    age: 1995,
    address: "Ho Chi Minh City",
    country: "Viet Nam",
  }; */

  const [todoList, setTodoList] = useState([]);

  // Hàm tạo ra ID
  // Javascript random number between range

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleAddNewTodo = (task) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      task: task,
    };

    // setTodoList([...todoList, newTodo]);
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    const newTodo = todoList.filter((item) => item.id !== id);
    console.log("Delete OK!", newTodo);
    setTodoList(newTodo);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>

      <TodoNew handleAddNewTodo={handleAddNewTodo} />

      {todoList.length > 0 ? (
        <TodoData todoList={todoList} handleDeleteTodo={handleDeleteTodo} />
      ) : (
        <div className="todo-image">
          <img src={reactLogo} className="logo" alt="react-logo" />
        </div>
      )}

      {/* {todoList.length > 0 && <TodoData todoList={todoList} />}

      {todoList.length === 0 && (
        <div className="todo-image">
          <img src={reactLogo} className="logo" alt="react-logo" />
        </div>
      )} */}
    </div>
  );
};

export default App;
