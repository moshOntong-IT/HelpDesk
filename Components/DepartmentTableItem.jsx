import React from "react";
import {
  HStack,
  Td,
  Text,
  Tr,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import DepartmentModal from "./DepartmentModal";
import DepartmentForm from "./DepartmentForm";

function DepartmentTableItem({ data }) {
  const { id, name, description } = data;

  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(deleteDepartment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("departments");
    },
  });
  return (
    <>
      <Tr>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td maxW="200px" overflow="hidden">
          {description}
        </Td>
        <Td>
          <Actions
            id={id}
            onDelete={mutate}
            isLoading={isLoading}
            data={data}
          />
        </Td>
      </Tr>
    </>
  );
}
const Actions = ({ id, onDelete, isLoading, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();
  return (
    <HStack>
      <Button size="sm" colorScheme="teal" onClick={onOpen}>
        View
      </Button>
      <Button size="sm" colorScheme="green" onClick={editOnOpen}>
        Edit
      </Button>
      <Button
        isLoading={isLoading}
        size="sm"
        colorScheme="red"
        onClick={() => {
          onDelete({ id });
        }}
      >
        Delete
      </Button>
      <DepartmentModal isOpen={isOpen} onClose={onClose} data={data} />
      <DepartmentForm isOpen={editIsOpen} onClose={editOnClose} data={data} />
    </HStack>
  );
};

async function deleteDepartment(value) {
  const { id } = value;
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/delete/department/${id}`,
    {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    }
  );
}
export default DepartmentTableItem;
