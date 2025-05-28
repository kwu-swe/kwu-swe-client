import assignmentApi from "@/service/api/assignment";
import { useQueries } from "@tanstack/react-query";

// export default function useAssignment({
// 	lectureId,
// 	assignmentId
// }: {
// 	lectureId?: number;
// 	assignmentId?: number

// }) {
// 	// const [{ data: assignments, isLoading: isLoadingAssignments },
// 	// 	{
// 	// 		data: assignmentsByLecture, isLoading: isAssignmentByLecture
// 	// 	}
// 	// ] = useQueries([
// 	// 	{
// 	// 		enabled: !!lectureId,
// 	// 		queryKey: ['getAssignmentByLectureId', lectureId],
// 	// 		queryFn: () => assignmentApi.getByLectureId(lectureId!)
// 	// 	},
// 	// 	{
// 	// 		enabled: !!assignmentId,
// 	// 		queryKey: ['getAssignmentById', assignmentId],
// 	// 		queryFn: () => assignmentApi.get(assignmentId!)
// 	// 	}
// 	// ])
// 	return { assignments, isLoadingAssignments, assignmentsByLecture, isAssignmentByLecture }
// }