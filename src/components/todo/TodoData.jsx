/* eslint-disable react/prop-types */

const TodoData = ({ todoList }) => {
  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        return (
          <div key={index} className="todo-item">
            <div>{item.task}</div>
            <div className="todo-item__button">
              <button>Update</button>
              <button>Remove</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
