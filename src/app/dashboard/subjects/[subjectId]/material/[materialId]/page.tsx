import SubjectMaterialById from "@/components/dashboard/subjects/MaterialById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { subjectId, materialId } = useParams();
  return <SubjectMaterialById subjectId={subjectId} materialId={materialId} />;
}
