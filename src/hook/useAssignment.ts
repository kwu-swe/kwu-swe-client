import assignmentApi from "@/service/api/assignment";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { Assignment, AssignmentByLecture } from "@/types/Assignment";

export default function useAssignment({
  lectureId,
  assignmentId,
}: {
  lectureId?: number;
  assignmentId?: number;
}) {
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
  }) as [
    UseQueryResult<Assignment | undefined, Error>,
    UseQueryResult<AssignmentByLecture[] | undefined, Error>
  ];

  return {
    assignment,
    isLoadingAssignment,
    assignmentsByLecture,
    isAssignmentByLecture,
  };
}
