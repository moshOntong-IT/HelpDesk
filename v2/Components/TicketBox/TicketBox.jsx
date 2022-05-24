import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import TicketReplyForm from "./TicketReplyForm";
import TicketBoxHeader from "./TicketBoxHeader";
import TicketBoxChatArea from "./TicketBoxChatArea";

function TicketBox() {
  return (
    <Box flex="5" bg="whiteAlpha.200" borderTopLeftRadius="3xl" p="20px">
      <Flex w="full" h="full" flexDirection="column">
        <Box flex="1 0 auto">
          <TicketBoxHeader />
          <TicketBoxChatArea />
        </Box>

        <TicketReplyForm />
      </Flex>
    </Box>
  );
}

export default TicketBox;
