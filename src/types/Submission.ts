export type SubmissionStatus = "SUBMITTED" | "LATE"

export interface Assignment {
	id: number,
	title: string,
	dueDate: string
}

interface Submission {
	id: number,
	assignment: Assignment,
	studentId: number,
	status: SubmissionStatus,
	submittedAt: Date
}
type SubmissionAutoSetKeys = "id" | "submittedAt"
interface SubmissionCreate extends Omit<Submission, SubmissionAutoSetKeys> { }


export type { Submission, SubmissionCreate }