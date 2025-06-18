import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import {
  Assignment,
  AssignmentByLecture,
  AssignmentCreate,
  Submission,
  SubmissionCreate,
  SubmissionProfessor,
} from "@/types/Assignment";
const api = httpRequest.api();

async function get(assignmentId: number): Promise<Assignment> {
  const response = await api.get<ToApi<Assignment>>(
    `/assignments/${assignmentId}`
  );
  return response.data.result;
}

async function getByLectureId(
  lectureId: number
): Promise<AssignmentByLecture[]> {
  const response = await api.get<ToApi<AssignmentByLecture[]>>(
    `/assignments/lectures/${lectureId}`
  );
  return response.data.result;
}

async function post(
  lectureId: number,
  assignment: AssignmentCreate
): Promise<ToApi<string>> {
  const response = await api.post<AssignmentCreate, ToApi<string>>(
    `/assignments/lectures/${lectureId}`,
    assignment
  );
  return response.data as ToApi<string>;
}
async function getSubmissions(
  assignmentId: number
): Promise<ToApi<Submission>> {
  const response = await api.get<ToApi<Submission>>(
    `/submissions/assignments/${assignmentId}`
  );
  return response.data;
}
async function postSubmission(
  assignmentId: number,
  submission: SubmissionCreate
): Promise<ToApi<string>> {
  const response = await api.post<SubmissionCreate, ToApi<string>>(
    `/submissions/assignments/${assignmentId}`,
    submission
  );
  return response.data as ToApi<string>;
}

async function updateSubmission(
  submissionId: number,
  submission: SubmissionCreate
): Promise<ToApi<string>> {
  const response = await api.put<SubmissionCreate, ToApi<string>>(
    `/submissions/${submissionId}`,
    submission
  );
  return response.data as ToApi<string>;
}

async function getSubmissionForProfessor(assignmentId: number): Promise<ToApi<SubmissionProfessor[]>> {
  const response = await api.get<ToApi<SubmissionProfessor[]>>(
    `/submissions/assignments/${assignmentId}/professor`
  );
  return response.data;
}
async function getSubmissionForProfessorByStudent(assignmentId: number, studentId: number): Promise<ToApi<Submission>> {
  const response = await api.get<ToApi<Submission>>(
    `/submissions/assignments/${assignmentId}/professor/${studentId}`
  );
  return response.data;
}

async function deleteSubmission(submissionId: number): Promise<ToApi<string>> {
  const response = await api.delete<ToApi<string>>(
    `/submissions/${submissionId}`
  );
  return response.data as ToApi<string>;
}

async function update(
  assignmentId: number,
  assignment: AssignmentCreate
): Promise<ToApi<string>> {
  const response = await api.put<AssignmentCreate, ToApi<string>>(
    `/assignments/${assignmentId}`,
    assignment
  );
  return response.data as ToApi<string>;
}

async function del(assignmentId: number): Promise<ToApi<string>> {
  const response = await api.delete<ToApi<string>>(
    `/assignments/${assignmentId}`
  );
  return response.data as ToApi<string>;
}

const assignmentApi = {
  get,
  getByLectureId,
  post,
  getSubmissions,
  postSubmission,
  updateSubmission,
  deleteSubmission,
  update,
  delete: del,
  getSubmissionForProfessor,
  getSubmissionForProfessorByStudent
};

export default assignmentApi;
