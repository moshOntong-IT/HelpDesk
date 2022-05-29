import { Appwrite, Query } from "appwrite";
import { useEffect, useState } from "react";
import api from "../../src/api/appwrite";
import { AppWriteConfig } from "../config";
import useAccount from "../zustand/account";

const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const setAccount = useAccount((state) => state.setAccount);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    return () => {
      setLoading(false);
      setSuccess(false);
      setError(undefined);
    };
  }, []);

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const rst = await api.deleteCurrentSession();
        // console.log(rst);
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
        const data = await api.createSession(email, password);
        if (data != undefined) {
          setSuccess(true);
        }

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
    });
  };

  return { isLoading, error, login, logout, isSuccess };
};

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = api
      .provider()
      .subscribe(
        `collections.${AppWriteConfig.ticketsID}.documents`,
        (data) => {
          // console.log(
          //   data.events.includes(
          //     `collections.${AppWriteConfig.ticketsID}.documents.*.create`
          //   )
          // );
          if (
            data.events.includes(
              `collections.${AppWriteConfig.ticketsID}.documents.*.create`
            )
          ) {
            setTickets((prevTickets) => {
              return [data.payload, ...prevTickets];
            });
          }

          // console.log(prevTickets);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    //TODO create a catch for the error
    const fetchTickets = async () => {
      setLoading(true);
      const { documents } = await api.listDocuments(AppWriteConfig.ticketsID);
      if (documents && documents !== undefined) {
        setTickets(documents);
      }

      setLoading(false);
      // console.log(documents);
    };
    fetchTickets();

    return () => {
      setTickets([]);
    };
  }, []);

  return { tickets, setTickets, isLoading, setLoading, isError, setError };
};

const useTicket = () => {
  const [isLoading, setLoading] = useState(false);
  const [ticket, setTicket] = useState({});
  // const [comments, comment] = useState([]);

  useEffect(() => {
    return () => {
      setTicket(null);
    };
  }, []);

  const fetchTicket = ({ $id }) => {
    // console.log(typeof $id);
    const fetchTicketDetails = async () => {
      setLoading(true);
      const data = await api.getTicket(AppWriteConfig.ticketsID, $id);

      setLoading(false);

      if (data != undefined) {
        setTicket(data);
      }
    };

    fetchTicketDetails();
  };

  return { ticket, isLoading, fetchTicket };
};

const useAddTicket = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(null);
    };
  }, []);

  const addTicket = ({ data }) => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const values = {
          subject: data.subject,
          description: data.description,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          createdBy: data.user.$id,
          status: "Pending",
          author: data.user.name,
          department: "Support Department",
        };

        await api.createDocument(
          AppWriteConfig.ticketsID,
          values,
          ["role:member"],
          [`user:${data.user.$id}`, `team:6291d66a93d0b2d31c5a`]
        );

        setLoading(false);
        resolve(rst);
      } catch (e) {
        setLoading(false);
        if (e.message.includes("Write permission")) {
          reject({ message: "You don't have permission to create a ticket" });
        }
        reject({ message: "Something is wrong" });
      }
    });
  };

  return { addTicket, isLoading };
};

export { useTickets, useTicket, useAuth, useAddTicket };
