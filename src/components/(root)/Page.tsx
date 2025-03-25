import { cn } from "fast-jsx/util";
export default function Root() {
  const container = {
    displays: "flex justify-center items-center",
    sizes: "w-full min-h-screen",
  };
  return <div className={cn(container)}>광운대학교</div>;
}
