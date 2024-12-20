import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: "",
  fullName: "",
  avatar: "",
  email: "",
  phone: "",
  role: "",
});

export const AuthWrapper = ({children}) => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    fullName: "",
    avatar: "",
    email: "",
    phone: "",
    role: "",
  });

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
