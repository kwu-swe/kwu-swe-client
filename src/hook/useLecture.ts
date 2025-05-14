import lectureApi from "@/connection/api/lecture";
import { LectureCreate, LectureAssistantCreate, LectureUpdate } from "@/types/Lecture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useLecture() {
  const [code, setCode] = useState<string>("");
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: post } = useMutation({
    mutationKey: ['lecturePost'],
    mutationFn: (lecture: LectureCreate) => lectureApi.post(lecture),
    onSuccess: () => {
      setIsCreateMode(false);
      queryClient.invalidateQueries({ queryKey: ['lectureGet'] });
    }
  });

  const { mutate: patch } = useMutation({
    mutationKey: ['lecturePatch'],
    mutationFn: ({ id, data }: { id: number; data: LectureUpdate }) =>
      lectureApi.patch(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectureGet'] });
    }
  });

  const { mutate: _delete } = useMutation({
    mutationKey: ['lectureDelete'],
    mutationFn: (id: number) => lectureApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectureGet'] });
    }
  });

  const { mutate: postAssistant } = useMutation({
    mutationKey: ['lectureAssistantPost'],
    mutationFn: (lectureAssistantCreate: LectureAssistantCreate) =>
      lectureApi.postAssistant(lectureAssistantCreate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectureGet'] });
    }
  });

  const { data: lectures, isLoading: lecturesLoading } = useQuery({
    queryKey: ['lectureGet'],
    queryFn: lectureApi.get,
    staleTime: 0,
  });

  const { data: studentLectures, isLoading: studentLecturesLoading } = useQuery({
    enabled: !!code,
    queryKey: ['lectureStudents'],
    queryFn: () => lectureApi.getStudentLectures(code),
    staleTime: 0,
  });

  return {
    lectures: lectures ?? [],
    studentLectures: studentLectures ?? [],
    isLoading: lecturesLoading || studentLecturesLoading,
    isCreateMode,
    setIsCreateMode,
    post,
    patch,
    delete: _delete,
    postAssistant,
  };
}
