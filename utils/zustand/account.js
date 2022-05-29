import create from "zustand";
import { persist } from "zustand/middleware";

const useAccount = create(
  persist(
    (set) => ({
      account: null,
      setAccount: (newAccount) => {
        console.log("Successfuly login " + newAccount);
        return set((state) => ({ account: newAccount }));
      },
    }),
    { name: "account", getStorage: () => sessionStorage }
  )
);

export default useAccount;
