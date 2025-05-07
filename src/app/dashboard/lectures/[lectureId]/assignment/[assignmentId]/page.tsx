import LectureAssignmentById from "@/components/dashboard/lectures/AssignmentById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { lectureId, assignmentId } = useParams();
  return (
    <LectureAssignmentById lectureId={lectureId} assignmentId={assignmentId} />
  );
}
