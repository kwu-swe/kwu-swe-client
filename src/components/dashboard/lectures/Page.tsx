import { useState, useMemo, useEffect } from "react";

// ** hooks
import useLecture from "@/hook/useLecture";

// ** design
import TitleBox from "@/design/Titles";
import ComponentLoading from "@/design/ComponentLoading";

// ** molecules
import LectureCard from "./molecules/LectureCard.molecules";

// ** icons
import { MdAssignment } from "react-icons/md";

// type SortOption = "dueDate" | "name" | "professor"; // 정렬 타입 삭제
type SemesterOption = "all" | "FIRST_SEMESTER" | "SECOND_SEMESTER";

export default function LecturePage() {
  const { studentLectures: lectures, isLoading } = useLecture();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterOption>("all");
  // const [sortBy, setSortBy] = useState<SortOption>("dueDate"); // 정렬 상태 삭제

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

  // 필터링된 강의 목록 (정렬 로직 완전 삭제)
  const filteredLectures = useMemo(() => {
    if (!lectures) return [];

    let filtered = lectures;

    if (selectedYear !== null) {
      filtered = filtered.filter((lecture) => lecture.year === selectedYear);
    }

    if (selectedSemester !== "all") {
      filtered = filtered.filter(
        (lecture) => lecture.semester === selectedSemester
      );
    }
    return filtered;
  }, [lectures, selectedYear, selectedSemester]);

  // 연도 옵션 생성
  const yearOptions = useMemo(() => {
    if (!lectures) return []; // 데이터 없으면 빈 배열
    const years = new Set(lectures.map((lecture) => lecture.year));
    return Array.from(years).sort((a, b) => b - a);
  }, [lectures]);

  // selectedYear 초기화 및 yearOptions 변경에 따른 업데이트 로직 수정
  useEffect(() => {
    // lectures 데이터가 로드되고 yearOptions가 준비되었을 때,
    // 그리고 selectedYear가 아직 설정되지 않았거나 (null) 유효하지 않은 값일 때만 초기화
    if (lectures && yearOptions.length > 0) {
      if (selectedYear === null || !yearOptions.includes(selectedYear)) {
        setSelectedYear(yearOptions[0]); // 가장 최근 연도를 기본값으로 설정
      }
    }
    // selectedYear가 사용자에 의해 유효한 값으로 이미 설정된 경우, lectures가 바뀌어도 그 값을 유지해야 함.
    // 단, lectures가 바뀌어서 기존 selectedYear가 더 이상 yearOptions에 없다면 업데이트 필요.
    else if (
      lectures &&
      selectedYear !== null &&
      !yearOptions.includes(selectedYear)
    ) {
      // 현재 선택된 연도가 새 옵션 목록에 없으면, 목록의 첫 번째 값으로 설정하거나 null (전체)로 설정
      setSelectedYear(yearOptions.length > 0 ? yearOptions[0] : null);
    }
  }, [lectures, yearOptions]); // selectedYear를 의존성 배열에서 제거하여 사용자 선택이 덮어쓰이는 것을 방지, lectures 추가

  if (isLoading) {
    return <ComponentLoading />;
  }

  return (
    <div className={container.displays}>
      <div className={header.displays}>
        <TitleBox
          title="수강 강의"
          subtitle={`${filteredLectures.length}개의 강의를 수강하고 있습니다`}
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
              value={selectedYear === null ? "" : selectedYear}
              onChange={(e) =>
                setSelectedYear(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            >
              <option value="">전체 연도</option>
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
        </div>
      </div>

      {filteredLectures.length === 0 ? (
        <div className={emptyState.displays}>
          <MdAssignment className={emptyStateIcon.displays} />
          <p className={emptyStateText.displays}>
            선택한 학기에 수강하는 강의가 없습니다
          </p>
        </div>
      ) : (
        <div className={grid.displays}>
          {filteredLectures.map((lecture, index) => (
            <LectureCard key={`${lecture.lectureId}-${index}`} data={lecture} />
          ))}
        </div>
      )}
    </div>
  );
}
