import { Box, Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { HiPlusSm } from "react-icons/hi";
import DepartmentTable from "../../../../Components/DepartmentTable";
import DepartmentForm from "../../../../Components/DepartmentForm";
function Departments() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex flexDirection="column" h="full" w="full">
        <Box h="10%" w="full">
          <Flex h="full" w="full" justify="space-between">
            <Heading fontSize="1.5rem">Departments</Heading>
            <Button
              colorScheme="teal"
              leftIcon={<HiPlusSm />}
              size="sm"
              onClick={onOpen}
            >
              Add Department
            </Button>
          </Flex>
        </Box>
        <DepartmentTable />
      </Flex>

      <DepartmentForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Departments;
