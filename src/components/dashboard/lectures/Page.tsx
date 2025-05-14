import { useState, useMemo } from "react";
import { MdAssignment } from "react-icons/md";

// ** design
import TitleBox from "@/design/Titles";
import ComponentLoading from "@/design/ComponentLoading";

// ** molecules
import LectureCard from "./molecules/LectureCard.molecules";

// ** hooks
import useLecture from "@/hook/useLecture";

// ** types
import { Lecture } from "@/types/Lecture";

type SortOption = "dueDate" | "name" | "professor";
type SemesterOption = "all" | "FIRST_SEMESTER" | "SECOND_SEMESTER";

export default function LecturePage() {
  const { lectures, isLoading } = useLecture();

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("dueDate");

  if (isLoading) {
    return <ComponentLoading />;
  }

  const styles = {
    container: "container mx-auto py-8",
    header: "mb-8 space-y-2",
    title: "text-3xl font-bold text-gray-900 tracking-tight",
    subtitle: "text-gray-600 text-lg",
    controls:
      "flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100",
    selectGroup: "flex flex-col sm:flex-row gap-3 flex-1",
    selectWrapper: "flex-1",
    selectLabel: "block text-sm font-medium text-gray-700 mb-1.5",
    select:
      "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-kw-brown/50 focus:outline-none focus:ring-2 focus:ring-kw-brown/20 transition-all duration-200",
    selectIcon: "w-4 h-4 text-gray-400",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    emptyState: "text-center py-12",
    emptyStateIcon: "w-12 h-12 text-gray-400 mx-auto mb-4",
    emptyStateText: "text-gray-500 text-lg",
  };

  // 필터링 및 정렬된 강의 목록
  const filteredAndSortedLectures = useMemo(() => {
    let filtered = lectures;

    // 연도 및 학기 필터링
    if (selectedSemester !== "all") {
      filtered = filtered.filter(
        (lecture: Lecture) =>
          lecture.year.value === selectedYear &&
          lecture.semester === selectedSemester
      );
    } else {
      filtered = filtered.filter(
        (lecture: Lecture) => lecture.year.value === selectedYear
      );
    }

    // 정렬
    return [...filtered].sort((a: Lecture, b: Lecture) => {
      switch (sortBy) {
        case "name":
          return a.courseResponseDto.courseName.localeCompare(
            b.courseResponseDto.courseName
          );
        case "professor":
          return a.professor.name.localeCompare(b.professor.name);
        case "dueDate":
        default:
          return 0;
      }
    });
  }, [lectures, selectedYear, selectedSemester, sortBy]);

  // 연도 옵션 생성 (현재 연도 기준 전후 2년)
  const yearOptions = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TitleBox
          title="수강 강의"
          subtitle={`${filteredAndSortedLectures.length}개의 강의를 수강하고 있습니다`}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>연도</label>
            <select
              className={styles.select}
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

          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>학기</label>
            <select
              className={styles.select}
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

          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>정렬</label>
            <select
              className={styles.select}
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
        <div className={styles.emptyState}>
          <MdAssignment className={styles.emptyStateIcon} />
          <p className={styles.emptyStateText}>
            선택한 학기에 수강하는 강의가 없습니다
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredAndSortedLectures.map((lecture: Lecture) => (
            <LectureCard
              key={lecture.id}
              data={lecture}
              assignments={[]}
              announcements={[]}
              materials={[]}
              hasNewContent={false}
              recentUpdates={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
