import "./LoginPage.Module.css";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Divider,
  message,
  notification,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/api.service";
import { useState, useContext } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const { setUserInfo } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

  let navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setisLoading(true);

    const response = await loginUserAPI(values.email, values.password);

    if (response.data) {
      message.success("Login successfully");

      localStorage.setItem("access_token", response.data.access_token);

      setUserInfo(response.data.user);

      navigate("/");
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(response.message),
      });
    }

    setisLoading(false);
  };
  return (
    <>
      <Row justify={"center"} className="login-form-container">
        <Col xs={24} md={16} lg={8}>
          <fieldset className="login-fieldset">
            <legend>Login</legend>
            <Form
              layout="vertical"
              form={form}
              name="basic"
              onFinish={onFinish}
            >
              <h1 className="login-title">Login Form</h1>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },

                  {
                    type: "email",
                    message: "The input is not valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <div className="form-actions">
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                  </Button>

                  <Link to="/">
                    Go to homepage <ArrowRightOutlined />{" "}
                  </Link>
                </div>
              </Form.Item>
            </Form>

            <Divider />

            <div className="guest-register-prompt">
              Not a member?
              <Link to={"/register"}> Register here</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
