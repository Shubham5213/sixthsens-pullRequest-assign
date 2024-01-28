import React, { useEffect, useState } from "react";
import { Heading, Box, Grid, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import PRService from "../services/prService.js";
import ApprovalPR from "../components/ApprovalPR.js";

const PrRequestsPage = () => {
  const [prRequests, setprRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMyPrs = async () => {
    setLoading(true);
    const data = await PRService.getUserPRApprovalRequests();
    // console.log();
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
      <Text color="blue" mx={4} py={2} as="u">
        <Link to="/home">
          <ArrowBackIcon mb={1} mx={0.5} />
          Go Back
        </Link>
      </Text>
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
