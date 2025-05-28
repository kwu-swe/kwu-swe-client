import { ToApi } from '@/types/Api';
import httpRequest from '../axios';
import { Assignment, AssignmentByLecture, AssignmentCreate } from '@/types/Assignment';
const api = httpRequest.api();

async function get(assignmentId: number): Promise<ToApi<Assignment[]>> {
	const response = await api.get<ToApi<Assignment[]>>(`/assignments/${assignmentId}`);
	return response.data;
}

async function getByLectureId(lectureId: number): Promise<ToApi<AssignmentByLecture[]>> {
	const response = await api.get<ToApi<AssignmentByLecture[]>>(`/assignments/lectures/${lectureId}`);
	return response.data;
}

async function post(lectureId: number, assignment: AssignmentCreate): Promise<ToApi<string>> {
	const response = await api.post<AssignmentCreate, ToApi<string>>(`/assignments/lectures/${lectureId}`, assignment);
	return response.data;
}

const assignmentApi = {
	get,
	getByLectureId,
	post,
}

export default assignmentApi;