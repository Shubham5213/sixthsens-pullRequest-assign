import axios from "axios";
const { apiUrl } = require("../constant/constant");

class PRService {
  static async getUserPR() {
    let url = apiUrl + "/pull-requests/getpr";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserPRApprovalRequests() {
    let url = apiUrl + "/user/pull-requests";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePRApprovalStatus(approvelId, status) {
    let url = `${apiUrl}/user/pull-requests/${approvelId}`;
    const body = {
      status: status,
    };
    try {
      const response = await axios.put(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async addReviewToPR(approvelId, review) {
    let url = `${apiUrl}/user/pull-requests/${approvelId}/reviews`;
    const body = {
      reviews: review,
    };
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
      console.log(error);
    }
  }
  static async createPR(title, description, approvers) {
    let url = `${apiUrl}/pull-requests`;
    const body = {
      title,
      description,
      approvers,
    };
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
      console.log(error);
    }
  }
}

export default PRService;
