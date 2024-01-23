import React, { useEffect, useState } from "react";
import { Heading, Box, Grid } from "@chakra-ui/react";
import PRService from "../services/prService.js";
import ApprovalPR from "../components/ApprovalPR.js";

const PrRequestsPage = () => {
  const [prRequests, setprRequests] = useState();
  const getMyPrs = async () => {
    const data = await PRService.getUserPRApprovalRequests();
    if (data.success) {
      // console.log(data.approvals);
      setprRequests(data.approvals);
    }
  };

  useEffect(() => {
    getMyPrs();
  }, []);
  return (
    <Box width="100%">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {prRequests !== undefined ? (
          prRequests.map((pr) => {
            return <ApprovalPR key={pr._id} approvalPR={pr} />;
          })
        ) : (
          <Heading mx={"auto"} mt={5}>
            No PR Requests Yet
          </Heading>
        )}
      </Grid>
    </Box>
  );
};

export default PrRequestsPage;
