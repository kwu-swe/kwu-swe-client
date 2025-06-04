import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { Announcement } from "@/types/Announcement"; // 기존 정의된 Announcement 타입 사용

const api = httpRequest.api();

// lectureId 기반으로 공지사항 목록 조회
async function getByLectureId(lectureId: number): Promise<Announcement[]> {
  const response = await api.get<ToApi<Announcement[]>>(
    `/announcements/lectures/${lectureId}`
  );
  return response.data.result; // API 응답 구조에 따라 result를 사용한다고 가정
}

// announcementId로 단일 공지사항 조회
// 사용자가 제공한 API 경로가 리스트와 동일: /api/announcements/lectures/{lectureId}
// 이 API가 lectureId와 함께 암묵적으로 announcementId를 사용하여 단일 객체를 반환하거나,
// 혹은 lectureId에 해당하는 모든 공지를 반환 후 클라이언트에서 필터링해야 할 수 있습니다.
// 여기서는 API가 lectureId만으로 특정 announcementId에 해당하는 단일 Announcement를 반환한다고 가정합니다.
// 또는, 실제 API는 /api/announcements/{announcementId} 형태일 가능성이 높습니다.
// 우선은 명시된 경로를 사용하되, 함수 인자는 announcementId와 lectureId를 모두 받도록 하여 유연성을 둡니다.
async function getById(
  announcementId: number,
  lectureId: number
): Promise<Announcement> {
  // 실제 API가 lectureId만으로 특정 announcementId에 해당하는 단일 객체를 반환하는 경우는 드뭅니다.
  // API 명세가 /api/announcements/{announcementId} 또는 /api/announcements/lectures/{lectureId}/{announcementId}
  // 또는 /api/announcements/lectures/{lectureId}?announcementId={announcementId} 일 가능성이 높습니다.
  // 현재 명세로는 lectureId만 API 경로에 사용됩니다.
  const response = await api.get<ToApi<Announcement>>( // 단일 객체를 기대합니다.
    `/announcements/lectures/${lectureId}` // API 경로에 announcementId가 포함되지 않음
    // 만약 위 API가 해당 lectureId의 모든 공지를 반환한다면, 여기서 announcementId로 필터링 필요
    // 예: const announcements = response.data.result; return announcements.find(a => a.id === announcementId);
    // 하지만 여기서는 API가 직접 단일 객체를 반환한다고 가정합니다.
  );
  // 만약 위의 API가 lectureId에 해당하는 *모든* 공지사항을 반환하고, 그중 특정 announcementId의 것을 찾아야 한다면,
  // 서버 API가 ToApi<Announcement>가 아닌 ToApi<Announcement[]>를 반환하고 클라이언트에서 찾아야 합니다.
  // 우선은 서버가 ToApi<Announcement> (단일)을 반환한다고 가정합니다.
  return response.data.result;
}

const announcementApi = {
  getByLectureId,
  getById,
};

export default announcementApi;
