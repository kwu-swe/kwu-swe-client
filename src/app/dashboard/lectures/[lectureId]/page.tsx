import LectureById from "@/components/dashboard/lectures/PageById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { lectureId } = useParams();
  return <LectureById lectureId={lectureId} />;
}
