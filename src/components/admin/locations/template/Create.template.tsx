import { Button, Input } from "fast-jsx";
import { useState } from "react";
import { CreateLocation } from "@/types/Location";

export default function CreateTemplate(
  { post }: { post: (data: CreateLocation) => void }
) {
  const [location, setLocation] = useState<string>();
  const [sizeLimit, setSizeLimit] = useState<string>();
  return (
    <div>
      <Input state={[location, setLocation]}
        placeholder="강의실 이름" />
      <Input state={[sizeLimit, setSizeLimit]} placeholder="인원 제한"
        onKeyDown={(e) => e.key === "Enter" && post({
          location: location!,
          sizeLimit: +sizeLimit!,
        })}
      />
      <Button
        title="등록"
        onClick={() => {
          if (!location || !sizeLimit) return;
          post({
            location,
            sizeLimit: +sizeLimit,
          });
        }}
      />
    </div>
  );
}
