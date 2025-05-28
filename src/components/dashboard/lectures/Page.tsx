import { useState, useMemo } from "react";

// ** hooks
import useLecture from "@/hook/useLecture";

// ** design
import TitleBox from "@/design/Titles";
import ComponentLoading from "@/design/ComponentLoading";

// ** molecules
import LectureCard from "./molecules/LectureCard.molecules";

// ** icons
import { MdAssignment } from "react-icons/md";

type SortOption = "dueDate" | "name" | "professor";
type SemesterOption = "all" | "FIRST_SEMESTER" | "SECOND_SEMESTER";

export default function LecturePage() {
  const { studentLectures: lectures, isLoading } = useLecture();

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("dueDate");

  const container = {
    displays: "container mx-auto py-8",
  };

  const header = {
    displays: "mb-8 space-y-2",
  };

  const controls = {
    displays: "flex flex-col sm:flex-row gap-4 mb-8",
    backgrounds: "bg-white",
    paddings: "p-4",
    boundaries: "rounded-xl shadow-sm border border-gray-100",
  };

  const selectGroup = {
    displays: "flex flex-col sm:flex-row gap-3 flex-1",
  };

  const selectWrapper = {
    displays: "flex-1",
  };

  const selectLabel = {
    displays: "block",
    fonts: "text-sm font-medium text-gray-700",
    margins: "mb-1.5",
  };

  const select = {
    displays: "w-full",
    paddings: "px-4 py-2.5",
    backgrounds: "bg-white",
    boundaries: "border border-gray-200 rounded-lg",
    fonts: "text-sm text-gray-700",
    effects:
      "hover:border-kw-brown/50 focus:outline-none focus:ring-2 focus:ring-kw-brown/20",
    transitions: "transition-all duration-200",
  };

  const grid = {
    displays: "grid grid-cols-1 gap-4",
  };

  const emptyState = {
    displays: "text-center",
    paddings: "py-12",
  };

  const emptyStateIcon = {
    displays: "w-12 h-12 text-gray-400 mx-auto",
    margins: "mb-4",
  };

  const emptyStateText = {
    displays: "text-gray-500 text-lg",
  };

  // 필터링 및 정렬된 강의 목록
  const filteredAndSortedLectures = useMemo(() => {
    // 필터링 기능 일시 비활성화
    return lectures;
  }, [lectures]);

  // 연도 옵션 생성 (현재 연도 기준 전후 2년)
  const yearOptions = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

  if (isLoading) {
    return <ComponentLoading />;
  }

  return (
    <div className={container.displays}>
      <div className={header.displays}>
        <TitleBox
          title="수강 강의"
          subtitle={`${filteredAndSortedLectures.length}개의 강의를 수강하고 있습니다`}
        />
      </div>

      <div
        className={`${controls.displays} ${controls.backgrounds} ${controls.paddings} ${controls.boundaries}`}
      >
        <div className={selectGroup.displays}>
          <div className={selectWrapper.displays}>
            <label
              className={`${selectLabel.displays} ${selectLabel.fonts} ${selectLabel.margins}`}
            >
              연도
            </label>
            <select
              className={`${select.displays} ${select.paddings} ${select.backgrounds} ${select.boundaries} ${select.fonts} ${select.effects} ${select.transitions}`}
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
          </div>

          <div className={selectWrapper.displays}>
            <label
              className={`${selectLabel.displays} ${selectLabel.fonts} ${selectLabel.margins}`}
            >
              학기
            </label>
            <select
              className={`${select.displays} ${select.paddings} ${select.backgrounds} ${select.boundaries} ${select.fonts} ${select.effects} ${select.transitions}`}
              value={selectedSemester}
              onChange={(e) =>
                setSelectedSemester(e.target.value as SemesterOption)
              }
            >
              <option value="all">전체 학기</option>
              <option value="FIRST_SEMESTER">1학기</option>
              <option value="SECOND_SEMESTER">2학기</option>
            </select>
          </div>

          <div className={selectWrapper.displays}>
            <label
              className={`${selectLabel.displays} ${selectLabel.fonts} ${selectLabel.margins}`}
            >
              정렬
            </label>
            <select
              className={`${select.displays} ${select.paddings} ${select.backgrounds} ${select.boundaries} ${select.fonts} ${select.effects} ${select.transitions}`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="dueDate">과제 제출 기한순</option>
              <option value="name">강의명순</option>
              <option value="professor">교수명순</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSortedLectures.length === 0 ? (
        <div className={emptyState.displays}>
          <MdAssignment className={emptyStateIcon.displays} />
          <p className={emptyStateText.displays}>
            선택한 학기에 수강하는 강의가 없습니다
          </p>
        </div>
      ) : (
        <div className={grid.displays}>
          {filteredAndSortedLectures.map((lecture) => (
            <LectureCard
              key={lecture.lectureId}
              data={lecture}
              // assignments={[]} // assignments[lecture.id.toString()] ||
              // announcements={[]} // announcements[lecture.id.toString()] ||
              // materials={[]} // materials[lecture.id.toString()] ||
              // hasNewContent={false} // hasNewContent
              // recentUpdates={[]} // recentUpdates
            />
          ))}
        </div>
      )}
    </div>
  );
}
