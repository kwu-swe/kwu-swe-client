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
	const [isProfessor, setIsProfessor] = useState<boolean>(false);
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
		<div className="flex items-center gap-2">
			<label>교수 권한 부여</label>
			<input type="checkbox" checked={isProfessor} onChange={(e) => setIsProfessor(e.target.checked)} className="w-4 h-4" />
		</div><Button title="등록" onClick={() => {
			if (!isUserCreate(userCreate)) return;
			postStudent({ userCreate, role: isProfessor ? "ROLE_PROFESSOR" : "ROLE_STUDENT" })
		}} />
	</Shelf>;
}
