import { useState } from "react";

const TodoNew = () => {
  // handleAddNewTodo("Nghia");

  const [valueInput, setValueInput] = useState("");

  // const handleOnChange = (e) => {
  //   console.log(">>> handle on change: ", e.target.value);
  // };

  const handleOnChange = (task) => {
    // console.log(">>> handle on change: ", task);
    setValueInput(task);
  };

  const handleClick = () => {
    // alert("Click me!");
    console.log(">>> check value input: ", valueInput);
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
