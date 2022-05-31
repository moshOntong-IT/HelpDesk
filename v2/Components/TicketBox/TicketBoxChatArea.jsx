import { Avatar, Box, VStack, Text, Container, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useTickets } from "../Context/TicketContext";
import TicketBoxChat, { TicketChatSkeleton } from "./TicketBoxChat";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useComments } from "../../../utils/hooks/customHooks";

function TicketBoxChatArea() {
  const { id } = useParams();
  const { fetchComments, comments, isLoading, isError } = useComments();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  useEffect(() => {
    fetchComments(id);
  }, []);

  const scrollToBottom = useMemo(() => {
    return () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  }, [comments]);

  // useEffect(() => {
  //   if (comments.length > 0) {
  //     const { ticket } = comments[0];
  //     // const { id } = selectedTicket;
  //     // console.log(ticket.id == params.id);
  //     if (ticket.id == params.id) {
  //       setNewComments(comments);
  //     }
  //   }
  // }, [comments]);

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
      {isLoading && (
        <>
          <TicketChatSkeleton isOwner={true} />
          <TicketChatSkeleton isOwner={false} />
          <TicketChatSkeleton isOwner={true} />
        </>
      )}
      {!isLoading &&
        comments.map((data, index) => {
          const { text, replyBy, isOwner } = data;

          return (
            <TicketBoxChat
              isOwner={isOwner}
              key={index}
              chat={text}
              name={replyBy}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </VStack>
  );
}

export default TicketBoxChatArea;
