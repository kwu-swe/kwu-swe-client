import announcementApi from "@/service/api/announcement";
import { Announcement, AnnouncementCreate, AnnouncementList } from "@/types/Announcement";
import {
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

export default function useAnnouncement({
  announcementId,
  lectureId,
}: {
  announcementId?: number;
  lectureId?: number;
}) {
  const queryClient = useQueryClient();

  // 단일 공지사항 조회
  const {
    data: announcement,
    isLoading: isLoadingAnnouncement,
    error: announcementError,
  } = useQuery<Announcement | null, Error>({
    queryKey: ["announcement", announcementId, lectureId],
    queryFn: async () => {
      if (!announcementId || !lectureId) return null;
      return announcementApi.getById(announcementId, lectureId);
    },
    enabled: !!announcementId && !!lectureId,
  });

  // 강의별 공지사항 목록 조회
  const {
    data: announcementsByLecture,
    isLoading: isLoadingAnnouncementsByLecture,
    error: announcementsByLectureError,
  } = useQuery<AnnouncementList[], Error>({
    queryKey: ["announcements", lectureId],
    queryFn: async () => {
      if (!lectureId) return [];
      return announcementApi.getByLectureId(lectureId);
    },
    enabled: !!lectureId,
  });

  // 공지사항 생성
  const { mutate: createAnnouncement, isPending: isCreating } = useMutation({
    mutationFn: ({ lectureId, announcement }: { lectureId: number; announcement: AnnouncementCreate }) => announcementApi.create(lectureId, announcement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements", lectureId] });
      alert("공지사항이 성공적으로 등록되었습니다.");
    },
    onError: () => {
      alert("공지사항 등록에 실패했습니다.");
    },
  });

  // 공지사항 수정
  const { mutate: updateAnnouncement, isPending: isUpdating } = useMutation({
    mutationFn: ({ announcementId, announcement }: { announcementId: number; announcement: AnnouncementCreate }) =>
      announcementApi.update(announcementId, announcement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements", lectureId] });
      queryClient.invalidateQueries({ queryKey: ["announcement", announcementId, lectureId] });
      alert("공지사항이 성공적으로 수정되었습니다.");
    },
    onError: () => {
      alert("공지사항 수정에 실패했습니다.");
    },
  });

  // 공지사항 삭제
  const { mutate: deleteAnnouncement, isPending: isDeleting } = useMutation({
    mutationFn: (announcementId: number) => announcementApi.delete(announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements", lectureId] });
      alert("공지사항이 성공적으로 삭제되었습니다.");
    },
    onError: () => {
      alert("공지사항 삭제에 실패했습니다.");
    },
  });

  return {
    announcement,
    isLoadingAnnouncement,
    announcementError,
    announcementsByLecture,
    isLoadingAnnouncementsByLecture,
    announcementsByLectureError,
    createAnnouncement,
    isCreating,
    updateAnnouncement,
    isUpdating,
    deleteAnnouncement,
    isDeleting,
  };
}
