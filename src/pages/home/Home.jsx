import { Box, Link, Text, Center, VStack, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link as ReactLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Components/AuthProvider";

function Home() {
  const { userState } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) {
      navigate("/login");
    }
  }, []);
  // console.log("running");
  return (
    <Box h="100vh" bgColor="gray.800" overflow="hidden" position="relative">
      <Outlet />
      {/* <Box
        position="absolute"
        right="0"
        bottom="0"
        w="75%"
        h="90vh"
        bg="whiteAlpha.50"
      ></Box> */}
      {/* <Center w="100%" h="100%">
        <Box w="65%" h="90%">
          <VStack w="100%" h="100%">
            <HomeNav />
            <Box w="100%" h="100%" bg="white" boxShadow="xl" rounded="30px">
              <Outlet />
            </Box>
          </VStack>
        </Box>
      </Center> */}
    </Box>
  );
}

export default Home;
