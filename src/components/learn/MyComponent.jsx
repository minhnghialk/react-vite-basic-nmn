import "./style.css";

// JSX : 1 parent
const MyComponent = () => {
  const name = "Nguyễn Minh Nghĩa";
  const age = 1995;

  const array = [1, 2, 3];
  const object = {
    name: "Nguyễn Minh Nghĩa",
    age: 1995,
  };
  return (
    // fragment
    <>
      <div>
        {name}, {age}, {JSON.stringify(array)}, {object.name}, {object.age}
      </div>
      <div>{console.log("NGUYEN-MINH-NGHIA")}</div>
      <div className="child" style={{ textDecoration: "underline" }}>
        child
      </div>
    </>
  );
};

export default MyComponent;
