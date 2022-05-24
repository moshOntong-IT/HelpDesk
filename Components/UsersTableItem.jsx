import { HStack, Td, Text, Tr, Box, Button } from "@chakra-ui/react";
import React from "react";
import TimeDiff from "js-time-diff";

function UsersTableItem({ data }) {
  const {
    id,
    username,
    firstName,
    lastName,
    email,
    role,
    department,
    createdAt,
  } = data;

  const { name: depName } = department;
  const { name: rolName } = role;
  return (
    <>
      <Tr>
        <Td>{id}</Td>
        <Td>{username}</Td>
        <Td>{firstName + " " + lastName}</Td>
        <Td>{email}</Td>
        <Td>{rolName}</Td>
        <Td>{depName}</Td>
        <Td>{TimeDiff(createdAt)}</Td>
        <Td>
          <Actions />
        </Td>
      </Tr>
    </>
  );
}

const Actions = () => {
  return (
    <HStack>
      <Button size="sm" colorScheme="teal">
        View
      </Button>
      <Button size="sm" colorScheme="green">
        Edit
      </Button>
      <Button size="sm" colorScheme="red">
        Delete
      </Button>
    </HStack>
  );
};

export default UsersTableItem;
