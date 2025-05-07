import { cn } from "fast-jsx/util";
import { ReactNode } from "react";
import Header from "./organism/Header.organism";
import Navigator from "./organism/Navigator.organism";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const container = {
    displays: "flex flex-col min-h-screen bg-gray-50",
    sizes: "w-full",
    positions: "relative",
  };

  const headerWrapper = {
    backgrounds: "bg-white",
    positions: "relative",
    zIndex: "z-50",
  };

  const body = {
    displays: "flex flex-row",
    positions: "relative",
    sizes: "w-full flex-1",
  };

  const content = {
    displays: "flex-1 bg-white rounded-none md:rounded-lg shadow-sm",
    sizes: "p-5",
    overflow: "overflow-y-auto",
  };

  const mainContainer = {
    displays: "flex-1",
    sizes: "w-full max-w-full md:max-w-5xl mx-auto",
    paddings: "p-0 md:p-6",
    overflows: "overflow-hidden",
  };

  return (
    <div className={cn(container)}>
      <div className={cn(headerWrapper)}>
        <Header />
      </div>
      <div className={cn(body)}>
        <Navigator />
        <div className={cn(mainContainer)}>
          <main className={cn(content)}>{children}</main>
        </div>
      </div>
    </div>
  );
}
