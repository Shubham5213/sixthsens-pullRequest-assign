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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserBadgeItem from "../components/userAvatar/UserBadgeItem";
import UserListItem from "../components/userAvatar/UserListItem";
import PRService from "../services/prService";
import UserService from "../services/userService";

const CreatePRModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [approverLevel, setApproverLevel] = useState();
  const [selectedApprovers, setSelectedApprovers] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleApprovers = (approversToAdd, level) => {
    for (const key in selectedApprovers) {
      if (
        Object.hasOwn(selectedApprovers, key) &&
        selectedApprovers[key].includes(approversToAdd)
      ) {
        toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
    }
    if (Object.hasOwn(selectedApprovers, level)) {
      setSelectedApprovers({
        ...selectedApprovers,
        [level]: [...selectedApprovers[level], approversToAdd],
      });
    } else
      setSelectedApprovers({ ...selectedApprovers, [level]: [approversToAdd] });
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

  const handleDelete = (delUser, level) => {
    const updatedApprovers = selectedApprovers[level].filter(
      (sel) => sel._id !== delUser._id
    );
    // console.log(updatedApprovers.length);
    if (!updatedApprovers.length)
      setSelectedApprovers((selectedApprovers) => {
        const { [level]: _, ...rest } = selectedApprovers;
        // console.log(rest);
        return rest;
      });
    else
      setSelectedApprovers({ ...selectedApprovers, [level]: updatedApprovers });
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
    const approversArr = [];

    for (const level in selectedApprovers) {
      let obj = {};
      if (Object.hasOwn(selectedApprovers, level)) obj.level = level;
      obj.approvers = selectedApprovers[level].map((s) => {
        return { approverId: s._id };
      });
      approversArr.push(obj);
    }

    // console.log(approversArr);

    const data = await PRService.createPR(title, description, approversArr);

    if (data && data.success) {
      handleClose();
      toast({
        title: "PullRequest Created Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/my-prs");
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
              placeholder="Set Approver Level"
              type="number"
              mb={3}
              onChange={(e) => setApproverLevel(e.target.value)}
            />
            <Input
              placeholder="Add Approvers by Username/Email"
              mb={1}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Box w="100%" display="flex" flexWrap="wrap">
              {Object.keys(selectedApprovers).map((level) => (
                <Box key={level} w="100%" display="flex" flexWrap="wrap">
                  <Text bgColor={"cyan"} p={1} m={1} rounded={4}>
                    {" "}
                    {`Level ${level}`}{" "}
                  </Text>
                  {selectedApprovers[level].map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u, level)}
                    />
                  ))}
                </Box>
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
                    handleFunction={() => handleApprovers(user, approverLevel)}
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
