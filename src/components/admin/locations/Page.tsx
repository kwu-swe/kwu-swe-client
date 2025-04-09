import { Action, Button } from "fast-jsx";
import { useState } from "react";
import ReadTemplate from "./template/Read.template";
import CreateTemplate from "./template/Create.template";

export default function LocationPage() {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  return (
    <div>
      <Button title="강의실 생성" onClick={() => setIsCreate(true)} />
      <Action.Replace
        actions={[
          [!isCreate, <ReadTemplate />],
          [isCreate, <CreateTemplate />],
        ]}
      >
        <ReadTemplate />
      </Action.Replace>
    </div>
  );
}
