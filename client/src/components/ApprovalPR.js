import React,{useState} from "react";
import { Box, VStack, Text, Button, HStack, useToast } from "@chakra-ui/react";
import PRService from "../services/prService";
import AddReviewModal from "../modals/AddReviewModal";

const ApprovalPR = ({ approvalPR }) => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const approvalId = approvalPR._id;

   const handleOpen = () => setOpen(true);
   const handleClose = () => {
     setOpen(false);
   };

  const handleStatus = async (status) => {
    console.log(status);
    const data = await PRService.updatePRApprovalStatus(approvalId, status);
    if (data.success) {
      toast({
        title: `${status} Successfully!!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      window.location.reload(false);
    }
  };

  return (
    <Box m={4}>
      <AddReviewModal
        open={open}
        approvalId={approvalId}
        handleClose={handleClose}
      />
      <VStack bgColor="#0F2167" color="white" p={4} rounded={4}>
        <Box p={2}>
          <Text>PR Title: {approvalPR.pullRequestId.title}</Text>
          <Text>PR Desc: {approvalPR.pullRequestId.description}</Text>
        </Box>
        {approvalPR.status === "Pending" ? (
          <HStack>
            <Button
              colorScheme="green"
              onClick={() => {
                handleStatus("Approved");
              }}
            >
              Approve
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleStatus("Rejected");
              }}
            >
              Reject
            </Button>
          </HStack>
        ) : (
          <Text bg="#030637">{approvalPR.status}!!</Text>
        )}
        {/* open add review model */}
        <Button colorScheme="blue" onClick={handleOpen}>Add Review</Button>
        <Button colorScheme="blue">Other Approvers Decisions</Button>
      </VStack>
    </Box>
  );
};

export default ApprovalPR;
