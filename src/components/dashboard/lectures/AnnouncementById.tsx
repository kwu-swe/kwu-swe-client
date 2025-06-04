import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";

// ** organism

// ** molecules

// ** hooks
import useAnnouncement from "@/hook/useAnnouncement";

// ** assets
import { MdArrowBack } from "react-icons/md";

export default function LectureAnnouncementById({
  lectureId,
  announcementId,
}: {
  lectureId?: string;
  announcementId?: string;
}) {
  const navigate = useNavigate();

  // useAnnouncement 훅 사용
  const {
    announcement,
    isLoadingAnnouncement: isLoading, // 이름 변경하여 기존 로직과 호환
    announcementError: error, // 이름 변경하여 기존 로직과 호환
  } = useAnnouncement({
    announcementId: announcementId ? Number(announcementId) : undefined,
    lectureId: lectureId ? Number(lectureId) : undefined,
  });

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100 overflow-hidden",
    shadow: "shadow-card",
    rounded: "rounded-xl",
    body: "flex flex-col p-4 md:p-8",
    header:
      "flex flex-row justify-between items-center p-2.5 gap-3 md:gap-5 border-b border-gray-100",
    headerTitle:
      "flex flex-row items-center gap-2 px-2 text-sm text-gray-950 font-semibold",
  };

  const tableStyles = {
    row: "border-b border-gray-100 flex",
    label: "py-3 px-4 text-gray-500 text-xs font-medium w-[120px] bg-gray-100",
    value: "py-3 px-4 text-gray-700 text-sm flex-1",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">공지사항을 불러오는 중입니다...</p>
      </div>
    );
  }

  // useAnnouncement 훅의 error 객체는 Error 타입이므로, isError 플래그 대신 error 객체 유무로 판단
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500">공지사항을 불러오는데 실패했습니다.</p>
        <p className="text-xs text-gray-400 mt-1">
          {error.message || "알 수 없는 오류가 발생했습니다."}
        </p>
        <button
          onClick={() => navigate(`/dashboard/lectures/${lectureId}`)}
          className="mt-4 flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <MdArrowBack className="w-5 h-5" />
          <span className="text-sm">돌아가기</span>
        </button>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">해당 공지사항을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate(`/dashboard/lectures/${lectureId}`)}
          className="mt-4 flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <MdArrowBack className="w-5 h-5" />
          <span className="text-sm">돌아가기</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(`/dashboard/lectures/${lectureId}`)}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4 transition-colors duration-150 hover:text-kw-purple active:scale-95"
      >
        <MdArrowBack className="w-5 h-5" />
        <span className="text-sm">목록으로 돌아가기</span>
      </button>

      <div className={cn(cardStyles.base, cardStyles.rounded, "shadow-table")}>
        <div className={cardStyles.header}>
          <div className={cardStyles.headerTitle}>
            <span>공지사항 상세</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className={tableStyles.row}>
            <div className={tableStyles.label}>제목</div>
            <div className={tableStyles.value}>{announcement.title}</div>
          </div>
          {/* createdAt 필드는 Announcement 타입에 없으므로 주석 처리 또는 제거 
          <div className={tableStyles.row}>
            <div className={tableStyles.label}>작성일</div>
            <div className={tableStyles.value}>
              {new Date(announcement.createdAt).toLocaleDateString()} 
            </div>
          </div>
          */}
          {/* writer 정보가 있다면 표시 (Announcement 타입에 writer 속성 있음) */}
          {announcement.writer && (
            <div className={tableStyles.row}>
              <div className={tableStyles.label}>작성자</div>
              <div className={tableStyles.value}>{announcement.writer}</div>
            </div>
          )}
          <div className={tableStyles.row}>
            <div className={cn(tableStyles.label, "align-top")}>내용</div>
            <div
              className={cn(
                tableStyles.value,
                "whitespace-pre-wrap leading-relaxed"
              )}
            >
              {announcement.content}
            </div>
          </div>
          {/* encodedFiles가 있다면 표시하는 로직 (필요시 추가) */}
          {/* {announcement.encodedFiles &&
            announcement.encodedFiles.length > 0 && (
              <div className={tableStyles.row}>
                <div className={cn(tableStyles.label, "align-top")}>
                  첨부파일
                </div>
                <div className={tableStyles.value}>
                  <ul>
                    {announcement.encodedFiles.map((file, index) => (
                      // TODO: 파일 다운로드 또는 보기 링크로 변경해야 함
                      //       현재 encodedFiles가 base64 문자열 배열로 가정하고, 실제 파일명이나 파일타입 정보는 없음.
                      //       API 응답에 파일명, 파일타입, 다운로드 URL 등이 포함되어야 제대로 처리 가능.
                      <li
                        key={index}
                        className="text-sm text-blue-600 hover:underline cursor-pointer"
                      >
                        {`첨부파일 ${index + 1}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
}
