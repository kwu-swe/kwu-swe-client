import { cn } from "fast-jsx/util";

export default function Header() {
  const container = {
    displays: "flex items-center justify-center",
    boundaries: "border-b-2 py-3.5",
    backgrounds: "bg-kw-brown",
    fonts: "leading-none text-white",
  };
  return <div className={cn(container)}>KLAS</div>;
}
