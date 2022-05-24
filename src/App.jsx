import "./App.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import { Box, Text } from "@chakra-ui/react";

import HelpDesk from "./pages/home/helpdesk/HelpDesk";
import Profile from "./pages/home/Profile";
import Tickets from "./pages/home/helpdesk/Tickets";
import Departments from "./pages/home/helpdesk/Departments";
import Users from "./pages/home/helpdesk/Users";

// async function getDepartments() {
//   const { data } = await axios.get("/api/comments");

//   return data;
// }

function App() {
  return (
    <Box>
      {/* <Text>Header</Text> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />}>
          {/* <Route index element={<Navigate to="helpdesk" replace />} />
          <Route path="helpdesk" element={<HelpDesk />}>
            <Route index element={<Tickets />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="departments" element={<Departments />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="profile" element={<Profile />} /> */}
        </Route>
        <Route path="login" element={<Login />}></Route>

        <Route path="*" element={<Navigate to="home" replace />}></Route>
      </Routes>
    </Box>
  );
}
// function App() {
//   const { data, isLoading, isError } = useQuery("departments", getDepartments);
//   console.log(data);

//   if (isLoading) {
//     return <div>...Loading</div>;
//   }
//   if (isError) {
//     return <div>Something wrong</div>;
//   }

//   return (
//     <>
//       <div>Departments</div>
//       {data.map((value, index) => {
//         return (
//           <li key={index}>
//             {value.subject} : <strong>{value.ticketUuid}</strong>
//           </li>
//         );
//       })}
//     </>
//   );
// }

export default App;
