import { Table } from "antd";
import { fetchAllUserAPI } from "../../services/api.service";
import { useEffect, useState } from "react";

const UserTable = () => {
  const [dataUsers, setDataUsers] = useState([
    {
      _id: 1,
      fullName: "Nguyễn Minh Nghĩa",
      email: "nghia13031995@gmail.com",
      phone: "0369274783",
    },
  ]);

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

  const loadUser = async () => {
    const response = await fetchAllUserAPI();
    if (response.data) setDataUsers(response.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};

export default UserTable;
