import "./UserPage.Module.css";
import UserForm from "../components/user/User.Form";
import UserTable from "../components/user/User.Table";

const UsersPage = () => {
  return (
    <div className="container">
      <UserForm />
      <UserTable />
    </div>
  );
};

export default UsersPage;
