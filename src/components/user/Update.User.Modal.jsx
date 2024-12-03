import "./Update.User.Modal.Module.css";
import { useState, useEffect } from "react";
import { Input, notification, Modal } from "antd";
import { UpdateUserAPI } from "../../services/api.service";

const UpdateUserModal = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  dataUpdate,
  setDataUpdate,
  loadUser,
}) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleUpdateUser = async () => {
    const response = await UpdateUserAPI({
      id,
      fullName,
      phone,
    });

    if (response.data) {
      notification.success({
        message: "Success",
        description: "Update user information successfully",
      });

      resetAndCloseModal();

      await loadUser();
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(response.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);

    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="User Information Update Form"
      open={isModalUpdateOpen}
      onOk={handleUpdateUser}
      onCancel={resetAndCloseModal}
      maskClosable={false}
      okText="Save"
    >
      <div className="user-form">
        <div className="user-form__wrapper">
          <div className="user-form__field">
            <span>Id</span>
            <Input value={id} disabled />
          </div>

          <div className="user-form__field">
            <span>Full name</span>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="user-form__field">
            <span>Phone number</span>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
