import "./UserPage.Module.css";
import UserForm from "../components/user/User.Form";
import UserTable from "../components/user/User.Table";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [dataUsers, setDataUsers] = useState([
    {
      _id: 1,
      fullName: "Nguyễn Minh Nghĩa",
      email: "nghia13031995@gmail.com",
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
      <UserForm loadUser={loadUser}/>
      <UserTable dataUsers={dataUsers} />
    </div>
  );
};

export default UsersPage;
