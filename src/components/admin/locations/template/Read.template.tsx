import Card from "@/design/Card";
import NoData from "@/design/NoData";
import useLocation from "@/hook/useLocation";
import { Action, Shelf } from "fast-jsx";

export default function ReadTemplate() {
  const { locations } = useLocation();
  return (
    <Shelf.Col
      option={{
        boundary: "border-2 border-green-dark",
        height: "h-120 overflow-y-scroll",
      }}
    >
      <Action.Replace actions={[[!locations?.length, <NoData key="noData" />]]}>
        {locations?.map((location) => (
          <Card
            key={location.locationId}
            title={location.locationName}
            contents={[`인원 제한: ${location.sizeLimit}`, `id: ${location.locationId}`]}
          />
        ))}
      </Action.Replace>
    </Shelf.Col>
  );
}
