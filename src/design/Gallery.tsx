import { ReactNode } from "react";

export default function Gallery({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex"></div>
      {children}
    </div>
  );
}
