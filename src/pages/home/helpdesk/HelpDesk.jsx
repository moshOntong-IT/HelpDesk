import React from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import HelpDeskDrawerItem from "../../../../Components/HelpDeskDrawerItem";
import { Outlet } from "react-router-dom";
function HelpDesk() {
  return <Box w="100%" h="100%"></Box>;
}

export default HelpDesk;
<Flex w="full" h="full">
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
</Flex>;
