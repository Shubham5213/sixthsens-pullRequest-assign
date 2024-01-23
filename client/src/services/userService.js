import axios from "axios";
const { apiUrl } = require("../constant/constant");

class UserService {
  static async getUserDetails() {
    let url = `${apiUrl}/user/islogin`;
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        return res.data;
      } else {
        console.log(res.data.msg);
        return false;
      }
    } catch (error) {
      if (error.status === 401) {
        console.log("Unauthorized");
        window.location.reload("false");
      }
      return false;
    }
  }

  static async searchUser(query) {
    let url = `${apiUrl}/user/search?search=${query}`;
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        return res.data;
      } else {
        console.log(res.data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default UserService;
