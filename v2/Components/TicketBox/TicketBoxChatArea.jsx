import { Avatar, Box, VStack, Text, Container, Flex } from "@chakra-ui/react";
import React from "react";
import TicketBoxChat from "./TicketBoxChat";

function TicketBoxChatArea() {
  return (
    <VStack
      py="10px"
      h="85%"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "white",
          borderRadius: "24px",
        },
      }}
      spacing="20px"
    >
      <TicketBoxChat isOwner={false} />
      <TicketBoxChat isOwner={true} />
      <TicketBoxChat isOwner={false} />
      <TicketBoxChat isOwner={false} />
    </VStack>
  );
}

export default TicketBoxChatArea;
