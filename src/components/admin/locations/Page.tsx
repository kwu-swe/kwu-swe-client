import useLocation from "@/hook/useLocation";
import PageTitle from "../(common)/organisms/PageTitle.organism";
import LocationCreateModal from "./molecule/LocationCreateModal.molecule";

export default function LocationPage() {
  const { locations, post, isCreateMode, setIsCreateMode, isCreating } =
    useLocation();

  return (
    <div className="w-full min-h-screen p-6 md:p-8">
      <PageTitle
        title="강의실 관리"
        subtitle="강의실 정보를 관리하고 예약 시스템을 운영합니다."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            개설된 강의실 현황
          </h2>
          <button
            onClick={() => setIsCreateMode(true)}
            className="px-4 py-2 text-sm bg-kw-brown text-white rounded-lg hover:bg-kw-brown/90"
          >
            강의실 생성
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations?.map((location) => (
            <div
              key={location.locationId}
              className="p-4 border border-gray-200 rounded-lg hover:border-kw-brown/20 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {location.locationName}
              </h3>
              <div className="space-y-1 text-sm text-gray-500">
                <p>수용 인원: {location.sizeLimit}명</p>
              </div>
            </div>
          ))}
        </div>

        <LocationCreateModal
          isOpen={isCreateMode}
          onClose={() => setIsCreateMode(false)}
          onSubmit={async (location) => await post(location)}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
}
