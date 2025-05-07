import LectureAnnouncementById from "@/components/dashboard/lectures/AnnouncementById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { lectureId, announcementId } = useParams();
  return (
    <LectureAnnouncementById
      lectureId={lectureId}
      announcementId={announcementId}
    />
  );
}
