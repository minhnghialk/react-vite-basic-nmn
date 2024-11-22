import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TodoNew = ({ handleAddNewTodo }) => {
  const [valueInput, setValueInput] = useState("");

  // const handleOnChange = (e) => {
  //   console.log(">>> handle on change: ", e.target.value);
  // };

  const handleOnChange = (task) => {
    setValueInput(task);
  };

  const handleClick = () => {
    handleAddNewTodo(valueInput);
  };

  return (
    <div className="todo-new">
      <input
        type="text"
        placeholder="Enter your task"
        // onChange={handleOnChange}
        onChange={(e) => handleOnChange(e.target.value)}
      />

      <button onClick={handleClick}>Add</button>
      <div>My text input is: {valueInput}</div>
    </div>
  );
};

export default TodoNew;
