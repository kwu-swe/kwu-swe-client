// 공지사항 상태 타입

// 공지사항 인터페이스
interface Announcement {
  announcementId: number,
  title: string,
  content: string,
  writer: string,
  encodedFiles: string[]
}

interface AnnouncementSum extends Pick<Announcement, "announcementId" | "title"> {
  createdAt: Date
}
interface AnnouncementCreate extends Omit<Announcement, "announcementId"> { }
interface AnnouncementUpdate extends Partial<AnnouncementCreate> { }


export type {
  Announcement,
  AnnouncementSum,
  AnnouncementCreate,
  AnnouncementUpdate
}