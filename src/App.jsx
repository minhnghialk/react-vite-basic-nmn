import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  const data = {
    name: "Nguyen Minh Nghia",
    age: 1995,
    address: "Ho Chi Minh City",
    country: "Viet Nam",
  };

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      task: "Learning React",
    },
    {
      id: 2,
      task: "Watching Youtube",
    },
  ]);

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

    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>

      <TodoNew handleAddNewTodo={handleAddNewTodo} />

      <TodoData data={data} todoList={todoList} />

      <div className="todo-image">
        <img src={reactLogo} className="logo" alt="react-logo" />
      </div>
    </div>
  );
};

export default App;
