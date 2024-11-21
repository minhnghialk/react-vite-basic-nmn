/* eslint-disable react/prop-types */
const TodoNew = ({ handleAddNewTodo }) => {
  handleAddNewTodo("Nghia");

  return (
    <div className="todo-new">
      <input type="text" placeholder="Enter your task" />

      <button onClick={handleAddNewTodo}>Add</button>
    </div>
  );
};

export default TodoNew;
