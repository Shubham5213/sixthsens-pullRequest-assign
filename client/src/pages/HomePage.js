import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading } from "@chakra-ui/react";
import AuthContext from "../context/authContext";
import CreatePRModal from "../modals/CreatePRModal";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box p={2} mx="auto">
      <CreatePRModal open={open} handleClose={handleClose} />
      <Heading align="center">WELCOME{" "}{authContext.username}!</Heading>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleOpen}
      >
        Create pullRequest
      </Button>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          navigate("/my-prs");
        }}
      >
        My PR Status
      </Button>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          navigate("/pr-requests");
        }}
      >
        My PR Approval Requests
      </Button>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={authContext.logout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default HomePage;
