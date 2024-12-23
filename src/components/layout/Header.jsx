import { Link, useNavigate } from "react-router-dom";
// import "./Header.css";
import { Menu, message } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  LoginOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logOutAPI } from "../../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState("");

  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(AuthContext);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const response = await logOutAPI();
    if (response.data) {
      // clear data
      localStorage.removeItem("access_token");

      setUserInfo({
        id: "",
        fullName: "",
        avatar: "",
        email: "",
        phone: "",
        role: "",
      });

      message.success("Log out successfully!");

      // redirect to homepage
      navigate("/");
    }
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "user",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <BookOutlined />,
    },
    ...(!userInfo.id
      ? [
          {
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    // ...(userInfo.id
    //   ? [
    //       {
    //         label: `Welcome ${userInfo.fullName}`,
    //         key: "setting",
    //         icon: <SettingOutlined />,
    //         children: [
    //           {
    //             label: <span onClick={() => handleLogout()}>Logout</span>,
    //             key: "logout",
    //             icon: <LogoutOutlined />,
    //           },
    //         ],
    //       },
    //     ]
    //   : []),
    {
      label: `Welcome ${userInfo.fullName}`,
      key: "setting",
      icon: <SettingOutlined />,
      children: [
        {
          label: <span onClick={() => handleLogout()}>Logout</span>,
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
