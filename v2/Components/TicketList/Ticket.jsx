import React from "react";
import {
  Box,
  Text,
  Badge,
  Flex,
  VStack,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import TimeDiff from "js-time-diff";
import { useTickets } from "../Context/TicketContext";
import { Link } from "react-router-dom";
function Ticket({ ticket }) {
  const { createdAt, subject, status, ticketUuid, user, id } = ticket;

  const { firstName, lastName } = user;
  const { setSelectedTicket } = useTickets();
  return (
    <Link
      to={`/home/helpdesk/${id}`}
      style={{ maxWidth: "280px", width: "100%" }}
    >
      <VStack
        align="left"
        onClick={() => {
          // navigate("home/2");
          setSelectedTicket(ticket);
        }}
        cursor="pointer"
        w="full"
        maxWidth="280px"
        bg="whiteAlpha.200"
        p="10px"
        rounded="md"
        color="white"
      >
        <Text
          noOfLines="1"
          as="strong"
          fontSize="1rem"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {subject}
        </Text>
        <Badge
          colorScheme={
            status === "Pending"
              ? "orange"
              : status === "Answered"
              ? "green"
              : "red"
          }
          // colorScheme="orange"
        >
          {status}
        </Badge>

        <Flex
          justifyContent="space-between"
          w="full"
          color="whiteAlpha.800"
          fontSize="0.8rem"
        >
          <Text>{firstName + " " + lastName}</Text>
          <Text>{TimeDiff(createdAt)}</Text>
        </Flex>
      </VStack>
    </Link>
  );
}

export const TicketSkeleton = () => {
  return (
    <VStack
      w="full"
      maxWidth="280px"
      bg="whiteAlpha.200"
      p="10px"
      h="100px"
      rounded="md"
      color="white"
    >
      <Skeleton w="full" h="20px" rounded="lg" />
      <Skeleton w="full" h="10px" rounded="lg" />
      <HStack w="full">
        <Skeleton w="full" h="10px" rounded="lg" />
        <Skeleton w="full" h="10px" rounded="lg" />
      </HStack>
    </VStack>
  );
};

export default Ticket;
