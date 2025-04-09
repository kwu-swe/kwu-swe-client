import SubjectAnnouncementById from "@/components/dashboard/subjects/AnnouncementById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { subjectId, announcementId } = useParams();
  return (
    <SubjectAnnouncementById
      subjectId={subjectId}
      announcementId={announcementId}
    />
  );
}
