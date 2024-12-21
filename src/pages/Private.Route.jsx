import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
// import { Navigate } from "react-router-dom";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PrivateRoute = (props) => {
  const { userInfo } = useContext(AuthContext);

  if (userInfo && userInfo.id) {
    return <>{props.children}</>;
  }

  //   return (<Navigate to="/login" replace />);
  return (
    <Result
      status="403"
      title="Unauthorize!"
      subTitle={"You must login to access this resource!"}
      extra={
        <Button type="primary">
          <Link to="/login">Login</Link>
        </Button>
      }
    />
  );
};

export default PrivateRoute;
