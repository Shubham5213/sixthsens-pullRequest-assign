import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import PRService from "../services/prService";

const AddReviewModal = ({ open, handleClose, prId }) => {
  const [review, setReview] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    const data = await PRService.addReviewToPR(prId, review);
    if (data && data.success) {
      toast({
        title: "Review Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      handleClose();
    }
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            Add Review :
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody align="center">
            <Input
              placeholder="Enter Review"
              onChange={(e) => {
                setReview(e.target.value);
              }}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReviewModal;
