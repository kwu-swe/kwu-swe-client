import courseApi from "@/service/api/course";
import { CourseCreate } from "@/types/Course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useCourse() {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: post, isPending: isCreating } = useMutation({
    mutationKey: ['coursePost'],
    mutationFn: (courseCreate: CourseCreate) =>
      courseApi.post({
        ...courseCreate,
        courseNumber: createCourseNumber(),
      }),
    onSuccess: () => {
      setIsCreateMode(false);
      queryClient.invalidateQueries({ queryKey: ['courseGet'] });
    }
  });

  const { data, isLoading } = useQuery({
    queryKey: ['courseGet'],
    queryFn: courseApi.get,
    staleTime: 0,
  });

  return {
    post,
    courses: data ?? [],
    isLoading,
    isCreateMode,
    setIsCreateMode,
    isCreating
  };
}

function createCourseNumber(): string {
  const part1 = String(Math.floor(Math.random() * 1000)).padStart(3, '0');  // I020
  const part2 = Math.floor(Math.random() * 10);                             // 4
  const part3 = String(Math.floor(Math.random() * 10000)).padStart(4, '0'); // 0846
  const part4 = String(Math.floor(Math.random() * 100)).padStart(2, '0');   // 01

  return `I${part1}-${part2}-${part3}-${part4}`;
}