import React,{useState} from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import PRService from "../services/prService";

const UserPR = ({ PR }) => {
  const [reviews, setReviews]=useState([]);
  const handleReviews=async ()=>{
    const data = await PRService.getPRReviews(PR._id);
    if (data && data.success) {
      // console.log(data);  
      setReviews(data.reviews);
    }
  };
  return (
    <Box p={2} m={2} w={"full"}>
      <VStack
        bgColor="#0F2167"
        color="white"
        p={4}
        rounded={6}
        alignContent={"stretch"}
        h="100%"
      >
        <Text>Title: {PR.title}</Text>
        <Text>Description: {PR.description}</Text>
        <Text>
          Current Status:{" "}
          {PR.currentLevel === -1
            ? "Approved"
            : `pending at Level ${PR.currentLevel}`}
        </Text>
        <Button colorScheme="blue" onClick={handleReviews}>
          Get all Reviews
        </Button>
        <VStack>
          {reviews?.map((review) => {
            return (
              <Box
                key={review._id}
                bgColor="#092635"
                color="white"
                p={4}
                rounded={4}
              >
                <Box>Username: {review.userId.username}</Box>
                <Box>Email: {review.userId.email}</Box>
                <Box>
                  Reviews:{" "}
                  {review.reviews !== undefined
                    ? review.reviews
                    : "No Reviews Yet"}
                </Box>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

export default UserPR;
