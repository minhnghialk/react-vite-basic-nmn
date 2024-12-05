import "./UserPage.Module.css";
import UserForm from "../components/user/User.Form";
import UserTable from "../components/user/User.Table";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [dataUsers, setDataUsers] = useState([
    {
      _id: 1,
      fullName: "I'm Admin",
      email: "admin@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 2,
      fullName: "I'm User",
      email: "user@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 3,
      fullName: "Guest",
      email: "guest@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 4,
      fullName: "Nguyễn Minh Nghĩa",
      email: "nghia13031995@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 5,
      fullName: "Test-1",
      email: "test-1@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 6,
      fullName: "Test-2",
      email: "test-2@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 7,
      fullName: "Test-3",
      email: "test-3@gmail.com",
      phone: "0369274783",
    },
  ]);

  const loadUser = async () => {
    const response = await fetchAllUserAPI();
    if (response.data) setDataUsers(response.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="container">
      <UserForm loadUser={loadUser} />
      <UserTable loadUser={loadUser} dataUsers={dataUsers} />
    </div>
  );
};

export default UsersPage;
