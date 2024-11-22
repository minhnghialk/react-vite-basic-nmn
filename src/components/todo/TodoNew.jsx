import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TodoNew = ({ handleAddNewTodo }) => {
  const [valueInput, setValueInput] = useState("");

  const handleOnInputChange = (task) => {
    setValueInput(task);
  };

  const handleClick = () => {
    handleAddNewTodo(valueInput);
    setValueInput(""); //đặt giá trị ô input về lại trạng thái ban đầu
  };

  return (
    <div className="todo-new">
      <input
        type="text"
        placeholder="Enter your task"
        value={valueInput} // kiểm soát giá trị của ô inputÏ
        onChange={(e) => handleOnInputChange(e.target.value)}
      />

      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default TodoNew;
