import React from "react";
import {
  Flex,
  Avatar,
  Box,
  Text,
  SkeletonCircle,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
function TicketBoxChat({ isOwner, chat, name }) {
  return (
    <Flex w="full" justifyContent={isOwner ? "right" : "left"}>
      <Flex
        bg="gray.400"
        p="10px"
        rounded="lg"
        flexDirection={!isOwner ? "row" : "row-reverse"}
      >
        <Avatar name={name} />
        <Text mx="10px">{chat}</Text>
      </Flex>
    </Flex>
  );
}

export const TicketChatSkeleton = ({ isOwner }) => {
  return (
    <Flex w="full" h="100px" justifyContent={isOwner ? "right" : "left"}>
      <Flex
        bg="gray.400"
        p="10px"
        rounded="lg"
        flexDirection={!isOwner ? "row" : "row-reverse"}
      >
        <SkeletonCircle w="50px" h="50px" />
        <VStack mx="10px" w="300px" h="full">
          <Skeleton w="full" h="10px" rounded="lg" />
          <Skeleton w="full" h="10px" rounded="lg" />
          <Skeleton w="full" h="10px" rounded="lg" />
          <Skeleton w="full" h="10px" rounded="lg" />
        </VStack>
      </Flex>
    </Flex>
  );
};

export default TicketBoxChat;
