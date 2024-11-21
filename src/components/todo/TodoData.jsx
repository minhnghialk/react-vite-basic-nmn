/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const TodoData = (props) => {
  // Props là một object {}

  /*   {
    data: {
      name: "Nguyen Minh Nghia",
      age: 1995,
      address: "Ho Chi Minh City",
      country: "Viet Nam",
    }
  } */
  console.log(">>> check props: ", props);
  // Thay vì:
  // const data = props.data;

  // Nên sử dụng cú pháp destructuring, lấy data từ trong props:
  const { data } = props;
  return (
    <div className="todo-data">
      <div>My name is {props.data.name}</div>
      <p>Learning React</p>
      <p>Watching Youtube</p>
      <p>{JSON.stringify(props.todoList)}</p>
    </div>
  );
};

export default TodoData;
