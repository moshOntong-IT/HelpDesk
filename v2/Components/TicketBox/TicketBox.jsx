import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import TicketReplyForm from "./TicketReplyForm";
import TicketBoxHeader from "./TicketBoxHeader";
import TicketBoxChatArea from "./TicketBoxChatArea";
import { useTickets } from "../Context/TicketContext";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../Components/AuthProvider";
// import { useParams } from "react-router-dom";

function TicketBox() {
  const { isLoading, selectedTicket, tickets } = useTickets();
  const navigate = useNavigate();
  // const { userState } = useAuth();
  // const path = useParams();
  // console.log(path);
  useEffect(() => {
    console.log("Asas");
    if (selectedTicket === undefined) {
      navigate("/home");
    }
  }, []);

  return (
    <Flex w="full" h="full" flexDirection="column">
      {selectedTicket != undefined && (
        <>
          <Box flex="1 0 auto" maxH="75vh">
            <TicketBoxHeader ticket={selectedTicket} />
            <TicketBoxChatArea />
          </Box>
          <TicketReplyForm />
        </>
      )}
    </Flex>
  );
}

//TODO use the params to fetch the comments and the tickets
export default TicketBox;
