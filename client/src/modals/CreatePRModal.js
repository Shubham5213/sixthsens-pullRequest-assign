import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import UserBadgeItem from "../components/userAvatar/UserBadgeItem";
import UserListItem from "../components/userAvatar/UserListItem";
import PRService from "../services/prService";
import UserService from "../services/userService";

const CreatePRModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleApprovers = (approversToAdd) => {
    if (selectedApprovers.includes(approversToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedApprovers([...selectedApprovers, approversToAdd]);
  };

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setLoading(true);
    const data = await UserService.searchUser(query);
    // console.log(data);
    setSearchResult(data.users);
    setLoading(false);
  };

  const handleDelete = (delUser) => {
    setSelectedApprovers(
      selectedApprovers.filter((sel) => sel._id !== delUser._id)
    );
  };

  const handleSubmit = async () => {
    if (!title || !selectedApprovers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const approvers = [];

    selectedApprovers.forEach((s) => {
      approvers.push({ approverId: s._id });
    });

    const data = await PRService.createPR(title, description, approvers);
    if (data.success) {
      toast({
        title: data.msg,
        status: "Success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      handleClose();
      window.location.reload(false);
    } else {
      toast({
        title: data.msg,
        status: "Error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            Create Pull Request
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Input
              type="text"
              placeholder="Enter Title"
              mb={3}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter Description"
              mb={3}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder="Add Approvers by Username/Email"
              mb={1}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedApprovers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleApprovers(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Pull Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePRModal;
