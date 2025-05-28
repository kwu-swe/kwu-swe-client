import tokenApi from "@/service/api/token"
import userApi from "@/service/api/user";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useToken() {
	const router = useNavigate()
	const [isLoading, setIsLoading] = useState(false);
	const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);

	const { mutate: signIn } = useMutation({
		mutationFn: ({ code, password }: { code: string, password: string }) => tokenApi.post(code, password),
		onSuccess: async (data) => {
			setIsLoading(false);
			setCookie('accessToken', data.result.accessToken, {
				path: '/',
				secure: true,
				sameSite: 'strict',
				maxAge: 3600
			});
			setCookie('refreshToken', data.result.refreshToken, {
				path: '/',
				secure: true,
				sameSite: 'strict',
				maxAge: 7 * 24 * 3600
			});
			const user = await userApi.get();
			if (user.role === 'ROLE_PROFESSOR') return router('/admin');
			return router('/dashboard');
		},
		onSettled: () => {
			setIsLoading(false);
		},
		onError: () => {
			alert('로그인 실패')
		},
	})
	return { signIn, isLoading }
}