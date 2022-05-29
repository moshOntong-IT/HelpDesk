import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Box, Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import AddTicket from "../../../Components/AddTicket";
import { useAuth } from "../../../utils/hooks/customHooks";
function NavHeader() {
  // const { id } = userState;

  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      w="full"
      flex="0 0 auto"
      minH="80px"
      alignItems="center"
      justify="right"
      px="50px"
    >
      <Button
        leftIcon={<AddIcon />}
        onClick={onOpen}
        colorScheme="facebook"
        mr="20px"
      >
        Add Ticket
      </Button>
      <Button
        leftIcon={<FiLogOut />}
        isLoading={isLoading}
        colorScheme="red"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
      <AddTicket isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default NavHeader;
