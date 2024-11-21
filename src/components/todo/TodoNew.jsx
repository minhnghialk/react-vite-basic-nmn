/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
const TodoNew = ({ handleAddNewTodo }) => {
  // handleAddNewTodo("Nghia");

  // const handleOnChange = (e) => {
  //   console.log(">>> handle on change: ", e.target.value);
  // };

  const handleOnChange = (task) => {
    console.log(">>> handle on change: ", task);
  };

  const handleClick = () => {
    alert("Click me!");
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
    </div>
  );
};

export default TodoNew;
