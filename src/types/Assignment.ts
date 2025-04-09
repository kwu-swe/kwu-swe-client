// 과제 상태 타입
export type AssignmentSubmissionStatus = "SUBMITTED" | "LATE";

// 과제 인터페이스
export interface Assignment {
  id: number;
  lectureId: number;
  //-contents
  title: string;
  content: string;
  dueDate: Date;
  extendedDueDate: Date;
  allowResubmission: boolean;
  //-status
  isPublic: boolean;
  createdAt: Date;
}

// 과제 파일 인터페이스
export interface AssignmentFile {
  id: number;
  assignmentId: number;
  //-contents
  fileName: string;
  // ~
}

// 과제 제출 인터페이스
export interface AssignmentSubmission {
  id: number;
  assignmentId: number;
  studentId: number;
  //-status
  status: AssignmentSubmissionStatus;
  submittedAt: Date;
  // ~
}
