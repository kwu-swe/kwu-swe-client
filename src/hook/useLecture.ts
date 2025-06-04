import lectureApi from "@/service/api/lecture";
import {
  LectureCreate,
  LectureAssistantCreate,
  LectureUpdate,
  LecturePlanCreate,
  LecturePlan,
} from "@/types/Lecture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useUser from "./useUser";
import { Grade, GradeType } from "@/types/Grade";

export default function useLecture() {
  const { user } = useUser();
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: post } = useMutation({
    mutationKey: ["lecturePost"],
    mutationFn: (lecture: LectureCreate) => {
      if (!user) return Promise.resolve();
      return lectureApi.post(user.code, lecture);
    },
    onSuccess: () => {
      setIsCreateMode(false);
      queryClient.invalidateQueries({ queryKey: ["lectureGet"] });
    },
  });

  const { mutate: patch } = useMutation({
    mutationKey: ["lecturePatch"],
    mutationFn: ({ id, data }: { id: number; data: LectureUpdate }) =>
      lectureApi.patch(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectureGet"] });
    },
  });

  const { mutate: _delete } = useMutation({
    mutationKey: ["lectureDelete"],
    mutationFn: (id: number) => lectureApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectureGet"] });
    },
  });

  const { mutate: postAssistant } = useMutation({
    mutationKey: ["lectureAssistantPost"],
    mutationFn: (lectureAssistantCreate: LectureAssistantCreate) =>
      lectureApi.postAssistant(lectureAssistantCreate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectureGet"] });
    },
  });

  const { mutate: postStudentLecture } = useMutation({
    mutationKey: ["lectureStudentLecturePost"],
    mutationFn: (lectureId: number) => {
      console.log("lectureId", lectureId);
      return lectureApi.postStudentLecture(lectureId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectureGet"] });
    },
  });

  const { data: lectures, isLoading: lecturesLoading } = useQuery({
    queryKey: ["lectureGet"],
    queryFn: lectureApi.get,
    staleTime: 0,
  });

  const { data: studentLectures, isLoading: studentLecturesLoading } = useQuery(
    {
      enabled: !!user,
      queryKey: ["lectureStudents"],
      queryFn: () => {
        if (!user) return Promise.resolve([]);
        return lectureApi.getStudentLectures(user.code);
      },
      staleTime: 0,
    }
  );

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
    postStudentLecture,
  };
}


export function usePlan({ lectureId }: { lectureId: number }) {
  const queryClient = useQueryClient();
  const { data: plan, isLoading: planLoading } = useQuery<LecturePlan
  >({
    queryKey: ["lecturePlanGet", lectureId],
    queryFn: async () => {
      const response = await lectureApi.plan.get(lectureId);
      return response.result;
    },
    staleTime: 0,
  });

  const { mutate: postPlan } = useMutation({
    mutationKey: ["lecturePlanPost", lectureId],
    mutationFn: (data: LecturePlanCreate) => lectureApi.plan.post(lectureId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturePlanGet", lectureId] });
    },
  });

  return {
    plan,
    isLoading: planLoading,
    postPlan,
  };
}

export function useGrade({ lectureId }: { lectureId: number }) {
  const queryClient = useQueryClient();
  const { data: grades, isLoading: gradeLoading } = useQuery<Grade[]
  >({
    queryKey: ["lectureGradeGet", lectureId],
    queryFn: async () => {
      const response = await lectureApi.grade.get(lectureId);
      return response.result;
    },
    staleTime: 0,
  });

  const { mutate: patchGrade } = useMutation({
    mutationKey: ["lectureGradePost", lectureId],
    mutationFn: ({ studentId, grade }: { studentId: number, grade: GradeType }) => lectureApi.grade.patch(lectureId, studentId, grade),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectureGradeGet", lectureId] });
    },
  });

  return {
    grades,
    isLoading: gradeLoading,
    patchGrade,
  };
}
