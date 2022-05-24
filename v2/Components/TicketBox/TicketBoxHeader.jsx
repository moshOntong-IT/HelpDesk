import React, { useEffect } from "react";
import {
  Flex,
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Center,
  Button,
} from "@chakra-ui/react";
import { InfoIcon, TimeIcon } from "@chakra-ui/icons";
import { useTickets } from "../Context/TicketContext";

function TicketBoxHeader({ ticket }) {
  // const { ticket, selectedTicket } = useTickets();
  const { user, createdAt, subject } = ticket;
  const { firstName, lastName, department } = user;
  const { name } = department;

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
          <Text>{firstName + " " + lastName}</Text>
          <HStack>
            <TimeIcon /> <Text>{createdAt}</Text>
          </HStack>
          <HStack>
            <InfoIcon /> <Text>{name}</Text>
          </HStack>
        </HStack>
      </VStack>
      <Center flex="0 0 30%">
        <Button colorScheme="red" size="lg" w="60%">
          Closed
        </Button>
      </Center>
    </Flex>
  );
}

export default TicketBoxHeader;
