import React, { useEffect, useState } from "react";
import {
  Flex,
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Center,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoIcon, TimeIcon } from "@chakra-ui/icons";
import axios from "axios";
import TicketDescription from "./TicketDescription";

function TicketBoxHeader({ ticket }) {
  // const { ticket, selectedTicket } = useTickets();
  const { author, createdAt, subject, status, $id, department } = ticket;
  // const { firstName, lastName, department } = user;
  // const { name } = department;

  const [isClosed, setClosed] = useState(status === "Closed");
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setClosed(status === "Closed");
  }, [ticket]);

  return (
    <Flex
      w="full"
      h="15%"
      borderBottomColor="whiteAlpha.200"
      borderBottomWidth="1px"
      color="white"
    >
      <VStack flex="1 0 auto">
        <Heading w="full" fontSize="1.5rem">
          {subject}
        </Heading>
        <HStack
          spacing="50px"
          w="full"
          fontSize="0.8rem"
          //   justifyContent="space-evenly"
          color="whiteAlpha.700"
        >
          <Text>{author}</Text>
          <HStack>
            <TimeIcon /> <Text>{new Date(createdAt).toDateString()}</Text>
          </HStack>
          <HStack>
            <InfoIcon /> <Text>{department}</Text>
          </HStack>
        </HStack>
      </VStack>
      <Center flex="0 0 40%">
        <Button
          colorScheme="facebook"
          size="lg"
          w="60%"
          onClick={onOpen}
          mr="10px"
        >
          Description
        </Button>
        <Button
          isDisabled={isClosed}
          isLoading={isLoading}
          colorScheme="red"
          size="lg"
          w="60%"
          onClick={putTicketStatus}
        >
          Closed
        </Button>
      </Center>
      <TicketDescription isOpen={isOpen} onClose={onClose} data={ticket} />
    </Flex>
  );
  async function putTicketStatus() {
    setLoading(true);
    await axios
      .put(`${import.meta.env.VITE_API_SOCKET_URL}/api/update/ticket/${id}`, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setLoading(false);
        setClosed(true);

        window.location.reload(false);
      });
  }
}

export default TicketBoxHeader;
