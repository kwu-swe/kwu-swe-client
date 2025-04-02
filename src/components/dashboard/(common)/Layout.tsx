import { cn } from "fast-jsx/util";
import { ReactNode } from "react";
import Header from "./organism/Header.organism";
import Navigator from "./organism/Navigator.organism";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const container = {
    displays: "flex flex-col gap-y-3.5",
    sizes: "order-2",
  };
  const body = {
    displays: "flex",
    sizes: "w-full",
  };
  return (
    <div className={cn(container)}>
      <Header />
      <div className={cn(body)}>
        <Navigator />
        <div className="pt-4 px-4 w-full">{children}</div>
      </div>
    </div>
  );
}
