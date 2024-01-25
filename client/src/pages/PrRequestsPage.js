import React, { useEffect, useState } from "react";
import { Heading, Box, Grid } from "@chakra-ui/react";
import PRService from "../services/prService.js";
import ApprovalPR from "../components/ApprovalPR.js";

const PrRequestsPage = () => {
  const [prRequests, setprRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMyPrs = async () => {
    setLoading(true);
    const data = await PRService.getUserPRApprovalRequests();
    if (data && data.success) {
      // console.log(data.approvals);
      setprRequests(data.approvals);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPrs();
  }, []);
  return (
    <Box width="100%">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {prRequests.length !== 0 ? (
          prRequests.map((pr) => {
            return <ApprovalPR key={pr._id} approvalPR={pr} />;
          })
        ) : (
          <Heading mx={"auto"} mt={5}>
            {loading ? "Loading..." : "No PR Requests Yet"}
          </Heading>
        )}
      </Grid>
    </Box>
  );
};

export default PrRequestsPage;
