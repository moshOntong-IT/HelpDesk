import React from "react";
import { Flex, Avatar, Box, Text } from "@chakra-ui/react";
function TicketBoxChat({ isOwner, chat, name }) {
  return (
    <Flex w="full" justifyContent={isOwner ? "right" : "left"}>
      <Flex
        bg="gray.400"
        p="10px"
        rounded="lg"
        flexDirection={!isOwner ? "row" : "row-reverse"}
      >
        <Avatar name={name} />
        <Text mx="10px">{chat}</Text>
      </Flex>
    </Flex>
  );
}

export default TicketBoxChat;
