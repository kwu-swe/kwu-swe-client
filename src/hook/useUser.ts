import userApi from "@/connection/api/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { useUserStore } from "@/store";

export default function useUser() {
  const [user, setUser] = useState<User>();
  const { code } = useUserStore();
  const { mutate: getUser } = useMutation({
    mutationFn: (code: string) => userApi.getByStudentNumber(code),
    onSuccess: (user) => setUser(user),
  });
  useEffect(() => {
    if (!user && code) {
      getUser(code);
    }
  }, [code]);
  return { user };
}
