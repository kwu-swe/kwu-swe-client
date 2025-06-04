import {
  Lecture,
  LectureAssistantCreate,
  LectureCreate,
  LecturePlan,
  LecturePlanCreate,
  LectureUpdate,
} from "@/types/Lecture";
import httpRequest from "../axios";
import { ToApi } from "@/types/Api";
import { Grade, GradeType } from "@/types/Grade";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Lecture[]>>("/lectures");
  return response.data.result;
}

async function post(code: string, data: LectureCreate) {
  const response = await api.post<LectureCreate>(`/lectures`, data, {
    params: {
      code,
    },
  });
  return response.data;
}

async function patch(id: number, data: LectureUpdate) {
  const response = await api.patch<LectureUpdate>(`/lectures/${id}`, data);
  return response.data;
}

async function _delete(id: number) {
  const response = await api.delete(`/lectures/${id}`);
  return response.data;
}

async function postStudentLecture(lectureId: number) {
  const response = await api.post<LectureCreate>(`/lectures/${lectureId}`);
  return response.data;
}

async function getStudentLectures(code: string) {
  const response = await api.get<ToApi<Lecture[]>>("/lectures/students", {
    params: {
      code,
    },
  });
  return response.data.result;
}

async function postAssistant(data: LectureAssistantCreate) {
  const response = await api.post<LectureAssistantCreate>(
    `/lectures/${data.lectureId}/assistants/${data.assistantNumber}`,
    data
  );
  return response.data;
}

async function getPlan(lectureId: number) {
  const response = await api.get<ToApi<LecturePlan>>(`/plans/lectures/${lectureId}`);
  return response.data;
}
async function postPlan(lectureId: number, data: LecturePlanCreate) {
  const response = await api.post<LecturePlanCreate>(`/plans/lectures/${lectureId}`, data);
  return response.data;
}

async function getGrade(lectureId: number) {
  const response = await api.get<ToApi<Grade[]>>(`/lectures/${lectureId}/grades`);
  return response.data;
}

async function patchGrade(lectureId: number, studentId: number, grade: GradeType) {
  const response = await api.patch<Grade>(`/lectures/${lectureId}/students/${studentId}/grades`, undefined, {
    params: {
      grade,
    },
  });
  return response.data;
}

const lectureApi = {
  get,
  post,
  patch,
  delete: _delete,
  postAssistant,
  getStudentLectures,
  postStudentLecture,
  plan: {
    get: getPlan,
    post: postPlan,
  },
  grade: {
    get: getGrade,
    patch: patchGrade,
  },
};

export default lectureApi;
