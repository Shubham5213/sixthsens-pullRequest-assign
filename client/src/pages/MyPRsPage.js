import React, { useEffect, useState } from "react";
import PRService from "../services/prService.js";
import UserPR from "../components/UserPR.js";

const MyPRsPage = () => {
  const [myPR, setMyPR] = useState();
  const getMyPrs = async () => {
    const data = await PRService.getUserPR();
    if (data.success) {
      console.log(data.userPR);
      setMyPR(data.userPR);
    }
  };

  useEffect(() => {
    getMyPrs();
  }, []);
  return myPR?.map((pr) => {
    return <UserPR key={pr._id} PR={pr} />;
  });
};

export default MyPRsPage;
