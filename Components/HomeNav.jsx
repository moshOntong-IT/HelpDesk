import React from "react";
import { Box, HStack, Link, Text, Flex, Button } from "@chakra-ui/react";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
const NavLink = ({ text }) => (
  <Link as="li" listStyleType="none">
    <Text fontSize="" fontWeight="bold">
      {text}
    </Text>
  </Link>
);
function HomeNav() {
  // const locationPath = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  // console.log(locationPath);
  return (
    <Box w="100%" px="10px">
      <Flex w="100%" justify="space-between">
        <HStack spacing="20px">
          <ReactLink to="helpdesk">
            <NavLink text="Help Desk" />
          </ReactLink>
          <ReactLink to="profile">
            <NavLink text="Profile" />
          </ReactLink>
        </HStack>
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => {
            logout();
            navigate("login");
          }}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
}

export default HomeNav;
