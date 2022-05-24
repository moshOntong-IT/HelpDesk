import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";

import UsersTableItem from "./UsersTableItem";
import TableSkeleton from "./TableSkeleton";

function UsersTable() {
  const { data, isError, isLoading, isSuccess } = useQuery("users", getUsers);
  return (
    <Box h="90%" w="full">
      <TableContainer overflowY="auto" maxH="450px">
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Users</TableCaption>
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Username</Th>
              <Th> Name</Th>
              <Th> Email</Th>
              <Th> Role</Th>
              <Th> Department</Th>
              <Th> Created</Th>
              <Th> Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <TableSkeleton row={Array(4).fill(1)} column={Array(8).fill(1)} />
            )}
            {isSuccess &&
              data.map((value, index) => {
                return <UsersTableItem data={value} key={index} />;
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
async function getUsers() {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + "/api/users");

  return data;
}
export default UsersTable;
