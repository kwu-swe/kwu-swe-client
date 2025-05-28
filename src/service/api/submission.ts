import { ToApi } from "@/types/Api";
import { Submission, SubmissionCreate } from "@/types/Submission";
import httpRequest from "../axios";

const api = httpRequest.api();

async function post(data: SubmissionCreate) {
  const response = await api.post<SubmissionCreate>("/submissions", data);
  return response.data;
}

async function submit(submissionId: number) {
  const response = await api.post<string>(`/submissions/${submissionId}/submit`);
  return response.data;
}
async function getFiles(submissionId: number) {
  const response = await api.get<string[]>(`/submissions/${submissionId}/files`);
  return response.data;
}
async function postFile(submissionId: number, data: { file: File }) {
  const response = await api.post<any>(`/submissions/${submissionId}/files`, data);
  return response.data;
}

async function deleteFile(submissionId: number) {
  const response = await api.delete<any>(`/submissions/${submissionId}/files`);
  return response.data;
}

async function getByStudent(studentId: number) {
  const response = await api.get<ToApi<Submission[]>>(`/submissions/student/${studentId}`);
  return response.data.result;
}

async function getByAssignment(assignmentId: number) {
  const response = await api.get<ToApi<Submission[]>>(`/submissions/assignments/${assignmentId}`);
  return response.data.result;
}

async function getByAssignmentAndStudent(assignmentId: number, studentId: number) {
  const response = await api.get<ToApi<Submission>>(`/submissions/assignment/${assignmentId}/student/${studentId}`);
  return response.data.result;
}

const submissionApi = {
  getByStudent,
  getByAssignment,
  getByAssignmentAndStudent,
  post,
  submit,
  file: {
    get: getFiles,
    post: postFile,
    delete: deleteFile
  }
};

export default submissionApi;
