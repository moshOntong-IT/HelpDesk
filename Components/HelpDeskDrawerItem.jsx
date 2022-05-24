import { Box, Text, Center } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function HelpDeskDrawerItem({ text, path }) {
  return (
    // bg="white" rounded="10px"
    <Link to={path} style={{ height: "50px", width: "100%" }}>
      <Center h="full" w="full%" cursor="pointer">
        <Text w="full" h="full" color="white" fontWeight="semibold">
          {text}
        </Text>
      </Center>
    </Link>
  );
}

export default HelpDeskDrawerItem;
