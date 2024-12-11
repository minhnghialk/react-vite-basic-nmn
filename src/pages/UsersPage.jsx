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
    {
      _id: 8,
      fullName: "Test-4",
      email: "test-4@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 9,
      fullName: "Test-5",
      email: "test-5@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 10,
      fullName: "Test-6",
      email: "test-6@gmail.com",
      phone: "0369274783",
    },
    {
      _id: 11,
      fullName: "Test-7",
      email: "test-7@gmail.com",
      phone: "0369274783",
    },
  ]);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const loadUser = async () => {
    const response = await fetchAllUserAPI(current, pageSize);
    if (response.data) {
      setDataUsers(response.data.result);
      setCurrent(response.data.meta.current);
      setPageSize(response.data.meta.pageSize);
      setPageSize(response.data.meta.total);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, pageSize]);

  return (
    <div className="container">
      <UserForm loadUser={loadUser} />
      <UserTable
        loadUser={loadUser}
        dataUsers={dataUsers}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UsersPage;
