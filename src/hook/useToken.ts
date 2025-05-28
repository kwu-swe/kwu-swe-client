import tokenApi from "@/service/api/token"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useToken() {
	const router = useNavigate()
	const [isLoading, setIsLoading] = useState(false);
	const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);

	const { mutate: signIn } = useMutation({
		mutationFn: (code: string) => tokenApi.post(code),
		onSuccess: (data) => {
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
			return router('/dashboard')
		},
		onError: () => {
			setIsLoading(false);
		},
	})
	return { signIn, isLoading }
}