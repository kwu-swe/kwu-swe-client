// ** Hooks
import { cn } from "fast-jsx/util";
import useLecture from "@/hook/useLecture";

// ** Organisms
import TimeTable from "./organism/Timetable.organism";
import SubjectList from "./organism/SubjectList.organism";

// ** Types
import { Lecture } from "@/types/Lecture";
import useUser from "@/hook/useUser";
import { useEffect } from "react";

// 테스트용 데이터
const mockLectures = [
  {
    id: 1,
    sizeLimit: 30,
    year: 2024,
    lectureStatus: "IN_PROGRESS",
    semester: "FIRST_SEMESTER",
    professor: {
      name: "김교수",
      code: "P001",
      phoneNumber: "010-1234-5678",
      role: "ROLE_PROFESSOR",
    },
    courseResponseDto: {
      courseName: "웹 프로그래밍",
      courseNumber: "CS101",
      score: 3,
      courseId: 1,
    },
    lectureTimeAndLocation: [
      {
        key: "MON_1",
        value: 101,
      },
      {
        key: "MON_2",
        value: 101,
      },
      {
        key: "WED_1",
        value: 101,
      },
      {
        key: "WED_2",
        value: 101,
      }
    ],
  },
  {
    id: 2,
    sizeLimit: 25,
    year: 2024,
    semester: "FIRST_SEMESTER",
    professor: {
      name: "이교수",
      code: "P002",
      phoneNumber: "010-2345-6789",
      role: "ROLE_PROFESSOR" as const,
    },
    courseResponseDto: {
      courseName: "데이터베이스 시스템",
      courseNumber: "CS102",
      score: 3,
      courseId: 2,
    },
    lectureTimeAndLocation: [
      {
        key: "TUE_3",
        value: 102,
      },
      {
        key: "TUE_4",
        value: 102,
      },
      {
        key: "THU_3",
        value: 102,
      },
      {
        key: "THU_4",
        value: 102,
      }
    ],
    lectureStatus: "IN_PROGRESS" as const,
  },
  {
    id: 3,
    sizeLimit: 35,
    year: 2024,
    semester: "FIRST_SEMESTER",
    professor: {
      name: "박교수",
      code: "P003",
      phoneNumber: "010-3456-7890",
      role: "ROLE_PROFESSOR" as const,
    },
    courseResponseDto: {
      courseName: "운영체제",
      courseNumber: "CS103",
      score: 3,
      courseId: 3,
    },
    lectureTimeAndLocation: [
      {
        key: "WED_5",
        value: 103,
      },
      {
        key: "WED_6",
        value: 103,
      },
      {
        key: "FRI_5",
        value: 103,
      },
      {
        key: "FRI_6",
        value: 103,
      }
    ],
    lectureStatus: "IN_PROGRESS" as const,
  },
] as Lecture[];

const mockAssignments = {
  "1": [
    {
      id: 1,
      lectureId: 1,
      title: "웹 프로젝트 과제",
      description: "React를 이용한 웹 애플리케이션 개발",
      content: "상세 내용...",
      dueDate: new Date("2025-04-30"),
      createdAt: new Date("2025-03-15"),
      isPublic: true,
      extendedDueDate: new Date("2025-04-30"),
      allowResubmission: false,
    },
  ],
  "2": [
    {
      id: 2,
      lectureId: 2,
      title: "데이터베이스 설계 과제",
      description: "ERD 설계 및 정규화",
      content: "상세 내용...",
      dueDate: new Date("2025-04-25"),
      createdAt: new Date("2025-03-20"),
      isPublic: true,
      extendedDueDate: new Date("2025-04-25"),
      allowResubmission: false,
    },
  ],
  "3": [],
};

const mockAnnouncements = {
  "1": [
    {
      id: 1,
      lectureId: 1,
      title: "중간고사 일정 안내",
      content: "4월 15일 오후 2시",
      createdAt: new Date("2025-03-25"),
    },
  ],
  "2": [],
  "3": [
    {
      id: 3,
      lectureId: 3,
      title: "강의 자료 업로드",
      content: "프로세스 관리 챕터 자료",
      createdAt: new Date("2025-03-28"),
    },
  ],
};

const mockMaterials = {
  "1": [
    {
      id: 1,
      lectureId: 1,
      title: "React 기초",
      content: "React 기초 강의 자료",
      fileUrl: "/materials/react-basics.pdf",
      createdAt: new Date("2025-03-10"),
    },
  ],
  "2": [
    {
      id: 2,
      lectureId: 2,
      title: "SQL 기초",
      content: "SQL 기초 강의 자료",
      fileUrl: "/materials/sql-basics.pdf",
      createdAt: new Date("2025-03-12"),
    },
  ],
  "3": [
    {
      id: 3,
      lectureId: 3,
      title: "프로세스 관리",
      content: "프로세스 관리 강의 자료",
      fileUrl: "/materials/process-management.pdf",
      createdAt: new Date("2025-03-28"),
    },
  ],
};

export default function Dashboard() {
  const container = {
    displays: "flex flex-col gap-y-10",
    sizes: "w-full",
  };
  const { user } = useUser();
  useEffect(() => {
    console.log(user);
  }, [user]);

  const { lectures, isLoading } = useLecture();

  // 테스트를 위해 임시 데이터 사용
  // 실제 API 호출 시에는 lectures 변수를 사용합니다.
  // isLoading 상태에 따라 로딩 UI를 표시할 수 있습니다.
  const displayLectures = (
    lectures && lectures.length > 0 ? lectures : mockLectures
  ) as Lecture[];

  return (
    <div className={cn(container)}>
      <TimeTable lectures={displayLectures} />
      <SubjectList
        lectures={mockLectures}
        assignments={mockAssignments}
        announcements={mockAnnouncements}
        materials={mockMaterials}
      />
    </div>
  );
}
