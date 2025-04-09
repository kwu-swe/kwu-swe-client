import Dashboard from "@/components/dashboard/(root)/Page";
import lectureApi from "@/connection/api/lecture";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Page() {
  return <Dashboard />;
}
