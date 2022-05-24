import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "react-query";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [userState, setUser] = useState(undefined);
  const isUserAuthenticated =
    window.sessionStorage.getItem("user") != undefined;
  const queryClient = useQueryClient();
  const logout = () => {
    window.sessionStorage.removeItem("user");
    queryClient.clear();
    setUser(undefined);
  };

  useEffect(() => {
    let userSession = JSON.parse(window.sessionStorage.getItem("user"));

    if (userState == undefined || userState == null) {
      if (userSession) {
        setUser(userSession);
      }
    } else {
      window.sessionStorage.setItem("user", JSON.stringify(userState));
    }
  }, [userState]);
  const value = { userState, setUser, isUserAuthenticated, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
