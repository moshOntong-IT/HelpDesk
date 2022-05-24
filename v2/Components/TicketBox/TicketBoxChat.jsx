import React from "react";
import { Flex, Avatar, Box, Text } from "@chakra-ui/react";
function TicketBoxChat({ isOwner }) {
  return (
    <Box
      flexDirection={isOwner ? "row" : "row-reverse"}
      position="absolute"
      left={isOwner ? "none" : "0"}
      right={isOwner ? "0" : "none"}
      bg="gray.400"
      p="10px"
      rounded="lg"
    >
      <Flex>
        <Avatar name="Muslimin Ontong" />
        <Text ml="10px">
          HELo aisdsiadsjiiaodjsaoidj asodjasoijdaio djasoi jdasi d
        </Text>
      </Flex>
    </Box>
  );
}

export default TicketBoxChat;
