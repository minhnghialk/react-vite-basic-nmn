import "./style.css";

// JSX : 1 parent
const MyComponent = () => {
  return (
    // fragment
    <>
      <div>Nguyễn Minh Nghĩa</div>
      <div className="child" style={{ textDecoration: "underline" }}>
        child
      </div>
    </>
  );
};

export default MyComponent;
