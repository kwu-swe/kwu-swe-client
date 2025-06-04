import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { Announcement, AnnouncementCreate, AnnouncementList } from "@/types/Announcement";

const api = httpRequest.api();

// lectureId 기반으로 공지사항 목록 조회
async function getByLectureId(lectureId: number): Promise<AnnouncementList[]> {
  const response = await api.get<ToApi<AnnouncementList[]>>(
    `/announcements/lectures/${lectureId}`
  );
  return response.data.result;
}
async function getById(
  announcementId: number,
  _lectureId: number // 사용하지 않는 매개변수는 _로 시작
): Promise<Announcement> {
  const response = await api.get<ToApi<Announcement>>(
    `/announcements/${announcementId}`
  );
  return (response.data as ToApi<Announcement>).result;
}

async function create(lectureId: number, announcement: AnnouncementCreate) {
  const response = await api.post<AnnouncementCreate, ToApi<Announcement>>(
    `/announcements/lectures/${lectureId}`,
    announcement
  );
  return response.data;
}

const announcementApi = {
  getByLectureId,
  getById,
  create,
};

export default announcementApi;
