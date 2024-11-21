import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  // eslint-disable-next-line no-unused-vars
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
  const data = {
    name: "Nguyen Minh Nghia",
    age: 1995,
    address: "Ho Chi Minh City",
    country: "Viet Nam",
  };

  const handleAddNewTodo = (name) => {
    alert(`Call me now, baby ^.^ ${name}`);
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
