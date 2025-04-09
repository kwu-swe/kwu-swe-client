import { useState } from "react";
import { cn } from "fast-jsx/util";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// ** organism

// ** molecules

// ** types
import { Material } from "@/types/Material";

export default function SubjectMaterialById({
  subjectId,
  materialId,
}: {
  subjectId?: string;
  materialId?: string;
}) {
  const navigate = useNavigate();
  const [material, setMaterial] = useState<Material>({
    id: 1,
    lectureId: 123,
    title: "리액트 컴포넌트의 이해",
    content: `리액트 컴포넌트는 UI를 구성하는 가장 기본적인 단위입니다.

컴포넌트의 주요 특징:
- 재사용성이 높음
- 독립적으로 동작
- Props를 통한 데이터 전달
- State를 통한 상태 관리

컴포넌트를 잘 설계하면 유지보수가 쉽고 확장성 있는 애플리케이션을 만들 수 있습니다.`,
    createdAt: new Date("2024-01-15"),
  });

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100",
    shadow: "shadow-card",
    rounded: "rounded-xl",
    body: "flex flex-col p-4 md:p-8",
    header:
      "flex flex-row justify-between items-center p-2.5 gap-3 md:gap-5 border-b border-gray-100",
    headerTitle:
      "flex flex-row items-center gap-2 px-2 text-sm text-gray-950 font-semibold",
  };

  return (
    <div>
      <button
        onClick={() => navigate(`/dashboard/subjects/${subjectId}`)}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
      >
        <MdArrowBack className="w-5 h-5" />
        <span className="text-sm">돌아가기</span>
      </button>

      <div className={cn(cardStyles.base, cardStyles.rounded, "shadow-table")}>
        <div className={cardStyles.header}>
          <div className={cardStyles.headerTitle}>
            <span>강의 자료</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-center">
            <p className="text-gray-500 text-xs w-[80px]">제목</p>
            <p className="text-gray-700 text-sm font-medium">
              {material.title}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500 text-xs w-[80px]">작성일</p>
            <p className="text-gray-700 text-sm font-medium">
              {material.createdAt.toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-xs">내용</p>
            <div className="text-gray-700 text-sm whitespace-pre-wrap">
              {material.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
