import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Center,
  Text,
  Heading,
  Badge,
} from "@chakra-ui/react";

import axios from "axios";
import { useQuery } from "react-query";

import { io } from "socket.io-client";
import Ticket from "./Ticket";
function TicketList() {
  const [tickets, setTickets] = useState();
  const [isLoading, setLoading] = useState(true);
  // const { data, refetch, isLoading, isSuccess } = useQuery(
  //   "tickets",
  //   getTickets,
  //   {
  //     enabled: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  useEffect(() => {
    const getTickets = async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "/api/tickets"
      );
      // console.log(typeof data);
      setTickets(data);
      setLoading(false);

      // console.log(tickets);
    };

    getTickets();
  }, []);

  useEffect(() => {
    const socket = io("ws://localhost:5000");

    socket.on("connnection", () => {
      console.log("connected to server");
    });

    socket.on("add-ticket", (newTicket) => {
      setTickets(newTicket);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, []);

  console.log(tickets);

  return (
    <Box flex="1 0 auto" minW="100px">
      <VStack h="full" w="full" spacing="20px">
        <Box
          h="20%"
          w="full"
          borderBottomWidth="2px"
          borderBottomColor="whiteAlpha.200"
        >
          <Center h="full" w="full">
            <Heading
              fontSize={{ lg: "2rem", md: "1.5rem", sm: "1rem" }}
              color="white"
            >
              Help Desk
            </Heading>
          </Center>
        </Box>
        <VStack
          h="80%"
          maxWidth="280px"
          w={{ lg: "full", md: "280px", sm: "100px" }}
          overflow="auto"
          px="10px"
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
        >
          {isLoading && <Text color="white">Loading</Text>}
          {!isLoading &&
            tickets.map(
              ({ createdAt, subject, status, ticketUuid, user }, index) => {
                const { firstName, lastName } = user;
                return (
                  <Ticket
                    status={status}
                    key={index}
                    date={createdAt}
                    subject={subject}
                    name={firstName + " " + lastName}
                  />
                );
              }
            )}
        </VStack>
      </VStack>
    </Box>
  );
}

async function getTickets() {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/tickets"
  );
  // console.log(typeof data);
  return data;
}
export default TicketList;
