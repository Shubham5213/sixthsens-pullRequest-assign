import React, { useEffect, useState } from "react";
import { Heading, Box, Grid } from "@chakra-ui/react";
import PRService from "../services/prService.js";
import UserPR from "../components/UserPR.js";

const MyPRsPage = () => {
  const [myPR, setMyPR] = useState([]);
  const getMyPrs = async () => {
    const data = await PRService.getUserPR();
    if (data.success) {
      // console.log(data.userPR);
      setMyPR(data.userPR);
    }
  };

  useEffect(() => {
    getMyPrs();
  }, []);

  return (
    <Box width="100%">
      <Grid templateColumns="repeat(4, 1fr)" gap={1}>
        {myPR.length !== 0 ? (
          myPR.map((pr) => {
            return <UserPR key={pr._id} PR={pr} />;
          })
        ) : (
          <Heading mx={"auto"} mt={5}>
            No PR Generated Yet
          </Heading>
        )}
      </Grid>
    </Box>
  );
};

export default MyPRsPage;
