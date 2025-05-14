import userApi from "@/connection/api/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UserCreate, User } from "@/types/User";
import { useUserStore } from "@/store";

const callback = () => {
  alert('로그인이 필요합니다.');
  return window.location.href = '/sign-in';
}

export default function useUser() {
  const [user, setUser] = useState<User>();
  const { user: storedUser } = useUserStore();
  const { mutate: postStudent } = useMutation({
    mutationFn: (data: UserCreate) => userApi.post("ROLE_STUDENT", data),
  })
  const { mutate: getUser } = useMutation({
    mutationFn: (code: string) => userApi.getByStudentNumber(code),
    onSuccess: (user) => setUser(user),
    onError: callback
  });
  useEffect(() => {
    if (!storedUser) callback();
    if (!user && storedUser) {
      // getUser(storedUser?.code);
      setUser(storedUser);
    }
  }, [storedUser, user]);
  return { user, postStudent };
}
