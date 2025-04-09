import { create } from "zustand";
import { persist } from "zustand/middleware";
import { merge } from "lodash";

interface UserStoreProps {
  code?: string;
  setCode: (code: string) => void;
}
const useUserStore = create(
  persist<UserStoreProps>(
    (set) => ({
      code: undefined,
      setCode: (code: string) =>
        set({
          code,
        }),
    }),
    {
      name: "userStore",
      merge: (initial, persisted) => merge(initial, persisted),
    }
  )
);

export { useUserStore };
