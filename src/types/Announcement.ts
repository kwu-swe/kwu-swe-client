// 공지사항 상태 타입

// 공지사항 인터페이스
export interface Announcement {
  id: number;
  lectureId: number;
  title: string;
  content: string;
  createdAt: Date;
}
