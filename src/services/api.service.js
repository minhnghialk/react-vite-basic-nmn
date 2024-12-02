// import axios from "axios";
import axios from "./axios.customize";

export const createNewUserAPI = ({ fullName, email, password, phone }) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName,
    email,
    password,
    phone,
  };
  return axios.post(URL_BACKEND, data);
};

export const updateUserAPI = () => {};

export const fetchAllUserAPI = () => {
  const URL_BACKEND = "/api/v1/user";
  return axios.get(URL_BACKEND);
};

// export {
//     createUserAPI, updateUserAPI
// }
