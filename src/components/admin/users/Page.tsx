import useUser from "@/hook/useUser";
import { UserCreate } from "@/types/User";
import { isUserCreate } from "@/types/User.guard";
import { Button, Input, Shelf } from "fast-jsx";
import { useEffect, useState } from "react";

export default function UserPage() {
	const [userCreate, setUserCreate] = useState<UserCreate>()
	const [name, setName] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [code, setCode] = useState<string>();
	const [phoneNumber, setPhoneNumber] = useState<string>();
	const { postStudent } = useUser();
	useEffect(() => {
		if (!name || !code || !phoneNumber || !password) return;
		setUserCreate({ name, code, phoneNumber, password })
	}, [name, code, phoneNumber, password])
	return <Shelf>
		<Input state={[name, setName]} placeholder="이름" />
		<Input state={[code, setCode]} placeholder="학번" />
		<Input state={[phoneNumber, setPhoneNumber]} placeholder="전화번호" />
		<Input state={[password, setPassword]} placeholder="비밀번호" />
		<Button title="등록" onClick={() => {
			if (!isUserCreate(userCreate)) return;
			postStudent(userCreate)
		}} />
	</Shelf>;
}
