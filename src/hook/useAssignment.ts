import assignmentApi from "@/service/api/assignment";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { AssignmentCreate } from "@/types/Assignment";

export default function useAssignment({
  lectureId,
  assignmentId,
}: {
  lectureId?: number;
  assignmentId?: number;
}) {
  const queryClient = useQueryClient();

  const [
    { data: assignment, isLoading: isLoadingAssignment },
    { data: assignmentsByLecture, isLoading: isAssignmentByLecture },
  ] = useQueries({
    queries: [
      {
        queryKey: ["getAssignmentById", assignmentId],
        queryFn: async () => {
          if (!assignmentId) return undefined;
          const response = await assignmentApi.get(assignmentId);
          return response;
        },
        enabled: !!assignmentId,
      },
      {
        queryKey: ["getAssignmentByLectureId", lectureId],
        queryFn: async () => {
          if (!lectureId) return undefined;
          const response = await assignmentApi.getByLectureId(lectureId);
          return response;
        },
        enabled: !!lectureId,
      },
    ],
  });
  const { mutate: postAssignment } = useMutation<
    any,
    Error,
    { lectureId: number; assignment: AssignmentCreate }
  >({
    mutationFn: ({ lectureId, assignment }) =>
      assignmentApi.post(lectureId, assignment),
    onError: (error) => {
      console.error("과제 등록 실패:", error);
      alert("과제 등록에 실패했습니다.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAssignmentByLectureId", lectureId],
      });
      alert("과제가 성공적으로 등록되었습니다.");
    },
  });

  return {
    assignment,
    postAssignment,
    isLoadingAssignment,
    assignmentsByLecture,
    isAssignmentByLecture,
  };
}
