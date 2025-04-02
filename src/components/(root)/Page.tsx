import Loading from "@/design/Loading";
import { Button } from "fast-jsx";
import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";
export default function Root() {
  const router = useNavigate();
  const container = {
    displays: "flex flex-col gap-y-12 justify-center items-center",
    sizes: "w-full min-h-screen",
  };
  return (
    <div className={cn(container)}>
      <Loading />
      <Button
        title="시작하기"
        onClick={() => router("/sign-in")}
        option={{
          background: "bg-kw-brown hover:scale-105 duration-500",
          textColor: "text-white",
          font: "text-2xl",
          width: "w-48",
          height: "h-12",
        }}
      />
    </div>
  );
}
