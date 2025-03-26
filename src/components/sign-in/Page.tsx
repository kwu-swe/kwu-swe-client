import { Button, Input, Shelf } from "fast-jsx";
import { cn } from "fast-jsx/util";
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const container = {
    displays: "flex justify-center items-center",
    sizes: "w-full min-h-screen",
    backgrounds: "bg-kw-background bg-cover",
  };

  return (
    <div className={cn(container)}>
      <div>
        <Shelf.Col
          option={{
            width: "w-full min-w-[400px]",
          }}
        >
          <img
            src="/images/logo-white.png"
            alt="광운대학교"
            className="w-120"
          />
          <Input
            state={[username, setUsername]}
            placeholder="아이디 입력"
            option={{
              width: "w-full",
            }}
          />
          <Input
            state={[password, setPassword]}
            placeholder="비밀번호 입력"
            option={{
              width: "w-full",
            }}
          />
          <Button
            title="로그인"
            onClick={() => {}}
            option={{
              background: "bg-kw-brown",
              height: "h-12",
              font: "text-xl",
            }}
          />
        </Shelf.Col>
      </div>
    </div>
  );
}
