import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import {
  Assignment,
  AssignmentByLecture,
  AssignmentCreate,
  Submission,
  SubmissionCreate,
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
async function getSubmissions(assignmentId: number): Promise<ToApi<Submission>> {
  const response = await api.get<ToApi<Submission>>(`/submissions/assignments/${assignmentId}`);
  return response.data;
}
async function postSubmission(assignmentId: number, submission: SubmissionCreate): Promise<ToApi<string>> {
  const response = await api.post<SubmissionCreate, ToApi<string>>(`/submissions/assignments/${assignmentId}`, submission);
  return response.data as ToApi<string>;
}

const assignmentApi = {
  get,
  getByLectureId,
  post,
  getSubmissions,
  postSubmission,
};

export default assignmentApi;
