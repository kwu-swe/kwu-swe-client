import courseApi from "@/connection/api/course";
import { CreateCourse } from "@/types/Course";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useCourse() {
  const { mutate, isSuccess } = useMutation({
    mutationFn: (createLocation: CreateCourse) =>
      courseApi.post(createLocation),
  });
  const { data: courses } = useQuery({
    queryKey: ["getCourses", isSuccess],
    queryFn: courseApi.get,
  });

  return { mutate, courses };
}
