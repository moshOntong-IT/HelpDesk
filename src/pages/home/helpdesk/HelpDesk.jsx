import React from "react";
import { Box, Link, Text, Center, VStack, Flex } from "@chakra-ui/react";
import HelpDeskDrawerItem from "../../../../Components/HelpDeskDrawerItem";
import { Outlet } from "react-router-dom";

import Navbar from "../../../../v2/Components/Navbar/Navbar";
import NavHeader from "../../../../v2/Components/Navbar/NavHeader";

import TicketList from "../../../../v2/Components/TicketList/TicketList";
function HelpDesk() {
  return (
    <Flex h="100vh">
      <Flex flex="2" h="full">
        <Navbar />
        <TicketList />
      </Flex>
      <Flex flex="5" h="full">
        <Flex w="full" h="full" flexDirection="column">
          <NavHeader />
          {/* <TicketBox /> */}
          <Box flex="5" bg="whiteAlpha.200" borderTopLeftRadius="3xl" p="20px">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default HelpDesk;
{
  /* <Flex w="full" h="full">
  <Box h="full" w="30%" bg="gray.900" borderLeftRadius="30px">
    <VStack w="full" h="full" spacing="25px" p="30px">
      <HelpDeskDrawerItem text="Tickets" path="tickets" />
      <HelpDeskDrawerItem text="Departments" path="departments" />
      <HelpDeskDrawerItem text="Users" path="users" />
    </VStack>
  </Box>
  <Box p="15px" w="70%" h="100%">
    <Outlet />
  </Box>
</Flex>; */
}
