import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import TicketReplyForm from "./TicketReplyForm";
import TicketBoxHeader from "./TicketBoxHeader";
import TicketBoxChatArea from "./TicketBoxChatArea";
import { useTickets } from "../Context/TicketContext";
import { useAuth } from "../../../Components/AuthProvider";
import { useParams } from "react-router-dom";

function TicketBox() {
  // const { isLoading, selectedTicket, tickets } = useTickets();
  // const { userState } = useAuth();
  const path = useParams();
  console.log(path);

  return (
    <Flex w="full" h="full" flexDirection="column">
      <Box flex="1 0 auto" maxH="75vh">
        {/* <TicketBoxHeader ticket={selectedTicket} />
      <TicketBoxChatArea /> */}
      </Box>

      {/* <TicketReplyForm /> */}
    </Flex>
  );
}

export default TicketBox;
