import lectureApi from "@/connection/api/lecture";
import { Lecture, UpdateLecture } from "@/types/Lecture";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useLecture() {
  const { mutate: post, isSuccess: postSuccess } = useMutation({
    mutationFn: (lecture: Lecture) => lectureApi.post(lecture)
  });

  const { mutate: patch, isSuccess: patchSuccess } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateLecture }) =>
      lectureApi.patch(id, data)
  });

  const { mutate: _delete, isSuccess: deleteSuccess } = useMutation({
    mutationFn: (id: number) => lectureApi.delete(id)
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getLectures", postSuccess, patchSuccess, deleteSuccess],
    queryFn: lectureApi.get,
  });

  return { lectures: data ?? [], isLoading, post, patch, delete: _delete };
}
