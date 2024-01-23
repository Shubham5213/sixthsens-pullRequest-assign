import React, { useEffect, useState } from "react";
import PRService from "../services/prService.js";
import ApprovalPR from "../components/ApprovalPR.js";

const PrRequestsPage = () => {
  const [prRequests, setprRequests] = useState();
  const getMyPrs = async () => {
    const data = await PRService.getUserPRApprovalRequests();
    if (data.success) {
      console.log(data.approvals);
      setprRequests(data.approvals);
    }
  };

  useEffect(() => {
    getMyPrs();
  }, []);
  return prRequests?.map((pr) => {
    return <ApprovalPR key={pr._id} approvalPR={pr} />;
  });
};

export default PrRequestsPage;
