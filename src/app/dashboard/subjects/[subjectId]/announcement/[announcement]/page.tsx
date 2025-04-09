import SubjectAnnouncementById from "@/components/dashboard/subjects/AnnouncementById";
import { useParams } from "react-router-dom";

export default function Page() {
  const { subjectId, announcement } = useParams();
  return (
    <SubjectAnnouncementById
      subjectId={subjectId}
      announcementId={announcement}
    />
  );
}
