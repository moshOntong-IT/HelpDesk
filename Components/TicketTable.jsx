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
import TicketTableItem from "./TicketTableItem";
import TableSkeleton from "./TableSkeleton";
function TicketTable() {
  const { data, isError, isLoading, isSuccess } = useQuery(
    "tickets",
    getTickets
  );
  // console.log(data);
  return (
    <Box h="90%" w="full">
      <TableContainer overflowY="auto" maxH="450px">
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Help Desk Tickets</TableCaption>
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Ticket ID</Th>
              <Th> Status</Th>
              <Th> Subject</Th>
              <Th> Department</Th>
              <Th> Created By</Th>
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
                return <TicketTableItem data={value} key={index} />;
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
async function getTickets() {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/tickets"
  );
  // console.log(typeof data);
  return data;
}
export default TicketTable;
