import { Action, Shelf } from "fast-jsx";
import { cn } from "fast-jsx/util";
import NoData from "@/design/NoData";
import useLocation from "@/hook/useLocation";
import { Location } from "@/types/Location";

export default function ReadTemplate({
  locations,
  isLoading,
}: {
  locations: Location[];
  isLoading: boolean;
}) {
  const { locations: fetchedLocations } = useLocation();
  const mergedLocations = locations || fetchedLocations;

  if (isLoading) return <div>로딩 중...</div>;

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100 overflow-hidden",
    rounded: "rounded-xl",
    shadow: "shadow-card",
    body: "flex flex-col p-4 md:p-8",
    header:
      "flex flex-row justify-between items-center p-4 border-b border-gray-100",
    title: "text-lg font-semibold text-gray-900",
  };

  const tableStyles = {
    container:
      "mt-4 border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200",
    row: "flex items-center px-4 py-3 hover:bg-gray-50 transition-colors",
    col: "flex-1 px-2",
    label: "text-sm font-medium text-gray-900",
    value: "text-sm text-gray-600",
    badge: "px-2.5 py-0.5 rounded-full text-xs font-medium",
    capacityBadge: "bg-purple-100 text-purple-800",
  };

  return (
    <div className={cn(cardStyles.base, cardStyles.rounded, cardStyles.shadow)}>
      <div className={cardStyles.header}>
        <h2 className={cardStyles.title}>강의실 목록</h2>
      </div>
      <div className={cardStyles.body}>
        <Action.Replace
          actions={[[!mergedLocations?.length, <NoData key="noData" />]]}
        >
          <div className={tableStyles.container}>
            {mergedLocations?.map((location: Location) => (
              <div key={location.locationId} className={tableStyles.row}>
                <div className={cn(tableStyles.col, "flex-[2]")}>
                  <h3 className={tableStyles.label}>{location.locationName}</h3>
                </div>
                <div className={tableStyles.col}>
                  <span
                    className={cn(tableStyles.badge, tableStyles.capacityBadge)}
                  >
                    수용 인원: {location.sizeLimit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Action.Replace>
      </div>
    </div>
  );
}
