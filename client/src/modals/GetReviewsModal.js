import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  VStack,
  Box,
} from "@chakra-ui/react";
import PRService from "../services/prService";

const GetReviewsModal = ({ open, handleClose, pullRequestId }) => {
  const [reviews, setReviews] = useState([]);
  // const toast = useToast();
  const getReviews = async () => {
    const data = await PRService.getPRReviews(pullRequestId);
    if (data && data.success) {
      // console.log(data);  
      setReviews(data.reviews);
      // toast({
      //   title: "Successfully fetched",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
    }
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} isCentered p={4}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            See Reviews :
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody align="center">
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GetReviewsModal;
