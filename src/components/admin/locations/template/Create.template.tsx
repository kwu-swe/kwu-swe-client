import { Button, Input } from "fast-jsx";
import { useState } from "react";
import { LocationCreate } from "@/types/Location";

export default function CreateTemplate(
  { post }: { post: (data: LocationCreate) => void }
) {
  const [locationName, setLocationName] = useState<string>();
  const [sizeLimit, setSizeLimit] = useState<string>();
  return (
    <div >
      <Input state={[locationName, setLocationName]}
        placeholder="강의실 이름" />
      <Input state={[sizeLimit, setSizeLimit]} placeholder="인원 제한"
        onKeyDown={(e) => e.key === "Enter" && post({
          locationName: locationName!,
          sizeLimit: +sizeLimit!,
        })}
      />
      <Button
        title="등록"
        onClick={() => {
          if (!locationName || !sizeLimit) return;
          post({
            locationName,
            sizeLimit: +sizeLimit,
          });
        }}
      />
    </div>
  );
}
