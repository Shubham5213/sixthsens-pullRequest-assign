import axios from "axios";
const { apiUrl } = require("../constant/constant");

class AuthService {
  static async postSignup(username, email, password) {
    let url = apiUrl + "/user";
    const body = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      let data = response.data;
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async postLogin(email, password) {
    const body = {
      email,
      password,
    };
    let url = apiUrl + "/user/login";
    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      let data = response.data;
      return data;
    } catch (error) {
      // console.log(error);
      return;
    }
  }

  static async getLogout() {
    let url = apiUrl + "/user/logout";
    try {
      const response = await axios.get(url, {
        withCredentials: true /*important*/,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export default AuthService;
