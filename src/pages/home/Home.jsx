import { Box, Link, Text, Center, VStack, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link as ReactLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Components/AuthProvider";
import HomeNav from "../../../Components/HomeNav";
import Navbar from "../../../v2/Components/Navbar/Navbar";
import NavHeader from "../../../v2/Components/Navbar/NavHeader";
import TicketBox from "../../../v2/Components/TicketBox/TicketBox";
import TicketList from "../../../v2/Components/TicketList/TicketList";

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
      <Flex h="100vh">
        <Flex flex="2" h="full">
          <Navbar />
          <TicketList />
        </Flex>
        <Flex flex="5" h="full">
          <Flex w="full" h="full" flexDirection="column">
            <NavHeader />
            <TicketBox />
          </Flex>
        </Flex>
      </Flex>
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
