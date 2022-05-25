import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import TicketReplyForm from "./TicketReplyForm";
import TicketBoxHeader from "./TicketBoxHeader";
import TicketBoxChatArea from "./TicketBoxChatArea";
import { useTickets } from "../Context/TicketContext";
import { useAuth } from "../../../Components/AuthProvider";

function TicketBox() {
  // const { isLoading, selectedTicket, tickets } = useTickets();
  // const { userState } = useAuth();

  return (
    <Box flex="5" bg="whiteAlpha.200" borderTopLeftRadius="3xl" p="20px">
      {/* {!isLoading && userState && selectedTicket && (
        <Flex w="full" h="full" flexDirection="column">
          <Box flex="1 0 auto" maxH="75vh">
            <TicketBoxHeader ticket={selectedTicket} />
            <TicketBoxChatArea />
          </Box>

          <TicketReplyForm />
        </Flex>
      )} */}
    </Box>
  );
}

export default TicketBox;
