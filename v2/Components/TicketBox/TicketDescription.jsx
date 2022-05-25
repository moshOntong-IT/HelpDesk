import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Heading,
  Text,
  HStack,
  Box,
  Badge,
} from "@chakra-ui/react";
import TimeDiff from "js-time-diff";
function TicketDescription({ isOpen, onClose, data }) {
  const { id, subject, ticketUuid, user, status, createdAt, description } =
    data;
  const { firstName, lastName } = user;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              <Heading w="full" fontSize="1.5rem">
                {subject + " "}
                <Badge
                  colorScheme={
                    status === "Pending"
                      ? "orange"
                      : status === "Answered"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </Badge>
              </Heading>
              <HStack w="full" alignItems="baseline" justifyContent="">
                <Text as="strong" fontSize="1rem">
                  {firstName + " " + lastName}
                </Text>
                <Text as="strong" fontSize="0.8rem">
                  ({TimeDiff(createdAt)})
                </Text>
              </HStack>
              <Text fontSize="0.8rem" w="full">
                {ticketUuid}
              </Text>
              <Box w="full" rounded="md" p="10px">
                <Text>{description}</Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TicketDescription;
