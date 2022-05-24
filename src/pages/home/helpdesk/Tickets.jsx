import { Box, Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { HiPlusSm } from "react-icons/hi";
import AddTicket from "../../../../Components/AddTicket";
import TicketTable from "../../../../Components/TicketTable";
function Tickets() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex flexDirection="column" h="full" w="full">
        <Box h="10%" w="full">
          <Flex h="full" w="full" justify="space-between">
            <Heading fontSize="1.5rem">Tickets</Heading>
            <Button
              colorScheme="teal"
              leftIcon={<HiPlusSm />}
              onClick={onOpen}
              size="sm"
            >
              Add Ticket
            </Button>
          </Flex>
        </Box>
        <TicketTable />
      </Flex>
      <AddTicket isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Tickets;
