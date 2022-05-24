import { Box, Link, Text, Center, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link as ReactLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Components/AuthProvider";
import HomeNav from "../../../Components/HomeNav";

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
    <Box
      h="100vh"
      bgGradient="linear-gradient(99.87deg, #E2FFE5 6.72%, rgba(255, 255, 255, 0) 99.63%)"
      overflow="hidden"
    >
      <Center w="100%" h="100%">
        <Box w="65%" h="90%">
          <VStack w="100%" h="100%">
            <HomeNav />
            <Box w="100%" h="100%" bg="white" boxShadow="xl" rounded="30px">
              <Outlet />
            </Box>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

export default Home;
