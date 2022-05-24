import {
  Box,
  Container,
  Flex,
  Skeleton,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";

function TableSkeleton({ row, column }) {
  return (
    <>
      {row.map((_, index) => {
        return (
          <Tr key={index}>
            {column.map((_, indexColumn) => {
              return (
                <Td key={indexColumn}>
                  <Skeleton w="100%" h="30px" rounded="lg" />
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </>
  );
}

export default TableSkeleton;
