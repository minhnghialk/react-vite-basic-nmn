import { Button, Input, Form, notification, Row, Col, Divider} from "antd";
import "./RegisterPage.Module.css";
import { registerNewUserAPI } from "../services/api.service";
import { useNavigate, Link } from "react-router";

const RegisterPage = () => {
  let navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("check values", values);

    const response = await registerNewUserAPI(
      values.fullName,
      values.email,
      values.password,  
      values.phone
    );

    if (response.data) {
      notification.success({
        message: "Success",
        description: "Register new user successfully",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(response.message),
      });
    }
  };
  return (
    <>
    <Row justify={"center"} className="register-form-container">
      <Col xs={24} md={16} lg={8}>
        <fieldset className="register-fieldset">
          <legend>Register</legend>
          <Form
        layout="vertical"
        form={form}
        name="basic"
        onFinish={onFinish}
        style={{ margin: "10px" }}
        // onFinishFailed={onFinishFailed}
      >
        <h1 className="register-title">REGISTER FORM</h1>
        <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
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

            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/\d+/g),
                  message: "Wrong format!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item className="register-btn">
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>

        <Divider />

        <div className="guest-login-prompt">
              Have an account?
              <Link to={"/login"}> Login here</Link>
            </div>
      </Form>
        </fieldset>
      </Col>
    </Row>

    </>
  );
};

export default RegisterPage;
