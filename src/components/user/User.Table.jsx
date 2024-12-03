import "./User.Table.Module.css";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./Update.User.Modal";
import { useState } from "react";

const UserTable = ({ loadUser, dataUsers }) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a href="#">{record._id}</a>
        </>
      ),
    },
    {
      title: "Full name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="action-wrapper">
          <EditOutlined
            className="action-icon edit-icon"
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
          />
          <DeleteOutlined className="action-icon delete-icon" />
        </div>
      ),
    },
  ];

  return (
    <>
      <h1 className="user-table-title">User List Table</h1>

      <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />

      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
