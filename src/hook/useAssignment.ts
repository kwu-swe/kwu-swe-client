import assignmentApi from "@/service/api/assignment";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AssignmentCreate,
  SubmissionCreate,
  Submission,
} from "@/types/Assignment";

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

export function useSubmission({ assignmentId }: { assignmentId: number }) {
  const queryClient = useQueryClient();
  const { data: submission, isLoading: isLoadingSubmissions } =
    useQuery<Submission | null>({
      queryKey: ["getSubmissions", assignmentId],
      queryFn: async () => {
        if (!assignmentId) return null;
        try {
          const response = await assignmentApi.getSubmissions(assignmentId);
          return response.result || null;
        } catch (error: any) {
          // 404 에러인 경우 (과제 제출이 없음) null 반환
          if (error?.response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
      enabled: !!assignmentId,
      retry: (failureCount, error: any) => {
        // 404 에러인 경우 재시도하지 않음
        if (error?.response?.status === 404) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 0, // 항상 최신 데이터 확인
      gcTime: 0, // 캐시하지 않음
    });

  const { mutate: postSubmission } = useMutation<
    any,
    Error,
    { assignmentId: number; submission: SubmissionCreate }
  >({
    mutationFn: ({ assignmentId, submission }) =>
      assignmentApi.postSubmission(assignmentId, submission),
    onError: (error) => {
      console.error("과제 제출 실패:", error);
      alert("과제 제출에 실패했습니다.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getSubmissions", assignmentId],
      });
      alert("과제가 성공적으로 제출되었습니다.");
    },
  });

  const { mutate: updateSubmission } = useMutation<
    any,
    Error,
    { submissionId: number; submission: SubmissionCreate }
  >({
    mutationFn: ({ submissionId, submission }) =>
      assignmentApi.updateSubmission(submissionId, submission),
    onError: (error) => {
      console.error("과제 수정 실패:", error);
      alert("과제 수정에 실패했습니다.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getSubmissions", assignmentId],
      });
      alert("과제가 성공적으로 수정되었습니다.");
    },
  });

  const { mutate: deleteSubmission } = useMutation<
    any,
    Error,
    { submissionId: number }
  >({
    mutationFn: ({ submissionId }) =>
      assignmentApi.deleteSubmission(submissionId),
    onError: (error) => {
      console.error("과제 삭제 실패:", error);
      alert("과제 삭제에 실패했습니다.");
    },
    onSuccess: () => {
      // 캐시를 완전히 제거하여 확실한 UI 업데이트
      queryClient.removeQueries({
        queryKey: ["getSubmissions", assignmentId],
      });

      // 즉시 쿼리 데이터를 null로 설정
      queryClient.setQueryData(["getSubmissions", assignmentId], null);

      alert("과제가 성공적으로 삭제되었습니다.");
    },
  });

  return {
    submission,
    postSubmission,
    updateSubmission,
    deleteSubmission,
    isLoadingSubmissions,
  };
}
