import React from "react";
import { Box, Text, Badge, Flex, VStack } from "@chakra-ui/react";
import TimeDiff from "js-time-diff";
function Ticket({ status, subject, name, date }) {
  return (
    <VStack
      align="left"
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
        <Text>{name}</Text>
        <Text>{TimeDiff(date)}</Text>
      </Flex>
    </VStack>
  );
}

const TicketSkeleton = () => {
  return (
    <Box
      w="full"
      maxWidth="280px"
      bg="whiteAlpha.200"
      p="10px"
      rounded="md"
      color="white"
    ></Box>
  );
};

export default Ticket;