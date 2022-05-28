import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import AddTicket from "../../../Components/AddTicket";
function NavHeader() {
  const { userState, logout } = useAuth();
  // const { id } = userState;
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
