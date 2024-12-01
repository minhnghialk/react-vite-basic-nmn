import "./User.Form.Module.css";
import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createNewUserAPI } from "../../services/api.service";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreateNewUser = async () => {
    const response = await createNewUserAPI({
      fullName,
      email,
      password,
      phone,
    });

    if (response.data) {
      notification.success({
        message: "Success",
        description: "Create a new user successfully",
      });
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(response.message),
      });
    }
  };
  return (
    <div className="user-form">
      <div className="user-form__wrapper">
        <div className="user-form__field">
          <span>Full name</span>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="user-form__field">
          <span>Email</span>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="user-form__field">
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="user-form__field">
          <span>Phone number</span>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="button-container">
          <Button
            className="create-button"
            type="primary"
            onClick={handleCreateNewUser}
          >
            Create new user
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
