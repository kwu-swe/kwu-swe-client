import SubjectById from "@/components/dashboard/subjects/PageById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { subjectId } = useParams();
  return <SubjectById subjectId={subjectId} />;
}
