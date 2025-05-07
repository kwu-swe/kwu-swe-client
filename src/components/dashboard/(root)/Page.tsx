// ** Hooks
import { cn } from "fast-jsx/util";
import useLecture from "@/hook/useLecture";

// ** Organisms
import TimeTable from "./organism/Timetable.organism";
import SubjectList from "./organism/SubjectList.organism";

// ** Types
import { Lecture } from "@/types/Lecture";

// 테스트용 임시 데이터
const mockLectures: Lecture[] = [
  {
    id: 1,
    sizeLimit: 30,
    year: { value: 2024, leap: "윤년" },
    lectureStatus: "IN_PROGRESS",
    semester: "FIRST_SEMESTER",
    professor: {
      name: "김교수",
      studentNumber: "P001",
      phoneNumber: "010-1234-5678",
      role: "ROLE_PROFESSOR",
    },
    courseResponseDto: {
      courseId: 1,
      courseName: "자바 프로그래밍",
      courseNumber: "CS101",
      score: 3,
    },
    lectureScheduleAndLocation: [
      {
        day: "월",
        periods: [1, 2],
        room: "공학관 101",
      },
      {
        day: "수",
        periods: [1, 2],
        room: "공학관 101",
      },
    ],
  },
  {
    id: 2,
    sizeLimit: 25,
    year: { value: 2024, leap: "윤년" },
    lectureStatus: "IN_PROGRESS",
    semester: "FIRST_SEMESTER",
    professor: {
      name: "이교수",
      studentNumber: "P002",
      phoneNumber: "010-2345-6789",
      role: "ROLE_PROFESSOR",
    },
    courseResponseDto: {
      courseId: 2,
      courseName: "데이터베이스",
      courseNumber: "CS201",
      score: 3,
    },
    lectureScheduleAndLocation: [
      {
        day: "화",
        periods: [3, 4],
        room: "공학관 202",
      },
      {
        day: "목",
        periods: [3, 4],
        room: "공학관 202",
      },
    ],
  },
];

export default function Dashboard() {
  const container = {
    displays: "flex flex-col gap-y-3.5",
    sizes: "w-full",
  };
  const { lectures, isLoading } = useLecture();

  // 테스트를 위해 임시 데이터 사용
  // 실제 API 호출 시에는 lectures 변수를 사용합니다.
  // isLoading 상태에 따라 로딩 UI를 표시할 수 있습니다.
  const displayLectures =
    lectures && lectures.length > 0 ? lectures : mockLectures;

  return (
    <div className={cn(container)}>
      <TimeTable lectures={displayLectures} />
      <SubjectList />
    </div>
  );
}
