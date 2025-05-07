import courseApi from "@/connection/api/course";
import { CourseCreate, UpdateCourse } from "@/types/Course";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useCourse() {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);

  const { mutate: post, isSuccess: postSuccess } = useMutation({
    mutationFn: (createCourse: CourseCreate) =>
      courseApi.post(createCourse),
    onSuccess: () => setIsCreateMode(false)
  });

  // const { mutate: patch, isSuccess: patchSuccess } = useMutation({
  //   mutationFn: ({ id, data }: { id: number; data: UpdateCourse }) =>
  //     courseApi.patch(id, data)
  // });

  // const { mutate: remove, isSuccess: deleteSuccess } = useMutation({
  //   mutationFn: (id: number) => courseApi.delete(id)
  // });

  const { data, isLoading } = useQuery({
    queryKey: ["getCourses", postSuccess],
    queryFn: courseApi.get,
  });

  return { 
    post, 
    courses: data ?? [], 
    isLoading,
    isCreateMode,
    setIsCreateMode
  };
}
