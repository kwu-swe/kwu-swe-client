import announcementApi from "@/service/api/announcement";
import { Announcement } from "@/types/Announcement";
import {
  useQueries,
  // useQueryClient, // 뮤테이션 구현 시 필요
  UseQueryResult,
} from "@tanstack/react-query";

export default function useAnnouncement({
  announcementId,
  lectureId,
}: {
  announcementId?: number;
  lectureId?: number;
}) {
  // const queryClient = useQueryClient(); // 뮤테이션에서 사용될 수 있으므로 필요시 주석 해제

  const [
    { data: announcement, isLoading: isLoadingAnnouncement }, // 단일 공지사항
    {
      data: announcementsByLecture,
      isLoading: isLoadingAnnouncementsByLecture,
    }, // 강의별 공지사항 목록
  ] = useQueries({
    queries: [
      {
        queryKey: ["announcementGetById", announcementId, lectureId], // lectureId도 키에 포함
        queryFn: async () => {
          if (!announcementId || !lectureId) return undefined;
          // getById가 lectureId도 인자로 받는다고 가정
          return announcementApi.getById(announcementId, lectureId);
        },
        enabled: !!announcementId && !!lectureId, // announcementId와 lectureId 모두 있어야 활성화
      },
      {
        queryKey: ["announcementsGetByLectureId", lectureId],
        queryFn: async () => {
          if (!lectureId) return undefined;
          return announcementApi.getByLectureId(lectureId);
        },
        enabled: !!lectureId,
      },
    ],
  }) as [
    UseQueryResult<Announcement | undefined, Error>,
    UseQueryResult<Announcement[] | undefined, Error>
  ];

  return {
    announcement,
    isLoadingAnnouncement,
    announcementsByLecture,
    isLoadingAnnouncementsByLecture,
    // TODO: 공지사항 생성, 수정, 삭제 뮤테이션 추가 (필요시)
  };
}
