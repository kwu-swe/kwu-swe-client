import { useState } from "react";
import { cn } from "fast-jsx/util";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// ** organism

// ** molecules

// ** types
import { Announcement } from "@/types/Announcement";

export default function SubjectAnnouncementById({
  subjectId,
  announcementId,
}: {
  subjectId?: string;
  announcementId?: string;
}) {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement>({
    id: 1,
    lectureId: 123,
    title: "2024학년도 1학기 중간고사 안내",
    content:
      "안녕하세요.\n\n2024학년도 1학기 중간고사 일정을 안내드립니다.\n\n1. 시험 기간: 2024년 4월 15일(월) ~ 4월 19일(금)\n2. 시험 시간: 각 과목별 수업 시간\n3. 시험 장소: 각 강의실\n\n시험 준비 잘하시기 바랍니다.\n\n감사합니다.",
    createdAt: new Date("2024-03-20T09:00:00"),
  });

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100",
    shadow: "shadow-card",
    rounded: "rounded-xl",
    body: "flex flex-col p-4 md:p-8",
    header:
      "flex flex-row justify-between items-center p-2.5 gap-3 md:gap-5 border-b border-gray-100",
    headerTitle:
      "flex flex-row items-center gap-2 px-2 text-sm text-gray-950 font-semibold",
  };

  return (
    <div>
      <button
        onClick={() => navigate(`/dashboard/subjects/${subjectId}`)}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
      >
        <MdArrowBack className="w-5 h-5" />
        <span className="text-sm">돌아가기</span>
      </button>

      <div className={cn(cardStyles.base, cardStyles.rounded, "shadow-table")}>
        <div className={cardStyles.header}>
          <div className={cardStyles.headerTitle}>
            <span>공지사항</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-center">
            <p className="text-gray-500 text-xs w-[80px]">제목</p>
            <p className="text-gray-700 text-sm font-medium">
              {announcement.title}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500 text-xs w-[80px]">작성일</p>
            <p className="text-gray-700 text-sm font-medium">
              {announcement.createdAt.toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-xs">내용</p>
            <div className="text-gray-700 text-sm whitespace-pre-wrap">
              {announcement.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
