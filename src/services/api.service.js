// import axios from "axios";
import axios from "./axios.customize";

export const createNewUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName,
    email,
    password,
    phone,
  };
  return axios.post(URL_BACKEND, data);
};

export const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id,
    fullName,
    phone,
  };
  return axios.put(URL_BACKEND, data);
};

export const fetchAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

export const deleteUserAPI = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};

export const hanldeUploadFileAPI = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";

  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  return axios.post(URL_BACKEND, bodyFormData, config);
};

export const updateUserAvatarAPI = (_id, avatar) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id,
    avatar,
  };
  return axios.put(URL_BACKEND, data);
};

export const registerNewUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName,
    email,
    password,
    phone,
  };
  return axios.post(URL_BACKEND, data);
};

export const loginUserAPI = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    userName: email,
    password,
    delay: 2000,
  };
  return axios.post(URL_BACKEND, data);
};

export const getAccountAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};

// export {
//     createUserAPI, updateUserAPI
// }
