// 공지사항 상태 타입

// 공지사항 인터페이스
export interface Announcement {
  announcementId: number;
  title: string;
  content: string;
  writer: string;
  encodedFiles: string[];
}
export interface AnnouncementList {
  announcementId: number;
  title: string;
  createdAt: string;
}

export interface AnnouncementCreate
  extends Omit<Announcement, "announcementId" | "writer"> {}
