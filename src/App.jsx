import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  /*   const data = {
    name: "Nguyen Minh Nghia",
    age: 1995,
    address: "Ho Chi Minh City",
    country: "Viet Nam",
  }; */

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default App;
