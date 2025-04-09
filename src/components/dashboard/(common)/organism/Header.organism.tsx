import { cn } from "fast-jsx/util";

export default function Header() {
  const container = {
    displays: "flex items-center justify-center",
    boundaries: "border-b-2",
    backgrounds: "bg-gradient-to-r from-[#8A1601] via-[#1C1C3A] to-[#00C2CB]",
    fonts: "leading-none text-white text-2xl",
    sizes: "w-full h-16",
  };
  return <div className={cn(container)}>KLAS</div>;
}
