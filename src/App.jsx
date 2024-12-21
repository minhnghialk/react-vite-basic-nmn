import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  /*   const data = {
    name: "Nguyen Minh Nghia",
    age: 1995,
    address: "Ho Chi Minh City",
    country: "Viet Nam",
  }; */

  const { setUserInfo, isAppLoading, setIsAppLoading } =
    useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const response = await getAccountAPI();
    if (response.data) {
      setUserInfo(response.data.user);
    }
    setIsAppLoading(false);
  };

  return (
    <>
      {isAppLoading === true ? (
        <div className="loading-container">
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
