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

  const [isAppLoading, setIsAppLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isAppLoading, setIsAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
