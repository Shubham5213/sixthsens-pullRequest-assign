import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius={4}
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.username}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
