import { useState, useMemo } from "react";

// ** design
import TitleBox from "@/design/Titles";

// ** molecules
import LectureCard from "./molecules/LectureCard.molecules";

// ** types
import { Lecture } from "@/types/Lecture";
import { Announcement } from "@/types/Announcement";
import { Assignment } from "@/types/Assignment";
import { Material } from "@/types/Material";

interface Props {
  lectures: Lecture[];
  assignments: Record<string, Assignment[]>;
  announcements: Record<string, Announcement[]>;
  materials: Record<string, Material[]>;
}

type SortOption = "dueDate" | "name" | "professor";
type SemesterOption = "all" | "FIRST_SEMESTER" | "SECOND_SEMESTER";

export default function LecturePage({
  lectures,
  assignments,
  announcements,
  materials,
}: Props) {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("dueDate");

  const styles = {
    container: "container mx-auto px-4 py-8",
    header: "mb-8",
    title: "text-2xl font-bold text-gray-900",
    subtitle: "text-gray-600 mt-2",
    controls: "flex flex-col sm:flex-row gap-4 mb-6",
    selectGroup: "flex flex-col sm:flex-row gap-2",
    select:
      "flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-kw-brown/50 focus:outline-none focus:ring-2 focus:ring-kw-brown/20",
    selectIcon: "w-4 h-4 text-gray-400",
    grid: "grid grid-cols-1 gap-4",
  };

  // 최근 3일 이내 생성된 항목인지 확인하는 함수
  const isNewItem = (createdAt: Date) => {
    return (
      new Date().getTime() - new Date(createdAt).getTime() <
      3 * 24 * 60 * 60 * 1000
    );
  };

  // 각 강의별 최근 업데이트 확인
  const getRecentUpdates = (lectureId: string) => {
    const lectureAssignments = assignments[lectureId] || [];
    const lectureAnnouncements = announcements[lectureId] || [];
    const lectureMaterials = materials[lectureId] || [];

    const recentAssignments = lectureAssignments.filter((a) =>
      isNewItem(a.createdAt)
    );
    const recentAnnouncements = lectureAnnouncements.filter((a) =>
      isNewItem(a.createdAt)
    );
    const recentMaterials = lectureMaterials.filter((m) =>
      isNewItem(m.createdAt)
    );

    return {
      hasNewContent:
        recentAssignments.length > 0 ||
        recentAnnouncements.length > 0 ||
        recentMaterials.length > 0,
      recentUpdates: [
        ...recentAssignments.map((a) => ({
          type: "assignment" as const,
          title: a.title,
        })),
        ...recentAnnouncements.map((a) => ({
          type: "announcement" as const,
          title: a.title,
        })),
        ...recentMaterials.map((m) => ({
          type: "material" as const,
          title: m.title,
        })),
      ],
    };
  };

  // 가장 빠른 과제 제출 기한 가져오기
  const getEarliestDueDate = (lectureId: string) => {
    const lectureAssignments = assignments[lectureId] || [];
    const upcomingAssignments = lectureAssignments.filter(
      (a) => new Date(a.dueDate) > new Date()
    );
    if (upcomingAssignments.length === 0) return new Date(9999, 11, 31);
    return new Date(
      Math.min(...upcomingAssignments.map((a) => new Date(a.dueDate).getTime()))
    );
  };

  // 필터링 및 정렬된 강의 목록
  const filteredAndSortedLectures = useMemo(() => {
    let filtered = lectures;

    // 연도 및 학기 필터링
    if (selectedSemester !== "all") {
      filtered = filtered.filter(
        (lecture) =>
          lecture.year.value === selectedYear &&
          lecture.semester === selectedSemester
      );
    } else {
      filtered = filtered.filter(
        (lecture) => lecture.year.value === selectedYear
      );
    }

    // 정렬
    return [...filtered].sort((a, b) => {
      const aDueDate = getEarliestDueDate(a.id.toString());
      const bDueDate = getEarliestDueDate(b.id.toString());

      switch (sortBy) {
        case "name":
          return a.courseResponseDto.courseName.localeCompare(
            b.courseResponseDto.courseName
          );
        case "professor":
          return a.professor.name.localeCompare(b.professor.name);
        case "dueDate":
        default:
          return aDueDate.getTime() - bDueDate.getTime();
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

      <div className={styles.grid}>
        {filteredAndSortedLectures.map((lecture) => {
          const { hasNewContent, recentUpdates } = getRecentUpdates(
            lecture.id.toString()
          );
          return (
            <LectureCard
              key={lecture.id}
              data={lecture}
              assignments={assignments[lecture.id.toString()] || []}
              announcements={announcements[lecture.id.toString()] || []}
              materials={materials[lecture.id.toString()] || []}
              hasNewContent={hasNewContent}
              recentUpdates={recentUpdates}
            />
          );
        })}
      </div>
    </div>
  );
}
