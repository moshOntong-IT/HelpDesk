import { Avatar, Box, VStack, Text, Container, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useTickets } from "../Context/TicketContext";
import TicketBoxChat from "./TicketBoxChat";
import axios from "axios";
import { useAuth } from "../../../Components/AuthProvider";
import { useSocket } from "../Context/SocketProvider";
import { useParams } from "react-router-dom";

function TicketBoxChatArea() {
  const { selectedTicket, comments, setComments } = useTickets();
  const [newComments, setNewComments] = useState([]);
  const params = useParams();
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
  }, [setNewComments]);

  useEffect(() => {
    if (comments.length > 0) {
      const { ticket } = comments[0];
      // const { id } = selectedTicket;
      // console.log(ticket.id == params.id);
      if (ticket.id == params.id) {
        setNewComments(comments);
      }
    }
  }, [comments]);

  ///ADD
  useEffect(() => {
    socket.on("add-comment", (newComment) => {
      setComments(newComment);
      // console.log(ticket.id + " " + id);
      // if (ticket.id === id) {
      //   setComments(newComment);
      // }
      // if (comments != undefined) {
      //   if (comments[0].user.id === id) {
      //     setComments(newComment);
      //   }
      // }
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

      setNewComments(data);

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
      {newComments.map((data, index) => {
        const { user, reply } = data;
        const { firstName, lastName, id } = user;
        return (
          <TicketBoxChat
            isOwner={id === userState.id}
            key={index}
            chat={reply}
            name={firstName + " " + lastName}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </VStack>
  );
}

export default TicketBoxChatArea;
