import submissionApi from "@/service/api/submission";
import { SubmissionCreate } from "@/types/Submission";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Option {
  studentId: number;
  assignmentId: number;
}

export default function useSubmission(option?: Partial<Option>) {
  const { studentId, assignmentId } = option ?? {};

  const { mutate: post, isSuccess: postSuccess } = useMutation({
    mutationFn: (data: SubmissionCreate) => submissionApi.post(data)
  });
  const { data: studentSubmissions, isLoading: isLoadingStudent } = useQuery({
    enabled: !!studentId && !assignmentId,
    queryKey: ["getSubmissionsByStudent", studentId],
    queryFn: () => submissionApi.getByStudent(studentId!),
  });

  const { data: assignmentSubmissions, isLoading: isLoadingAssignment } = useQuery({
    enabled: !!assignmentId && !studentId,
    queryKey: ["getSubmissionsByAssignment", assignmentId],
    queryFn: () => submissionApi.getByAssignment(assignmentId!),
  });

  const { data: submission, isLoading: isLoadingBoth } = useQuery({
    enabled: !!assignmentId && !!studentId,
    queryKey: ["getSubmissionByAssignmentAndStudent", assignmentId, studentId],
    queryFn: () => submissionApi.getByAssignmentAndStudent(assignmentId!, studentId!),
  });
  return {
    submissions: studentSubmissions ?? assignmentSubmissions ?? [],
    submission,
    isLoading: isLoadingStudent || isLoadingAssignment || isLoadingBoth,
    post,
  };
}

export function useSubmissionFile(submissionId: number) {
  const { mutate: upload, isSuccess: uploadSuccess } = useMutation({
    mutationFn: (file: File) => submissionApi.file.post(submissionId, { file })
  });
  const { mutate: remove, isSuccess: deleteSuccess } = useMutation({
    mutationFn: () => submissionApi.file.delete(submissionId)
  });
  const { data: files, isLoading } = useQuery({
    queryKey: ["getSubmissionFiles", submissionId, uploadSuccess, deleteSuccess],
    queryFn: () => submissionApi.file.get(submissionId),
  });
  return {
    files: files ?? [],
    isLoading,
    upload,
    delete: remove
  };
}