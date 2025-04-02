import { cn } from "fast-jsx/util";
import { ReactNode } from "react";
import Header from "./organism/Header.organism";
import Navigator from "./organism/Navigator.organism";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const container = {
    displays: "flex flex-col",
  };
  const body = {
    displays: "flex",
  };
  return (
    <div className={cn(container)}>
      <Header />
      <div className={cn(body)}>
        <Navigator />
        <div className="pt-4 px-4">{children}</div>
      </div>
    </div>
  );
}
