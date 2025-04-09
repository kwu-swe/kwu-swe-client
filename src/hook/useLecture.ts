import lectureApi from "@/connection/api/lecture";
import { useQuery } from "@tanstack/react-query";

export default function useLecture() {
  const { data, isLoading } = useQuery({
    queryKey: ["getLectures"],
    queryFn: lectureApi.get,
  });
  return { lectures: data?.result ?? [], isLoading };
}
