import React from "react";
import {
  Flex,
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Center,
  Button,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

function TicketBoxHeader() {
  return (
    <Flex
      w="full"
      h="15%"
      borderBottomColor="whiteAlpha.200"
      borderBottomWidth="1px"
      color="white"
    >
      <VStack flex="1 0 auto">
        <Heading w="full" fontSize="1.5rem">
          This is a little ticket chuchu
        </Heading>
        <HStack
          spacing="50px"
          w="full"
          fontSize="0.8rem"
          //   justifyContent="space-evenly"
          color="whiteAlpha.700"
        >
          <Text>Muslimin Ontong</Text>
          <HStack>
            <TimeIcon /> <Text>August 3, 2020 8:00 PM</Text>
          </HStack>
        </HStack>
      </VStack>
      <Center flex="0 0 30%">
        <Button colorScheme="red" size="lg" w="60%">
          Closed
        </Button>
      </Center>
    </Flex>
  );
}

export default TicketBoxHeader;
