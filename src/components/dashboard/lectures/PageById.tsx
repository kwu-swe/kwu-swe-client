import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// ** organism
import AnnouncementTable from "@/components/dashboard/lectures/organism/AnnouncementTable.organism";
import MaterialTable from "@/components/dashboard/lectures/organism/MaterialTable.organism";
import AssignmentTable from "@/components/dashboard/lectures/organism/AssignmentTable.organism";

// ** molecules
import LectureInfo from "@/components/dashboard/lectures/molecules/LectureInfo.molecules";
import LectureStats from "@/components/dashboard/lectures/molecules/LectureStats.molecules";

// ** hooks
import useLecture from "@/hook/useLecture";
import useAssignment from "@/hook/useAssignment";
import useMaterial from "@/hook/useMaterial";
import useAnnouncement from "@/hook/useAnnouncement";

export default function LectureById({ lectureId }: { lectureId?: number }) {
  const navigate = useNavigate();
  const { lectures, isLoading } = useLecture();
  const { assignmentsByLecture } = useAssignment({
    lectureId: Number(lectureId),
  });
  const { materialsByLecture, isLoadingMaterialsByLecture } = useMaterial({
    lectureId: Number(lectureId),
  });
  const { announcementsByLecture, isLoadingAnnouncementsByLecture } =
    useAnnouncement({
      lectureId: Number(lectureId),
    });

  // 해당 강의 데이터 찾기
  const lectureData = useMemo(() => {
    if (!lectureId || !lectures) return null;
    return lectures.find((lecture) => lecture.lectureId === Number(lectureId));
  }, [lectureId, lectures]);

  if (
    isLoading ||
    isLoadingMaterialsByLecture ||
    isLoadingAnnouncementsByLecture
  ) {
    return <div>로딩 중...</div>;
  }

  if (!lectureData) {
    return <div>강의를 찾을 수 없습니다.</div>;
  }

  const container = {
    displays: "grid grid-cols-1 md:grid-cols-2 gap-5 pb-20",
  };

  const header = {
    displays: "md:col-span-2 px-2.5",
  };

  const title = {
    displays: "text-xl font-bold text-gray-900",
  };

  const subtitle = {
    displays: "ml-2 text-base font-medium text-gray-500",
  };

  const content = {
    displays: "md:col-span-1",
  };

  const fullWidth = {
    displays: "md:col-span-2",
  };

  return (
    <div className={container.displays}>
      <div className={header.displays}>
        <h1 className={title.displays}>
          {lectureData.courseResponseDto.courseName}
          <span className={subtitle.displays}>
            {lectureData.courseResponseDto.courseNumber}
          </span>
        </h1>
      </div>

      <div className={content.displays}>
        <LectureInfo data={lectureData} />
      </div>
      <div className={content.displays}>
        <LectureStats
          assignments={assignmentsByLecture || []}
          announcements={announcementsByLecture || []}
          materials={materialsByLecture || []}
          className="h-full"
        />
      </div>

      {/* 과제 목록 테이블 */}
      <div className={fullWidth.displays}>
        <AssignmentTable
          lectureId={Number(lectureId)}
          data={assignmentsByLecture || []}
          count={assignmentsByLecture?.length || 0}
          page={1}
          totalPages={1}
          onClick={(id) =>
            navigate(`/dashboard/lectures/${lectureId}/assignment/${id}`)
          }
        />
      </div>

      <hr className="md:col-span-2 w-full border-gray-100" />

      {/* 공지사항 및 자료 테이블 */}
      <div className={content.displays}>
        <AnnouncementTable
          data={announcementsByLecture || []}
          count={announcementsByLecture?.length || 0}
          page={1}
          totalPages={1}
          onClick={(id) =>
            navigate(`/dashboard/lectures/${lectureId}/announcement/${id}`)
          }
          onPageChange={(page) => {
            console.log(page);
          }}
        />
      </div>
      <div className={content.displays}>
        <MaterialTable
          data={materialsByLecture || []}
          count={materialsByLecture?.length || 0}
          page={1}
          totalPages={1}
          onClick={(id) =>
            navigate(`/dashboard/lectures/${lectureId}/material/${id}`)
          }
          onPageChange={(page) => {
            console.log(page);
          }}
        />
      </div>
    </div>
  );
}
