import React, { memo, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import TicketReplyForm from "./TicketReplyForm";
import TicketBoxHeader from "./TicketBoxHeader";
import TicketBoxChatArea from "./TicketBoxChatArea";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../Components/AuthProvider";
import { useParams } from "react-router-dom";
import { useTicket } from "../../../utils/hooks/customHooks";

function TicketBox() {
  const navigate = useNavigate();
  const path = useParams();
  const [counter, setCounter] = useState(0);
  const { ticket, isLoading, fetchTicket } = useTicket();

  useEffect(() => {
    fetchTicket({ $id: path.id });
    // console.log("render");
    // setCounter(counter + 1);
    // console.log(counter);
    // console.log(path);
    // console.log("fetching");
  }, [path.id]);
  // console.log(isLoading);
  return (
    <Flex w="full" h="full" flexDirection="column">
      {!isLoading && (
        <>
          <Box flex="1 0 auto" maxH="75vh">
            <TicketBoxHeader ticket={ticket} />
            <TicketBoxChatArea />
          </Box>
          <TicketReplyForm status={ticket.status} />
        </>
      )}
    </Flex>
  );
}

export const TicketMemoBox = memo(TicketBox);
