import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ** organism
import AnnouncementTable from "@/components/dashboard/lectures/organism/AnnouncementTable.organism";
import MaterialTable from "@/components/dashboard/lectures/organism/MaterialTable.organism";
import AssignmentTable from "@/components/dashboard/lectures/organism/AssignmentTable.organism";

// ** molecules
import LectureInfo from "@/components/dashboard/lectures/molecules/LectureInfo.molecules";
import LectureStats from "@/components/dashboard/lectures/molecules/LectureStats.molecules";

// ** types
import { Announcement } from "@/types/Announcement";
import { Material } from "@/types/Material";
import { AssignmentClient } from "@/types/Assignment";
import { Lecture } from "@/types/Lecture";

export default function LectureById({ lectureId }: { lectureId?: string }) {
  const navigate = useNavigate();
  // 임의의 공지사항 데이터
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      lectureId: Number(lectureId) || 1,
      title: "중간고사 일정 안내",
      content:
        "중간고사는 4월 15일에 진행됩니다. 시험 범위는 1장부터 5장까지입니다.",
      createdAt: new Date("2025-04-01"),
    },
    {
      id: 2,
      lectureId: Number(lectureId) || 1,
      title: "과제 제출 기한 연장",
      content: "프로젝트 제출 기한이 4월 20일로 연장되었습니다.",
      createdAt: new Date("2025-04-05"),
    },
    {
      id: 3,
      lectureId: Number(lectureId) || 1,
      title:
        "과제 제출 기한 연장 + 긴 텍스트일 경우 (과제 제출 기한 연장과제 제출 기한 연장과제 제출 기한 연장)",
      content: "프로젝트 제출 기한이 4월 20일로 연장되었습니다.",
      createdAt: new Date("2025-04-08"),
    },
  ]);

  // 임의의 자료실 데이터
  const [materials] = useState<Material[]>([
    {
      id: 1,
      lectureId: Number(lectureId) || 1,
      title: "1주차 강의자료",
      content: "1주차 강의자료",
      createdAt: new Date("2025-03-02"),
    },
    {
      id: 2,
      lectureId: Number(lectureId) || 1,
      title: "프로그래밍 과제 안내서",
      content: "프로그래밍 과제 안내서",
      createdAt: new Date("2025-03-15"),
    },
  ]);

  // 임의의 과제 데이터
  const [assignments] = useState<AssignmentClient[]>([
    {
      id: 1,
      lectureId: Number(lectureId) || 1,
      title: "프로그래밍 기초 과제 1",
      content: "변수와 자료형에 대한 기초 문제 풀이",
      dueDate: new Date("2025-04-15"),
      extendedDueDate: new Date("2025-04-20"),
      allowResubmission: true,
      isPublic: true,
      createdAt: new Date("2025-04-01"),
    },
    {
      id: 2,
      lectureId: Number(lectureId) || 1,
      title: "중간 프로젝트",
      content: "간단한 계산기 프로그램 구현하기",
      dueDate: new Date("2025-04-20"),
      extendedDueDate: new Date("2025-04-25"),
      allowResubmission: false,
      isPublic: true,
      createdAt: new Date("2025-04-05"),
    },
    {
      id: 3,
      lectureId: Number(lectureId) || 1,
      title: "기말 프로젝트",
      content: "미니 게임 개발하기",
      dueDate: new Date("2025-06-15"),
      extendedDueDate: new Date("2025-06-20"),
      allowResubmission: true,
      isPublic: true,
      createdAt: new Date("2025-04-09"),
    },
  ]);

  // 임의의 강의 데이터
  const lectureData: Lecture = {
    id: 1,
    sizeLimit: 30,
    year: 2025,
    lectureStatus: "IN_PROGRESS",
    semester: "FIRST_SEMESTER",
    professor: {
      name: "홍길동",
      code: "12345",
      phoneNumber: "010-1234-5678",
      role: "ROLE_PROFESSOR",
    },
    courseResponseDto: {
      courseId: 1,
      courseName: "프로그래밍 기초",
      courseNumber: "CS101",
      score: 3,
    },
    lectureTimeAndLocation: [
      {
        key: "MON_1",
        value: 401,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-20">
      <div className="md:col-span-2 px-2.5">
        <h1 className="text-xl font-bold text-gray-900">
          {lectureData.courseResponseDto.courseName}
          <span className="ml-2 text-base font-medium text-gray-500">
            {lectureData.courseResponseDto.courseNumber}
          </span>
        </h1>
      </div>

      <div className="md:col-span-1">
        <LectureInfo data={lectureData} />
      </div>
      <div className="md:col-span-1">
        <LectureStats
          assignments={assignments}
          announcements={announcements}
          materials={materials}
          className="h-full"
        />
      </div>

      {/* 과제 목록 테이블 */}
      <div className="md:col-span-2">
        <AssignmentTable
          data={assignments}
          count={assignments.length}
          page={1}
          totalPages={1}
          onClick={(id) =>
            navigate(`/dashboard/lectures/${lectureId}/assignment/${id}`)
          }
        />
      </div>

      <hr className="md:col-span-2 w-full border-gray-100" />

      {/* 공지사항 및 자료 테이블 */}
      <div className="md:col-span-1 w-full">
        <AnnouncementTable
          data={announcements}
          count={announcements.length}
          page={1}
          totalPages={3}
          onClick={(id) =>
            navigate(`/dashboard/lectures/${lectureId}/announcement/${id}`)
          }
          onPageChange={(page) => {
            console.log(page);
          }}
        />
      </div>
      <div className="md:col-span-1 w-full">
        <MaterialTable
          data={materials}
          count={materials.length}
          page={1}
          totalPages={5}
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
