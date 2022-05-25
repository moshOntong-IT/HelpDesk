import { Avatar, Box, VStack, Text, Container, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useTickets } from "../Context/TicketContext";
import TicketBoxChat from "./TicketBoxChat";
import axios from "axios";
import { useAuth } from "../../../Components/AuthProvider";
import { useSocket } from "../Context/SocketProvider";

function TicketBoxChatArea() {
  const { selectedTicket, comments, setComments } = useTickets();
  const { userState } = useAuth();
  const messagesEndRef = useRef(null);
  const { socket } = useSocket();

  useEffect(() => {
    // console.log("changed");
  }, [selectedTicket]);
  useEffect(() => {
    scrollToBottom();
  });
  const scrollToBottom = useMemo(() => {
    return () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  }, [setComments]);

  useEffect(() => {
    socket.on("add-comment", (newComment) => {
      setComments(newComment);
    });

    return () => {
      socket.off("add-comment", (newCommnet) => {
        console.log("unmount");
      });
    };
  }, []);
  useEffect(() => {
    // const [_, id] = queryKey;

    const getAllComments = async () => {
      const { id } = selectedTicket;
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tickets/comments/${id}`
      );

      setComments(data);

      // console.log(isOwner);
    };

    getAllComments();
  }, [selectedTicket]);

  return (
    <VStack
      py="10px"
      h="85%"
      maxH="500px"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "white",
          borderRadius: "24px",
        },
      }}
      spacing="20px"
    >
      {comments.map((data, index) => {
        const { user } = data;
        const { id } = user;
        return <TicketBoxChat isOwner={id === userState.id} key={index} />;
      })}
      <div ref={messagesEndRef} />
    </VStack>
  );
}

export default TicketBoxChatArea;
