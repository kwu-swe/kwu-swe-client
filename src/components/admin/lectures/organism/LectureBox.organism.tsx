import useAssignment from "@/hook/useAssignment";
import { Lecture } from "@/types/Lecture";
import { useState } from "react";
import AssignmentModal from "../molecule/AssignmentModal.molecule";
import AssignmentListModal from "../molecule/AssignmentListModal.molecule";
import AnnouncementModal from "../molecule/AnnouncementModal.molecule";
import AnnouncementListModal from "../molecule/AnnouncementListModal.molecule";
import imageApi from "@/service/api/image";

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

export default function LectureBox({ lecture }: { lecture: Lecture }) {
	const { postAssignment } = useAssignment({ lectureId: lecture.lectureId });
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
	const [isAnnouncementListModalOpen, setIsAnnouncementListModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [dueDateAfterDays, setDueDateAfterDays] = useState(7);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
					dueDateAfterDays,
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
		<div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow">
			<div className="grid grid-cols-12 gap-4 items-center">
				{/* Course Info */}
				<div className="col-span-3">
					<h3 className="font-medium text-gray-900">
						{lecture.courseResponseDto.courseName}
					</h3>
					<p className="text-sm text-gray-500">
						{lecture.courseResponseDto.courseNumber}
					</p>
				</div>

				{/* Professor */}
				<div className="col-span-2">
					<p className="text-sm text-gray-500">교수</p>
					<p className="font-medium text-gray-900">{lecture.professor.name}</p>
				</div>

				{/* Semester/Year */}
				<div className="col-span-2">
					<p className="text-sm text-gray-500">학기/년도</p>
					<p className="font-medium text-gray-900">
						{lecture.semester} {lecture.year}
					</p>
				</div>

				{/* Size Limit */}
				<div className="col-span-1">
					<p className="text-sm text-gray-500">정원</p>
					<p className="font-medium text-gray-900">{lecture.sizeLimit}명</p>
				</div>

				{/* Status */}
				<div className="col-span-2">
					<p className="text-sm text-gray-500">상태</p>
					<p className="font-medium text-gray-900">{lecture.lectureStatus}</p>
				</div>

				{/* Actions */}
				<div className="col-span-2 flex justify-end space-x-2">
					<button
						onClick={() => setIsAnnouncementModalOpen(true)}
						className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
					>
						공지사항 등록
					</button>
					<button
						onClick={() => setIsAnnouncementListModalOpen(true)}
						className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors opacity-80 hover:opacity-100"
					>
						공지사항 목록
					</button>
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
					>
						과제 등록
					</button>
					<button
						onClick={() => setIsListModalOpen(true)}
						className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
					>
						과제 목록
					</button>
				</div>
			</div>

			{/* Lecture Time */}
			<div className="mt-3 pt-3 border-t border-gray-100">
				<p className="text-sm text-gray-500">강의시간</p>
				<p className="text-sm font-medium text-gray-900">
					{lecture.lectureTimeAndLocation &&
						Object.keys(lecture.lectureTimeAndLocation).length > 0 ? (
						Object.entries(lecture.lectureTimeAndLocation).map(
							([time, location], index, arr) => (
								<span key={time}>
									{formatLectureTime(time)} ({location}호)
									{index < arr.length - 1 ? ", " : ""}
								</span>
							)
						)
					) : (
						<span>미정</span>
					)}
				</p>
			</div>

			<AssignmentModal
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

			<AssignmentListModal
				isOpen={isListModalOpen}
				onClose={() => setIsListModalOpen(false)}
				lectureId={lecture.lectureId}
			/>

			<AnnouncementModal
				isOpen={isAnnouncementModalOpen}
				onClose={() => setIsAnnouncementModalOpen(false)}
				lectureId={lecture.lectureId}
			/>

			<AnnouncementListModal
				isOpen={isAnnouncementListModalOpen}
				onClose={() => setIsAnnouncementListModalOpen(false)}
				lectureId={lecture.lectureId}
			/>
		</div>
	);
}