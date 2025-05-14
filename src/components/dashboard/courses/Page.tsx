// ** Hooks
import { cn } from "fast-jsx/util";
import { useState, useCallback } from "react";
import { useDebounce } from "@/hook/useDebounce";
import useLecture from "@/hook/useLecture";

// ** Organisms
import LectureApplyList from "./organism/LectureApplyList.organism";
import ComponentLoading from "@/design/ComponentLoading";

// ** Icons
import { MdSearch } from "react-icons/md";

export default function LecturesApply() {
  const { lectures, isLoading } = useLecture();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredLectures = lectures?.filter((lecture) => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    return (
      lecture.courseResponseDto.courseName
        .toLowerCase()
        .includes(searchLower) ||
      lecture.courseResponseDto.courseNumber
        .toLowerCase()
        .includes(searchLower) ||
      lecture.professor.name.toLowerCase().includes(searchLower)
    );
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // ** styles
  const container = {
    displays: "flex flex-col gap-y-3.5 py-8",
    sizes: "w-full",
  };

  return (
    <div className={cn(container)}>
      <div className="mb-4 space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder="과목명, 과목번호, 교수명으로 검색"
            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {debouncedSearchTerm && (
          <div className="text-sm text-gray-500">
            검색어 "{debouncedSearchTerm}"에 대한 결과{" "}
            {filteredLectures?.length}개
          </div>
        )}
      </div>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        <LectureApplyList lectures={filteredLectures || []} />
      )}
    </div>
  );
}
