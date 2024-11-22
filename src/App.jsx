import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
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

  // Hàm tạo ra ID
  // Javascript random number between range

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // const rndInt = randomIntFromInterval(1, 6);
  // console.log("rndInt", rndInt);

  const handleAddNewTodo = (task) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      task: task,
    };

    // Không nên thay đổi (mutate) trực tiếp trạng thái (state) của React bằng method push của array sẽ dễ gặp bug:
    // todoList.push(newTodo);

    // Thay vào đó nên thực hiện như thế này:
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
