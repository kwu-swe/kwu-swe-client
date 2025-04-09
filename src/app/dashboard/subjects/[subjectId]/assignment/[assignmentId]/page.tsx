import SubjectAssignmentById from "@/components/dashboard/subjects/AssignmentById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { subjectId, assignmentId } = useParams();
  return (
    <SubjectAssignmentById subjectId={subjectId} assignmentId={assignmentId} />
  );
}
