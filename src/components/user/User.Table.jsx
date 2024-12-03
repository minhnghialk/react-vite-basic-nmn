import "./User.Table.Module.css";
import { Table } from "antd";

const UserTable = ({ dataUsers }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
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
  ];

  return (
    <>
      <h1 className="user-table-title">User List Table</h1>
      <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    </>
  );
};

export default UserTable;
