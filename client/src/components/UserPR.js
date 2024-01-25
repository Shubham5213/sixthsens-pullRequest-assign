import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

const UserPR = ({ PR }) => {
  return (
    <Box p={2} m={2}>
      <VStack
        bgColor="#0F2167"
        color="white"
        p={4}
        rounded={6}
        alignContent={"stretch"}
        h="100%"
      >
        <Box>Title: {PR.title}</Box>
        <Text>Description: {PR.description}</Text>
        <Text>Approvers Details</Text>
        {PR.approvers.map((approver) => {
          return (
            <Box
              key={approver._id}
              bgColor="#5F0F40"
              color="white"
              p={4}
              rounded={6}
            >
              <Box>Username: {approver.approverId.username}</Box>
              <Box>Email: {approver.approverId.email}</Box>
              <Box>Status: {approver.status}</Box>
              <Box>
                Reviews:{" "}
                {approver.reviews !== undefined
                  ? approver.reviews
                  : "No Reviews Yet"}
              </Box>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default UserPR;
