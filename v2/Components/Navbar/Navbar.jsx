import React from "react";
import { FaTicketAlt } from "react-icons/fa";
import { VStack, Box, IconButton, Tooltip } from "@chakra-ui/react";
function Navbar() {
  return (
    <Box
      flex="0 0 auto"
      borderRightWidth="2px"
      borderRightColor="whiteAlpha.200"
      minW="80px"
      py="20px"
      px="10px"
    >
      <VStack w="full" h="full">
        <Tooltip label="Ticket" placement="right">
          <IconButton
            aria-label="Call Segun"
            size="lg"
            colorScheme="facebook"
            icon={<FaTicketAlt />}
          ></IconButton>
        </Tooltip>
      </VStack>
    </Box>
  );
}

export default Navbar;
