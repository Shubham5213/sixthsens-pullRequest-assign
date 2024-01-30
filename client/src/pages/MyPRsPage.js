import React, { useEffect, useState } from "react";
import { Heading, Box, Grid, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import PRService from "../services/prService.js";
import UserPR from "../components/UserPR.js";

const MyPRsPage = () => {
  const [myPR, setMyPR] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMyPrs = async () => {
    setLoading(true);
    const data = await PRService.getUserPR();
    if (data && data.success) {
      // console.log(data);
      setMyPR(data.userPR);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPrs();
  }, []);

  return (
    <Box width="100%">
      <Text color="blue" mx={4} py={2} as="u">
        <Link to="/home"><ArrowBackIcon mb={1} mx={0.5}/>Go Back</Link>
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={1}>
        {myPR.length !== 0 ? (
          myPR.map((pr) => {
            return <UserPR key={pr._id} PR={pr} />;
          })
        ) : (
          <Heading mx={"auto"} mt={5} w={"full"}>
            {loading ? "Loading..." : "No PullRequest Generated Yet"}
          </Heading>
        )}
      </Grid>
    </Box>
  );
};

export default MyPRsPage;
