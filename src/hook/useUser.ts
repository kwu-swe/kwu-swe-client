import userApi from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UserCreate, User, UserRole } from "@/types/User";
import { useUserStore } from "@/store";
import { useLocation } from "react-router-dom";

const callback = () => {
  alert('로그인이 필요합니다.');
  return window.location.href = '/sign-in';
}

export default function useUser() {
  const { pathname } = useLocation()
  const [user, setUser] = useState<User>();
  const { user: storedUser } = useUserStore();
  const { mutate: postStudent } = useMutation({
    mutationFn: ({ userCreate, role }: { userCreate: UserCreate, role: UserRole }) => userApi.post(role, userCreate),
  })
  const { mutate: getUser } = useMutation({
    mutationFn: (code: string) => userApi.getByStudentNumber(code),
    onSuccess: (user) => setUser(user),
    onError: callback
  });
  useEffect(() => {
    if (pathname === '/sign-in') return;
    if (!storedUser) callback();
    if (!user && storedUser) {
      // getUser(storedUser?.code);
      setUser(storedUser);
    }
  }, [storedUser, user]);
  return { user, postStudent };
}
