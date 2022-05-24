import React from "react";
import {
  Box,
  Flex,
  VStack,
  Center,
  Text,
  Heading,
  Badge,
} from "@chakra-ui/react";
function TicketList() {
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
          {Array(8)
            .fill(1)
            .map((_, index) => {
              return (
                <Box
                  cursor="pointer"
                  w="full"
                  maxWidth="280px"
                  bg="whiteAlpha.200"
                  p="10px"
                  rounded="md"
                  key={index}
                  color="white"
                >
                  <Text
                    noOfLines="1"
                    as="strong"
                    fontSize="1.3rem"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    This is a title of ticket try to ellipsis
                  </Text>
                  <Badge
                    //   colorScheme={
                    //     status === "Pending"
                    //       ? "orange"
                    //       : status === "Answered"
                    //       ? "green"
                    //       : "red"
                    //   }
                    colorScheme="orange"
                  >
                    Pending
                  </Badge>

                  <Flex
                    justifyContent="space-between"
                    w="full"
                    color="whiteAlpha.800"
                    fontSize="0.8rem"
                  >
                    <Text>Mosh Ontong</Text>
                    <Text>2 seconds ago</Text>
                  </Flex>
                </Box>
              );
            })}
        </VStack>
      </VStack>
    </Box>
  );
}

export default TicketList;
