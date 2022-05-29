import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TicketsContext = createContext();

export function useTickets() {
  return useContext(TicketsContext);
}

//! unused Ticket Provider
function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState();
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  //   useEffect(() => {
  //     const ticket = tickets.find(({ id }) => {
  //       return id === selectedTicket;
  //     });

  //     setTicket[ticket];
  //     // console.log(ticket);
  //   }, [selectedTicket]);

  const value = {
    tickets,
    setTickets,
    selectedTicket,
    setSelectedTicket,
    isLoading,
    setLoading,
    comments,
    setComments,
  };
  return (
    <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
  );
}

export default TicketProvider;
