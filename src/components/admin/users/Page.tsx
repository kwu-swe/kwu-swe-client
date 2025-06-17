import useUser from "@/hook/useUser";
import { UserCreate } from "@/types/User";
import { isUserCreate } from "@/types/User.guard";
import { Button, Input, Shelf } from "fast-jsx";
import { useEffect, useState } from "react";
import PageTitle from "../(common)/organisms/PageTitle.organism";

export default function UserPage() {
  const [userCreate, setUserCreate] = useState<UserCreate>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [code, setCode] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [isProfessor, setIsProfessor] = useState<boolean>(false);
  const { postStudent } = useUser();

  useEffect(() => {
    if (!name || !code || !phoneNumber || !password) return;
    setUserCreate({ name, code, phoneNumber, password });
  }, [name, code, phoneNumber, password]);

  return (
    <div className="w-full min-h-screen p-6 md:p-8">
      <PageTitle
        title="사용자 관리"
        subtitle="학생 및 교수 계정을 관리하고 권한을 설정합니다."
      />

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            새 사용자 등록
          </h2>

          <div className="space-y-4">
            <Input state={[name, setName]} placeholder="이름" />
            <Input state={[code, setCode]} placeholder="학번" />
            <Input
              state={[phoneNumber, setPhoneNumber]}
              placeholder="전화번호"
            />
            <Input state={[password, setPassword]} placeholder="비밀번호" />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="professor"
                checked={isProfessor}
                onChange={(e) => setIsProfessor(e.target.checked)}
                className="w-4 h-4 text-kw-brown bg-gray-100 border-gray-300 rounded focus:ring-kw-brown focus:ring-2"
              />
              <label htmlFor="professor" className="text-sm text-gray-700">
                교수 권한 부여
              </label>
            </div>

            <Button
              title="사용자 등록"
              onClick={() => {
                if (!isUserCreate(userCreate)) return;
                postStudent({
                  userCreate,
                  role: isProfessor ? "ROLE_PROFESSOR" : "ROLE_STUDENT",
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
