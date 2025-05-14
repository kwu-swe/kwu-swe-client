import { create } from "zustand";
import { persist } from "zustand/middleware";
import { merge } from "lodash";
import { User } from "@/types/User";

interface UserStoreProps {
  user?: User;
  setUser: (user: User) => void;
}
const useUserStore = create(
  persist<UserStoreProps>(
    (set) => ({
      user: undefined,
      setUser: (user: User) =>
        set({
          user,
        }),
    }),
    {
      name: "userStore",
      merge: (initial, persisted) => merge(initial, persisted),
    }
  )
);

export { useUserStore };
