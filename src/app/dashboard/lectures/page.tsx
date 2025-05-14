import LecturePage from "@/components/dashboard/lectures/Page";

// 테스트용 데이터
const mockLectures = [
  {
    id: 1,
    courseResponseDto: {
      courseName: "웹 프로그래밍",
      courseNumber: "CS101",
      score: 3,
      courseId: 1,
    },
    professor: {
      name: "김교수",
      studentNumber: "P2025001",
      phoneNumber: "010-1234-5678",
      role: "ROLE_PROFESSOR" as const,
    },
    year: {
      value: 2025,
      leap: "false",
    },
    semester: "FIRST_SEMESTER" as const,
    lectureScheduleAndLocation: [
      {
        day: "월",
        periods: [1, 2],
        room: "정보관 301호",
      },
    ],
    sizeLimit: 30,
    lectureStatus: "IN_PROGRESS" as const,
  },
  {
    id: 2,
    courseResponseDto: {
      courseName: "데이터베이스 시스템",
      courseNumber: "CS102",
      score: 3,
      courseId: 2,
    },
    professor: {
      name: "이교수",
      studentNumber: "P2025002",
      phoneNumber: "010-2345-6789",
      role: "ROLE_PROFESSOR" as const,
    },
    year: {
      value: 2025,
      leap: "false",
    },
    semester: "FIRST_SEMESTER" as const,
    lectureScheduleAndLocation: [
      {
        day: "화",
        periods: [3, 4],
        room: "정보관 302호",
      },
    ],
    sizeLimit: 25,
    lectureStatus: "IN_PROGRESS" as const,
  },
  {
    id: 3,
    courseResponseDto: {
      courseName: "운영체제",
      courseNumber: "CS103",
      score: 3,
      courseId: 3,
    },
    professor: {
      name: "박교수",
      studentNumber: "P2025003",
      phoneNumber: "010-3456-7890",
      role: "ROLE_PROFESSOR" as const,
    },
    year: {
      value: 2025,
      leap: "false",
    },
    semester: "FIRST_SEMESTER" as const,
    lectureScheduleAndLocation: [
      {
        day: "수",
        periods: [1, 2],
        room: "정보관 303호",
      },
    ],
    sizeLimit: 35,
    lectureStatus: "IN_PROGRESS" as const,
  },
];

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

export default function Page() {
  return (
    <LecturePage
      lectures={mockLectures}
      assignments={mockAssignments}
      announcements={mockAnnouncements}
      materials={mockMaterials}
    />
  );
}
