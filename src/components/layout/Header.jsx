import { Link } from "react-router-dom";
// import "./Header.css";
import { Menu } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Children, useState } from "react";

const Header = () => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
    {
      label: "Setting",
      key: "setting",
      icon: <SettingOutlined/>,
      children: [
        {
          label: <Link to={"/login"}>Login</Link>,
          key: "login"
        },
        {
          label: "Logout",
          key: "logout"
        }
      ]
    }
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
