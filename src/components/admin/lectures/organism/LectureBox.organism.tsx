import useAssignment from "@/hook/useAssignment";
import { Lecture, LECTURE_STATUS_LABEL, SEMESTER_LABEL } from "@/types/Lecture";
import { useState } from "react";
import AssignmentModal from "../molecule/AssignmentModal.molecule";
import AssignmentListModal from "../molecule/AssignmentListModal.molecule";
import AnnouncementModal from "../molecule/AnnouncementModal.molecule";
import AnnouncementListModal from "../molecule/AnnouncementListModal.molecule";
import MaterialModal from "../molecule/MaterialModal.molecule";
import MaterialListModal from "../molecule/MaterialListModal.molecule";
import LecturePlanModal from "../molecule/LecturePlanModal.molecule";
import LecturePlanViewModal from "../molecule/LecturePlanViewModal.molecule";
import imageApi from "@/service/api/image";
import GradeListModal from "../molecule/GradeListModal.molecule";
import useLocation from "@/hook/useLocation";
import { Location } from "@/types/Location";

const formatLectureTime = (key: string) => {
	const [day, period] = key.split("_");
	const dayMap: Record<string, string> = {
		MON: "월",
		TUE: "화",
		WED: "수",
		THU: "목",
		FRI: "금",
	};
	return `${dayMap[day]}요일 ${period}교시`;
};

