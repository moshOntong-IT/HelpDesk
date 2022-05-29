import { Query } from "appwrite";
import { useEffect, useState } from "react";
import api from "../../src/api/appwrite";
import { AppWriteConfig } from "../config";
import useAccount from "../zustand/account";

const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const setAccount = useAccount((state) => state.setAccount);
  const [error, setError] = useState(undefined);

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const rst = await api.deleteCurrentSession();
        console.log(rst);
        setLoading(false);
        resolve(rst);

        return rst;
      } catch (e) {
        reject(e);
      }
    });
  };

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        setError(undefined);
        await api.createSession(email, password);

        setLoading(false);
        // resolve(data);
      } catch (e) {
        setLoading(false);
        if (e.code == 0) {
          setError({
            message: e.message,
            description: "There is something wrong in server.",
          });

          reject(error);
        }

        if (e.code == 400) {
          setError({
            message: e.message,
            description: "Please try again!",
          });
          reject(error);
        }

        if (e.code == 401) {
          setError({
            message: e.message,
            description: "You have entered an invalid username or password",
          });
          reject(error);
        }

        if (e.code == 429) {
          // console.log(e.headers);
          setError({
            message: e.message,
            description: "You have been reach the limit of login attempts",
          });
        }
        reject(error);
      }

      const data = await api.getAccount();
      setAccount(data);
    });
  };

  return { isLoading, error, login, logout };
};

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    //TODO create a catch for the error
    const fetchTickets = async () => {
      setLoading(true);
      const { documents } = await api.listDocuments(AppWriteConfig.ticketsID);
      if (documents && documents !== undefined) {
        setTickets(documents);
      }
      setLoading(false);
      console.log(documents);
    };
    fetchTickets();
  }, []);

  return { tickets, setTickets, isLoading, setLoading, isError, setError };
};

const useTicket = ({ $id }) => {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [comments, comment] = useState([]);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const data = await api.listDocuments(
        AppWriteConfig.ticketsID,
        Query.equal("$id", $id)
      );
    };
  }, []);
};

export { useTickets, useTicket, useAuth };
