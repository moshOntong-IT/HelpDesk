import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import React from "react";
import { HiPlusSm } from "react-icons/hi";

import UsersTable from "../../../../Components/UsersTable";
function Users() {
  return (
    <Flex flexDirection="column" h="full" w="full">
      <Box h="10%" w="full">
        <Flex h="full" w="full" justify="space-between">
          <Heading fontSize="1.5rem">Users</Heading>
          <Button colorScheme="teal" leftIcon={<HiPlusSm />} size="sm">
            Add Users
          </Button>
        </Flex>
      </Box>
      <UsersTable />
    </Flex>
  );
}

export default Users;
