import { Button, Input } from "fast-jsx";
import { cn } from "fast-jsx/util";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdLock } from "react-icons/md";
import { useUserStore } from "@/store";
import useToken from "@/hook/useToken";

export default function SignIn() {
  const router = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { setUser } = useUserStore();
  const { signIn, isLoading } = useToken()
  // 스타일 정의
  const styles = {
    container: {
      displays: "flex justify-center items-center",
      sizes: "w-full min-h-screen",
      backgrounds: "bg-kw-background bg-cover",
    },
    wrapper: {
      sizes: "w-full max-w-md px-4",
    },
    card: {
      backgrounds: "bg-white/95 backdrop-blur-sm",
      shapes: "rounded-2xl",
      shadows: "shadow-card",
      paddings: "p-8",
    },
    header: {
      displays: "flex items-center gap-4",
      margins: "mb-8",
    },
    logo: {
      sizes: "w-14",
    },
    title: {
      font: "text-2xl font-bold",
      colors: "text-gray-800",
    },
    subtitle: {
      font: "text-sm text-medium",
      colors: "text-gray-500",
    },
    inputWrapper: {
      displays: "space-y-4",
    },
    inputContainer: {
      positions: "relative",
    },
    inputIcon: {
      positions: "absolute left-3 top-1/2 -translate-y-1/2",
      sizes: "w-5 h-5",
      colors: "text-gray-400",
    },
    input: {
      width: "w-full",
      height: "h-12",
      font: "text-base pl-10",
      border: "border border-gray-100 rounded-lg",
    },
    button: {
      width: "w-full",
      height: "h-12",
      font: "text-lg font-medium",
      colors: "text-white",
      backgrounds: {
        default: "bg-kw-brown hover:bg-kw-brown/90 transition-colors",
        disabled: "bg-gray-300 cursor-not-allowed",
      },
    },
  };

  const isButtonDisabled = isLoading || !username || !password;

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.wrapper)}>
        <div className={cn(styles.card)}>
          <div className={cn(styles.header)}>
            <img
              src="/android-chrome-512x512.png"
              alt="광운대학교"
              className={cn(styles.logo)}
            />
            <div>
              <h1 className={cn(styles.title)}>로그인</h1>
              <p className={cn(styles.subtitle)}>
                학사관리 서비스에 오신 것을 환영합니다
              </p>
            </div>
          </div>

          <div className={cn(styles.inputWrapper)}>
            <div className={cn(styles.inputContainer)}>
              <MdPerson className={cn(styles.inputIcon)} />
              <Input
                state={[username, setUsername]}
                placeholder="아이디 입력"
                option={styles.input}
              />
            </div>
            <div className={cn(styles.inputContainer)}>
              <MdLock className={cn(styles.inputIcon)} />
              <Input
                state={[password, setPassword]}
                type="password"
                placeholder="비밀번호 입력"
                option={styles.input}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button
              title={isLoading ? "로그인 중..." : "로그인"}
              onClick={() => signIn({ code: username!, password: password! })}
              option={{
                ...styles.button,
                background: isButtonDisabled
                  ? styles.button.backgrounds.disabled
                  : styles.button.backgrounds.default,
              }}
            />
          </div>
        </div>
      </div>
      <Button title="교수 로그인" onClick={() => {
        signIn({ code: "P1", password: "asdfasdf" })
      }} option={{
        position: "fixed bottom-12 right-3.5"
      }} />
      <Button title="학생 로그인" onClick={() => {
        signIn({ code: "2020202040", password: "asdfasdf" })
      }} option={{
        position: "fixed bottom-3.5 right-3.5"
      }} />
    </div>
  );
}
