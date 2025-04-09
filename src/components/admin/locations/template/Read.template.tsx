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
        height: "min-h-100",
      }}
    >
      <Action.Replace actions={[[!locations?.length, <NoData key="noData" />]]}>
        {locations?.map((location) => (
          <Card
            key={location.locationId}
            title={location.locationName}
            contents={[`${location.sizeLimit}`]}
          />
        ))}
      </Action.Replace>
    </Shelf.Col>
  );
}
