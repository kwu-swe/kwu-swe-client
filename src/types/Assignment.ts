// 과제 상태 타입
export type AssignmentSubmissionStatus = "SUBMITTED" | "NOT_SUBMITTED" | "LATE";

// 과제 인터페이스
export interface Assignment {
  assignmentId: number;
  title: string;
  content: string;
  dueDate: Date;
  createdAt: Date;
  encodedFiles: string[];
  submitAssignmentResponseDto: any | null;
}

export interface AssignmentByLecture
  extends Pick<Assignment, "assignmentId" | "title" | "dueDate"> {
  content: string;
  dueDateAfterDays: number;
  createdAt: Date;
}
export interface AssignmentCreate extends Omit<Assignment, "assignmentId" | "submitAssignmentResponseDto"> {
  dueDateAfterDays: number;
}

export interface AssignmentClient {
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

export interface Submission {
  submissionId: number,
  title: string,
  content: string,
  encodedFiles: string[]
}

export interface SubmissionProfessor {
  studentId: number;
  studentName: string;
  submitStatus: AssignmentSubmissionStatus;
}

export interface SubmissionCreate extends Omit<Submission, "submissionId"> { }