export default function LectureBox({ lecture, locations }: { lecture: Lecture, locations: Location[] }) {
	const { postAssignment } = useAssignment({ lectureId: lecture.lectureId });
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
	const [isAnnouncementListModalOpen, setIsAnnouncementListModalOpen] = useState(false);
	const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
	const [isMaterialListModalOpen, setIsMaterialListModalOpen] = useState(false);
	const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
	const [isPlanViewModalOpen, setIsPlanViewModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [dueDateAfterDays, setDueDateAfterDays] = useState(7);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
	const [selectedLectureId, setSelectedLectureId] = useState<number>();
	const handleFileSelect = (files: FileList) => {
		setSelectedFiles(Array.from(files));
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setTitle('');
		setContent('');
		setDueDateAfterDays(7);
		setSelectedFiles([]);
	};

	const handleAssignmentSubmit = async () => {
		if (selectedFiles.length === 0) {
			alert('파일을 선택해주세요.');
			return;
		}

		if (!title) {
			alert('제목을 입력해주세요.');
			return;
		}

		try {
			const fileUrls = await Promise.all(
				selectedFiles.map(async (file) => {
					const url = await imageApi.put(file);
					if (!url) throw new Error('파일 업로드 실패');
					return url;
				})
			);

			const dueDate = new Date();
			dueDate.setDate(dueDate.getDate() + dueDateAfterDays);
			await postAssignment({
				lectureId: lecture.lectureId,
				assignment: {
					title,
					content,
					dueDate,
					createdAt: new Date().toISOString(),
					encodedFiles: fileUrls
				}
			});

			handleModalClose();
		} catch (error: any) {
			console.error('과제 등록 실패:', error);
			alert('과제 등록에 실패했습니다.');
		}
	};

	return (
		<div className="w-full">
			<div className="w-full bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-1">
								{lecture.courseResponseDto.courseName}
							</h3>
							<p className="text-sm text-gray-500 font-medium">
								{lecture.courseResponseDto.courseNumber}
							</p>
						</div>
						<div className="flex gap-6">
							<div className="text-right">
								<p className="text-sm font-medium text-gray-900">{lecture.professor.name}</p>
								<p className="text-xs text-gray-500">교수</p>
							</div>
							<div className="text-right">
								<p className="text-sm font-medium text-gray-900">{SEMESTER_LABEL[lecture.semester]} {lecture.year}</p>
								<p className="text-xs text-gray-500">학기/년도</p>
							</div>
							<div className="text-right">
								<p className="text-sm font-medium text-gray-900">{lecture.sizeLimit}명</p>
								<p className="text-xs text-gray-500">정원</p>
							</div>
						</div>
					</div>
					<p className="font-medium text-gray-900">{lecture.sizeLimit}명</p>
					<div className="mt-3 pt-3 border-t border-gray-100">
						<p className="text-sm text-gray-500">강의시간</p>
						<p className="text-sm font-medium text-gray-900">
							{lecture.lectureTimeAndLocation &&
								Object.keys(lecture.lectureTimeAndLocation).length > 0 ? (
								Object.entries(lecture.lectureTimeAndLocation).map(
									([time, location], index, arr) => (
										<span key={time}>
											{formatLectureTime(time)} ({locations.find((l) => l.locationId === location)?.locationName})
											{index < arr.length - 1 ? ", " : ""}
										</span>
									)
								)
							) : (
								<span>미정</span>
							)}
						</p>
					</div>
				</div>
				<div className="col-span-2">
					<p className="text-sm text-gray-500">상태</p>
					<p className="font-medium text-gray-900">{LECTURE_STATUS_LABEL[lecture.lectureStatus]}</p>
				</div>
				{/* Actions */}
				<div className="col-span-2 flex flex-wrap justify-end items-center gap-2">
					{/* 강의계획서 그룹 */}
					<div className="inline-flex rounded-md shadow-sm">
						<button
							onClick={() => setIsPlanModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-l hover:bg-indigo-700 transition-colors border-r border-indigo-700"
						>
							강의계획서 추가
						</button>
						<button
							onClick={() => setIsPlanViewModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-r hover:bg-indigo-700 transition-colors"
						>
							목록
						</button>
					</div>

					{/* 공지사항 그룹 */}
					<div className="inline-flex rounded-md shadow-sm">
						<button
							onClick={() => setIsAnnouncementModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-l hover:bg-blue-700 transition-colors border-r border-blue-700"
						>
							공지사항 추가
						</button>
						<button
							onClick={() => setIsAnnouncementListModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-r hover:bg-blue-700 transition-colors"
						>
							목록
						</button>
					</div>
					{/* 자료 그룹 */}
					<div className="inline-flex rounded-md shadow-sm">
						<button
							onClick={() => setIsMaterialModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-l hover:bg-emerald-700 transition-colors border-r border-emerald-700"
						>
							자료 추가
						</button>
						<button
							onClick={() => setIsMaterialListModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-r hover:bg-emerald-700 transition-colors"
						>
							목록
						</button>
					</div>
					{/* 과제 그룹 */}
					<div className="inline-flex rounded-md shadow-sm">
						<button
							onClick={() => setIsModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-teal-600 rounded-l hover:bg-teal-700 transition-colors border-r border-teal-700"
						>
							과제 추가
						</button>
						<button
							onClick={() => setIsListModalOpen(true)}
							className="px-3 py-1.5 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors rounded-r border-r border-teal-700"
						>
							목록
						</button>
					</div>
					<button
						onClick={() => {
							setIsGradeModalOpen(true)
							setSelectedLectureId(lecture.lectureId)
						}}
						className="px-3 py-1.5 text-xs font-medium text-white bg-gray-500 rounded hover:bg-gray-600 transition-colors"
					>
						성적관리
					</button>
				</div>
			</div>


			{
				isModalOpen && <AssignmentModal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					title={title}
					setTitle={setTitle}
					content={content}
					setContent={setContent}
					dueDateAfterDays={dueDateAfterDays}
					setDueDateAfterDays={setDueDateAfterDays}
					selectedFiles={selectedFiles}
					onFileSelect={handleFileSelect}
					onFileRemove={(index: number) => setSelectedFiles(files => files.filter((_, i) => i !== index))}
					onSubmit={handleAssignmentSubmit}
					lectureId={lecture.lectureId}
				/>
			}
			{
				isListModalOpen && <AssignmentListModal
					isOpen={isListModalOpen}
					onClose={() => setIsListModalOpen(false)}
					lectureId={lecture.lectureId}
				/>
			}
			{
				isAnnouncementModalOpen && <AnnouncementModal
					isOpen={isAnnouncementModalOpen}
					onClose={() => setIsAnnouncementModalOpen(false)}
					lectureId={lecture.lectureId}
				/>
			}
			{
				isAnnouncementListModalOpen && <AnnouncementListModal
					isOpen={isAnnouncementListModalOpen}
					onClose={() => setIsAnnouncementListModalOpen(false)}
					lectureId={lecture.lectureId}
				/>
			}
			{
				isMaterialModalOpen && <MaterialModal
					isOpen={isMaterialModalOpen}
					onClose={() => setIsMaterialModalOpen(false)}
					lectureId={lecture.lectureId}
				/>
			}
			{
				isMaterialListModalOpen && <MaterialListModal
					isOpen={isMaterialListModalOpen}
					onClose={() => setIsMaterialListModalOpen(false)}
					lectureId={lecture.lectureId}
				/>
			}
			{
				isPlanModalOpen && <LecturePlanModal
					isOpen={isPlanModalOpen}
					onClose={() => setIsPlanModalOpen(false)}
					lectureId={lecture.lectureId}
				/>
			}
			{
				isPlanViewModalOpen && <LecturePlanViewModal
					isOpen={isPlanViewModalOpen}
					onClose={() => setIsPlanViewModalOpen(false)}
					lectureId={lecture.lectureId}
				/>
			}
			{isGradeModalOpen && <GradeListModal
				isOpen={isGradeModalOpen}
				setIsOpen={setIsGradeModalOpen}
				onClose={() => {
					setSelectedLectureId(undefined)
					setIsGradeModalOpen(false)
				}}
				lectureId={selectedLectureId!}
			/>}
		</div >
	);
}