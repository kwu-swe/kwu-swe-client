import Dashboard from "@/components/dashboard/(root)/Page";
import lectureApi from "@/connection/api/lecture";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Page() {
  const { data: lectures } = useQuery({
    queryKey: ["getLectures"],
    queryFn: lectureApi.get,
  });
  useEffect(() => {
    console.log(lectures);
  }, [lectures]);
  return <Dashboard />;
}
