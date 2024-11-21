import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";

const App = () => {
  const data = {
    name: "Nguyen Minh Nghia",
    age: 1995,
    address: "Ho Chi Minh City",
    country: "Viet Nam",
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>

      <TodoNew />

      <TodoData data={data} />

      <div className="todo-image">
        <img src={reactLogo} className="logo" alt="react-logo" />
      </div>
    </div>
  );
};

export default App;
