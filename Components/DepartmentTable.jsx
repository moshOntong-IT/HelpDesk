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
import DepartmentTableItem from "./DepartmentTableItem";
import TableSkeleton from "./TableSkeleton";
function DepartmentTable() {
  const { data, isError, isLoading, isSuccess } = useQuery(
    "departments",
    getDepartments
  );
  return (
    <Box h="90%" w="full">
      <TableContainer overflowY="auto" maxH="450px">
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Departments</TableCaption>
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Name</Th>
              <Th> Description</Th>
              <Th> Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <TableSkeleton row={Array(4).fill(1)} column={Array(4).fill(1)} />
            )}
            {isSuccess &&
              data.map((value, index) => {
                return <DepartmentTableItem data={value} key={index} />;
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
async function getDepartments() {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/departments"
  );

  return data;
}
export default DepartmentTable;
