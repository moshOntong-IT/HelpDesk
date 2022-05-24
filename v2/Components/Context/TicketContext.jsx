import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";

const TicketsContext = createContext();

export function useTickets() {
  return useContext(TicketsContext);
}

function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState();
  const [isLoading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const ticket = tickets.find(({ id }) => {
  //       return id === selectedTicket;
  //     });

  //     setTicket[ticket];
  //     // console.log(ticket);
  //   }, [selectedTicket]);

  useEffect(() => {
    const socket = io("ws://localhost:5000");

    socket.on("connnection", () => {
      console.log("connected to server");
    });

    socket.on("add-ticket", (newTicket) => {
      setTickets(newTicket);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, []);
  const value = {
    tickets,
    setTickets,
    selectedTicket,
    setSelectedTicket,
    isLoading,
    setLoading,
  };
  return (
    <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
  );
}

export default TicketProvider;
