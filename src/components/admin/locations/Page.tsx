import useLocation from "@/hook/useLocation";
import { Action, Button } from "fast-jsx";
import ReadTemplate from "./template/Read.template";
import CreateTemplate from "./template/Create.template";

export default function LocationPage() {
  const { locations, post, isCreateMode, setIsCreateMode } = useLocation();
  return (
    <div>
      <Button title="강의실 생성" onClick={() => setIsCreateMode(true)} />
      <ReadTemplate />
      {isCreateMode && <CreateTemplate post={post} />}
    </div >
  );
}
