import {
  HStack,
  Td,
  Text,
  Tr,
  Box,
  Button,
  useDisclosure,
  Modal,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import TimeDiff from "js-time-diff";
import TicketModal from "./TicketModal";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function TicketTableItem({ data }) {
  const { id, subject, ticketUuid, user, status, createdAt } = data;
  const { firstName, lastName, department } = user;
  const { name: depName } = department;
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(putTicketStatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("tickets");
    },
  });
  return (
    <>
      <Tr>
        <Td>{id}</Td>
        <Td>{ticketUuid}</Td>
        <Td>
          {
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
          }
        </Td>
        <Td maxW="100px" overflow="hidden">
          <Text textOverflow="ellipsis">{subject}</Text>
        </Td>
        <Td>{depName}</Td>
        <Td>{firstName + " " + lastName}</Td>
        <Td>{TimeDiff(createdAt)}</Td>
        <Td>
          <Actions data={data} action={mutate} isLoading={isLoading} />
        </Td>
      </Tr>
    </>
  );
}

const Actions = ({ data, action, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, status } = data;
  return (
    <>
      <HStack>
        <Button size="sm" colorScheme="teal" onClick={onOpen}>
          View
        </Button>

        <Button
          isLoading={isLoading}
          disabled={status === "Closed"}
          size="sm"
          colorScheme="red"
          onClick={() => {
            action({ id });
          }}
        >
          Closed
        </Button>
      </HStack>

      <TicketModal onClose={onClose} isOpen={isOpen} data={data} />
    </>
  );
};
async function putTicketStatus(value) {
  const { id } = value;
  await axios.put(`${import.meta.env.VITE_API_URL}/api/update/ticket/${id}`, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
  });
}
export default TicketTableItem;
