import axios from "axios";
import Cookies from "js-cookie";


const login = async (username, password) => {
  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);

  return axios
    .post("http://localhost:3000/auth/login", data)
    .then((response) => {
      if (response.data.access_token) {
        Cookies.set("user", response.data.access_token);
      }
      return response.data;
    });
};

const getToken = () => {
  return Cookies.get("user");
  
};

const logout = async () => {
  Cookies.remove("user");
};

const register = async (username, firstname, lastname, email, password) => {
  const data = new URLSearchParams();
  data.append("firstname", firstname);
  data.append("lastname", lastname);
  data.append("username", username);
  data.append("email", email);
  data.append("password", password);

  return axios.post("http://localhost:3000/users", data);

};

const getUser = async (token) => {
    return await axios.get("http://localhost:3000/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const update = async (username, firstname, lastname, email, password, id) => {
  const data = new URLSearchParams();
  data.append("firstname", firstname);
  data.append("lastname", lastname);
  data.append("username", username);
  data.append("email", email);
  data.append("password", password);

  

  return axios.patch(`http://localhost:3000/users/${id}`, data);
};

export { login, getUser, getToken, logout, register, update };
