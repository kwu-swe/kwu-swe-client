import submissionApi from "@/service/api/submission";
import { SubmissionCreate } from "@/types/Submission";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Option {
  studentId: number;
  assignmentId: number;
}

export default function useSubmission(option?: Partial<Option>) {
  const { studentId, assignmentId } = option ?? {};
  const queryClient = useQueryClient();

  const { mutate: post, isPending: isCreating } = useMutation({
    mutationFn: (data: SubmissionCreate) => submissionApi.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSubmissionsByStudent", studentId] });
      queryClient.invalidateQueries({ queryKey: ["getSubmissionsByAssignment", assignmentId] });
      alert("과제가 성공적으로 등록되었습니다.");
    },
    onError: () => {
      alert("과제 등록에 실패했습니다.");
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: ({ submissionId, data }: { submissionId: number; data: SubmissionCreate }) =>
      submissionApi.update(submissionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSubmissionsByStudent", studentId] });
      queryClient.invalidateQueries({ queryKey: ["getSubmissionsByAssignment", assignmentId] });
      alert("과제가 성공적으로 수정되었습니다.");
    },
    onError: () => {
      alert("과제 수정에 실패했습니다.");
    },
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (submissionId: number) => submissionApi.delete(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSubmissionsByStudent", studentId] });
      queryClient.invalidateQueries({ queryKey: ["getSubmissionsByAssignment", assignmentId] });
      alert("과제가 성공적으로 삭제되었습니다.");
    },
    onError: () => {
      alert("과제 삭제에 실패했습니다.");
    },
  });
  const { data: studentSubmissions, isLoading: isLoadingStudent } = useQuery({
    enabled: !!studentId && !assignmentId,
    queryKey: ["getSubmissionsByStudent", studentId],
    queryFn: () => submissionApi.getByStudent(studentId!),
  });

  const { data: assignmentSubmissions, isLoading: isLoadingAssignment } =
    useQuery({
      enabled: !!assignmentId && !studentId,
      queryKey: ["getSubmissionsByAssignment", assignmentId],
      queryFn: () => submissionApi.getByAssignment(assignmentId!),
    });

  const { data: submission, isLoading: isLoadingBoth } = useQuery({
    enabled: !!assignmentId && !!studentId,
    queryKey: ["getSubmissionByAssignmentAndStudent", assignmentId, studentId],
    queryFn: () =>
      submissionApi.getByAssignmentAndStudent(assignmentId!, studentId!),
  });
  return {
    submissions: studentSubmissions ?? assignmentSubmissions ?? [],
    submission,
    isLoading: isLoadingStudent || isLoadingAssignment || isLoadingBoth,
    post,
    isCreating,
    update,
    isUpdating,
    delete: remove,
    isDeleting,
  };
}

export function useSubmissionFile(submissionId: number) {
  const { mutate: upload, isSuccess: uploadSuccess } = useMutation({
    mutationFn: (file: File) => submissionApi.file.post(submissionId, { file }),
  });
  const { mutate: remove, isSuccess: deleteSuccess } = useMutation({
    mutationFn: () => submissionApi.file.delete(submissionId),
  });
  const { data: files, isLoading } = useQuery({
    queryKey: [
      "getSubmissionFiles",
      submissionId,
      uploadSuccess,
      deleteSuccess,
    ],
    queryFn: () => submissionApi.file.get(submissionId),
  });
  return {
    files: files ?? [],
    isLoading,
    upload,
    delete: remove,
  };
}
