import useUser from "@/hook/useUser";
import { cn } from "fast-jsx/util";

export default function AdminPage() {
  const { user } = useUser();
  const container = {
    size: 'w-full h-[720px]',
    display: 'flex flex-col items-center justify-center',
    border: 'border-2 border-kw-brown',
    font: "font-bold text-3xl"
  }
  return <div className={cn(container)}>
    <div>안녕하세요 {user?.name} 교수님 :D</div>
  </div>;
}

