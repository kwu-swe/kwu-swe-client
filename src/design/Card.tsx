import { LineBreaks } from "fast-jsx";
import { cn } from "fast-jsx/util";

interface CardProps {
  title: string;
  contents: string[];
}
export default function Card({ title, contents }: CardProps) {
  const container = {
    displays: "flex flex-col",
    sizes: "min-w-64",
    boundaries: "p-3.5",
  };
  return (
    <div className={cn(container)}>
      <div className="leading-none text-2xl">{title}</div>
      <LineBreaks texts={contents} />
    </div>
  );
}
