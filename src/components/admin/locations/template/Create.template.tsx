import useLocation from "@/hook/useLocation";
import { Button, Input } from "fast-jsx";
import { useState } from "react";

export default function CreateTemplate() {
  const [location, setLocation] = useState<string>();
  const [sizeLimit, setSizeLimit] = useState<string>();
  const { mutate } = useLocation();
  return (
    <div>
      <Input state={[location, setLocation]} />
      <Input state={[sizeLimit, setSizeLimit]} />
      <Button
        title="등록"
        onClick={() => {
          if (!location || !sizeLimit) return;
          mutate({
            location,
            sizeLimit: +sizeLimit,
          });
        }}
      />
    </div>
  );
}
