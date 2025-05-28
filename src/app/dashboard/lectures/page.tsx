import LecturePage from "@/components/dashboard/lectures/Page";

// ** types
import { Lecture } from "@/types/Lecture";

// 테스트용 데이터
const mockLectures = [
  {
    id: 1,
    sizeLimit: 30,
    year: 2024,
    semester: "FIRST_SEMESTER" as const,
    professor: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "PROFESSOR" as const,
      studentNumber: null,
      professorNumber: "P001",
      department: "Computer Science",
    },
    courseResponseDto: {
      courseId: 1,
      name: "Software Engineering",
      code: "CS101",
      description: "Introduction to software engineering principles",
      credit: 3,
      department: "Computer Science",
    },
    lectureTimeAndLocation: [
      {
        key: "MON_2",
        value: 101,
      },
      {
        key: "MON_3",
        value: 101,
      },
      {
        key: "WED_2",
        value: 101,
      },
      {
        key: "WED_3",
        value: 101,
      }
    ],
    lectureStatus: "IN_PROGRESS" as const,
  },
  {
    id: 2,
    sizeLimit: 25,
    year: 2024,
    semester: "FIRST_SEMESTER" as const,
    professor: {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "PROFESSOR" as const,
      studentNumber: null,
      professorNumber: "P002",
      department: "Computer Science",
    },
    courseResponseDto: {
      courseId: 2,
      name: "Database Systems",
      code: "CS102",
      description: "Introduction to database systems",
      credit: 3,
      department: "Computer Science",
    },
    lectureTimeAndLocation: [
      {
        key: "TUE_4",
        value: 102,
      },
      {
        key: "TUE_5",
        value: 102,
      },
      {
        key: "THU_4",
        value: 102,
      },
      {
        key: "THU_5",
        value: 102,
      }
    ],
    lectureStatus: "IN_PROGRESS" as const,
  },
  {
    id: 3,
    sizeLimit: 40,
    year: 2024,
    semester: "FIRST_SEMESTER" as const,
    professor: {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "PROFESSOR" as const,
      studentNumber: null,
      professorNumber: "P003",
      department: "Computer Science",
    },
    courseResponseDto: {
      courseId: 3,
      name: "Web Programming",
      code: "CS103",
      description: "Introduction to web programming",
      credit: 3,
      department: "Computer Science",
    },
    lectureTimeAndLocation: [
      {
        key: "MON_6",
        value: 103,
      },
      {
        key: "MON_7",
        value: 103,
      },
      {
        key: "WED_6",
        value: 103,
      },
      {
        key: "WED_7",
        value: 103,
      }
    ],
    lectureStatus: "IN_PROGRESS" as const,
  },
  {
    id: 4,
    sizeLimit: 35,
    year: 2024,
    semester: "FIRST_SEMESTER" as const,
    professor: {
      id: 4,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "PROFESSOR" as const,
      studentNumber: null,
      professorNumber: "P004",
      department: "Computer Science",
    },
    courseResponseDto: {
      courseId: 4,
      name: "Data Structures",
      code: "CS104",
      description: "Advanced data structures and algorithms",
      credit: 3,
      department: "Computer Science",
    },
    lectureTimeAndLocation: [
      {
        key: "TUE_1",
        value: 104,
      },
      {
        key: "TUE_2",
        value: 104,
      },
      {
        key: "THU_1",
        value: 104,
      },
      {
        key: "THU_2",
        value: 104,
      }
    ],
    lectureStatus: "IN_PROGRESS" as const,
  },
  {
    id: 5,
    sizeLimit: 30,
    year: 2024,
    semester: "FIRST_SEMESTER" as const,
    professor: {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "PROFESSOR" as const,
      studentNumber: null,
      professorNumber: "P005",
      department: "Computer Science",
    },
    courseResponseDto: {
      courseId: 5,
      name: "Operating Systems",
      code: "CS105",
      description: "Introduction to operating systems",
      credit: 3,
      department: "Computer Science",
    },
    lectureTimeAndLocation: [
      {
        key: "FRI_3",
        value: 105,
      },
      {
        key: "FRI_4",
        value: 105,
      },
      {
        key: "FRI_5",
        value: 105,
      }
    ],
    lectureStatus: "IN_PROGRESS" as const,
  }
];

const mockAssignments = {
  "1": [
    {
      id: 1,
      title: "Assignment 1",
      content: "First assignment content",
      dueDate: new Date("2024-03-20"),
      lectureId: 1,
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-01"),
      extendedDueDate: new Date("2024-03-25"),
      allowResubmission: false,
      isPublic: true
    },
  ],
  "2": [
    {
      id: 2,
      title: "Assignment 2",
      content: "Second assignment content",
      dueDate: new Date("2024-03-25"),
      lectureId: 2,
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date("2024-03-05"),
      extendedDueDate: new Date("2024-03-30"),
      allowResubmission: false,
      isPublic: true
    },
  ],
};

const mockAnnouncements = {
  "1": [
    {
      id: 1,
      title: "Announcement 1",
      content: "First announcement content",
      lectureId: 1,
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-01")
    },
  ],
  "2": [
    {
      id: 2,
      title: "Announcement 2",
      content: "Second announcement content",
      lectureId: 2,
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date("2024-03-05")
    },
  ],
  "3": [
    {
      id: 3,
      title: "Announcement 3",
      content: "Third announcement content",
      lectureId: 3,
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-03-10")
    },
  ],
};

const mockMaterials = {
  "1": [
    {
      id: 1,
      title: "Material 1",
      content: "First material content",
      lectureId: 1,
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-01")
    },
  ],
  "2": [
    {
      id: 2,
      title: "Material 2",
      content: "Second material content",
      lectureId: 2,
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date("2024-03-05")
    },
  ],
  "3": [
    {
      id: 3,
      title: "Material 3",
      content: "Third material content",
      lectureId: 3,
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-03-10")
    },
  ],
};

export default function Page() {
  return (
    <LecturePage
      lectures={mockLectures as unknown as Lecture[]}
      assignments={mockAssignments}
      announcements={mockAnnouncements}
      materials={mockMaterials}
    />
  );
}
