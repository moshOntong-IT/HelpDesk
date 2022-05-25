import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { makeServer } from "../utils/mockup/server";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../Components/AuthProvider";
import theme from "../utils/theme";
import TicketProvider from "../v2/Components/Context/TicketContext";
import SocketProvider from "../v2/Components/Context/SocketProvider";

const apiURL = import.meta.env.VITE_API_URL;
// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" });
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <AuthProvider>
          <TicketProvider>
            <BrowserRouter>
              <ChakraProvider theme={theme}>
                <App />
              </ChakraProvider>
            </BrowserRouter>
          </TicketProvider>
        </AuthProvider>
      </SocketProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
