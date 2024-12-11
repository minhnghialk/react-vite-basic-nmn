import { Button, Input, Form } from "antd";
import "./RegisterPage.Module.css";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("check values", values);
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="basic"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <div className="register-container">
          <h1 className="register-title">REGISTER FORM</h1>

          <Form.Item
            label="Full name"
            name="fullName"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your username!",
            //   },
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your username!",
            //   },
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your password!",
            //   },
            // ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your username!",
            //   },
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="register-btn">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default RegisterPage;
