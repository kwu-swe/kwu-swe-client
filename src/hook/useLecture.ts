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
      alert("강의 생성 성공");
      setIsCreateMode(false);
      queryClient.invalidateQueries({ queryKey: ["lectureGet"] });
    },
    onError: () => {
      alert("강의 생성 실패");
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
  const { data: plan, isLoading: planLoading } = useQuery<LecturePlan>({
    queryKey: ["lecturePlanGet", lectureId],
    queryFn: async () => {
      const response = await lectureApi.plan.get(lectureId);
      return response.result;
    },
    staleTime: 0,
  });

  const { mutate: postPlan, isPending: isCreating } = useMutation<any, Error, LecturePlanCreate>({
    mutationKey: ["lecturePlanPost", lectureId],
    mutationFn: (data: LecturePlanCreate) => lectureApi.plan.post(lectureId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturePlanGet", lectureId] });
    },
  });

  const { mutate: updatePlan, isPending: isUpdating } = useMutation<any, Error, { planId: number; plan: LecturePlanCreate }>({
    mutationFn: ({ planId, plan }) => lectureApi.plan.update(planId, plan),
    onError: (error) => {
      console.error('강의계획서 수정 실패:', error);
      alert('강의계획서 수정에 실패했습니다.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturePlanGet', lectureId] });
      alert('강의계획서가 성공적으로 수정되었습니다.');
    },
  });

  const { mutate: deletePlan, isPending: isDeleting } = useMutation<any, Error, number>({
    mutationFn: (planId) => lectureApi.plan.delete(planId),
    onError: (error) => {
      console.error('강의계획서 삭제 실패:', error);
      alert('강의계획서 삭제에 실패했습니다.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturePlanGet', lectureId] });
      alert('강의계획서가 성공적으로 삭제되었습니다.');
    },
  });

  return {
    plan,
    isLoading: planLoading,
    postPlan,
    updatePlan,
    deletePlan,
    isCreating,
    isUpdating,
    isDeleting
  };
}

export function useGrade({ lectureId, flag }: { lectureId: number, flag?: boolean }) {
  const queryClient = useQueryClient();
  const { data: grades, isLoading: gradeLoading } = useQuery<Grade[]
  >({
    queryKey: ["lectureGradeGet", lectureId],
    queryFn: async () => {
      const response = await lectureApi.grade.get(lectureId);
      return response.result;
    },
    enabled: typeof lectureId !== "undefined" && !!flag,
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
