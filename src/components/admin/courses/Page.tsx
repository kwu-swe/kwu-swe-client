import useCourse from "@/hook/useCourse";
import PageTitle from "../(common)/organisms/PageTitle.organism";
import CourseCreateModal from "./molecule/CourseCreateModal.molecule";
import { CourseCreate } from "@/types/Course";

export default function CoursePage() {
  const { courses, post, isCreateMode, setIsCreateMode, isCreating } = useCourse();

  return (
    <div className="w-full min-h-screen p-6 md:p-8">
      <PageTitle
        title="과목 관리"
        subtitle="학과별 과목을 관리하고 교육과정을 설정합니다."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            교육과정 및 과목 현황
          </h2>
          <button
            onClick={() => setIsCreateMode(true)}
            className="px-4 py-2 text-sm bg-kw-brown text-white rounded-lg hover:bg-kw-brown/90"
          >
            과목 생성
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses?.map((course) => (
                <div
                  key={course.courseNumber}
                  className="p-4 border border-gray-200 rounded-lg hover:border-kw-brown/20 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {course.courseName}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>과목 코드: {course.courseNumber}</p>
                    <p>학점: {course.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CourseCreateModal
          isOpen={isCreateMode}
          onClose={() => setIsCreateMode(false)}
          onSubmit={async (course: CourseCreate) => await post(course)}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
}
