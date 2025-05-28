import LectureMaterialById from "@/components/dashboard/lectures/MaterialById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { lectureId, materialId } = useParams();
  return <LectureMaterialById lectureId={Number(lectureId)} materialId={Number(materialId)} />;
}
