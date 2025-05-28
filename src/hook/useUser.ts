import userApi from "@/service/api/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UserCreate, UserRole } from "@/types/User";
import { useLocation } from "react-router-dom";


const callback = () => {
  alert('로그인이 필요합니다.');
  return window.location.href = '/sign-in';
}

const callbackAdmin = () => {
  alert('교수님만 접근 가능합니다.');
  return window.location.href = '/dashboard';
}

export default function useUser() {
  const { pathname } = useLocation()
  const { mutate: postStudent } = useMutation({
    mutationFn: ({ userCreate, role }: { userCreate: UserCreate, role: UserRole }) => userApi.post(role, userCreate),
  })
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: userApi.get,
  })
  useEffect(() => {
    if (pathname === '/sign-in') return;
    if (pathname.includes('/admin') && !isLoading && user?.role !== 'ROLE_PROFESSOR') callbackAdmin();
    if (!isLoading && !!error) callback();
  }, [isLoading]);
  return { user, postStudent };
}
