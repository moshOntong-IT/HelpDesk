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
import { useQuery, useQueryClient } from "react-query";

import { TicketMemo, TicketSkeleton } from "./Ticket";
import { useTickets } from "../../../utils/hooks/customHooks";
import { useNavigate } from "react-router-dom";

function TicketList() {
  const { isLoading, tickets, setTickets } = useTickets();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getTickets = async () => {
  //     const { data } = await axios.get(
  //       import.meta.env.VITE_API_URL + "/api/tickets"
  //     );
  //     // console.log(typeof data);
  //     setTickets(data);
  //     setSelectedTicket(data[0]);
  //     setLoading(false);

  //     // console.log(tickets);
  //   };

  //   getTickets();
  // }, []);

  // console.log(tickets);
  // useEffect(() => {
  //   const unsubscribe = api
  //     .provider()
  //     .subscribe(
  //       `collections.${AppWriteConfig.ticketsID}.documents`,
  //       (data) => {
  //         setTickets((prevTickets) => [...prevTickets, data.payload]);
  //       }
  //     );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    if (tickets != undefined && tickets.length > 0) {
      navigate("/home/helpdesk/" + tickets[0].$id);
    }
  }, [isLoading]);

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
          {!isLoading && tickets.length <= 0 && (
            <Center w="full" h="full">
              <Text color="white">No tickets</Text>
            </Center>
          )}
          {isLoading &&
            Array(3)
              .fill(1)
              .map((_, index) => {
                return <TicketSkeleton key={index} />;
              })}
          {!isLoading &&
            tickets.map((ticket, index) => {
              return <TicketMemo ticket={ticket} key={index} />;
            })}
        </VStack>
      </VStack>
    </Box>
  );
}
export default TicketList;
