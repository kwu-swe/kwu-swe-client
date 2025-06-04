export type GradeType = "IN_PROGRESS" | "A_PLUS" | "A" | "B_PLUS" | "B" | "C_PLUS" | "C" | "D" | "F" | "P" | "NP";
export interface Grade {
	studentId: number,
	name: string,
	code: string,
	grade: GradeType
}
