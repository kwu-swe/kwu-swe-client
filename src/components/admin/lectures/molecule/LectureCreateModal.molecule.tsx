import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Course } from "@/types/Course";
import { LectureCreate, LectureTime, Semester, SEMESTER_LABEL, LECTURE_TIME_LABEL } from "@/types/Lecture";
import { User } from "@/types/User";
import useLecture from "@/hook/useLecture";
import useCourse from "@/hook/useCourse";
import useLocation from "@/hook/useLocation";
import { Select } from "fast-jsx";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function LectureCreateModal({ isOpen, onClose, }: Props) {
	const { post } = useLecture();
	const { courses } = useCourse();
	const { locations } = useLocation();
	const [sizeLimit, setSizeLimit] = useState<string>("");
	const [year, setYear] = useState<string>(new Date().getFullYear().toString());
	const [semester, setSemester] = useState<Semester>("FIRST_SEMESTER");
	const [courseId, setCourseId] = useState<string>("");
	const [selectedTimes, setSelectedTimes] = useState<
		Array<{ time: LectureTime; location: number }>
	>([]);
	const [selectedTime, setSelectedTime] = useState<string>();
	const [selectedLocation, setSelectedLocation] = useState<string>();


	const handleAddTime = (time: LectureTime, location: number) => {
		setSelectedTimes((prev) => [...prev, { time, location }]);
		setSelectedTime(undefined);
		setSelectedLocation(undefined);
	};

	const handleRemoveTime = (index: number) => {
		setSelectedTimes((prev) => prev.filter((_, i) => i !== index));
	};
	const handleSubmit = () => {
		if (!courseId) {
			alert("과목을 선택해주세요");
			return;
		}
		if (!semester) {
			alert("학기를 선택해주세요");
			return;
		}
		if (!sizeLimit || parseInt(sizeLimit) <= 0) {
			alert("올바른 수강 정원을 입력해주세요");
			return;
		}
		if (!year || parseInt(year) < 2000) {
			alert("올바른 년도를 입력해주세요");
			return;
		}
		if (selectedTimes.length === 0) {
			alert("강의 시간을 추가해주세요");
			return;
		}

		post({
			sizeLimit: +sizeLimit,
			year: +year,
			lectureStatus: "BEFORE",
			semester,
			courseId: +courseId,
			lectureTimeAndLocation: selectedTimes.reduce(
				(acc, { time, location }) => ({ ...acc, [time]: location }),
				{}
			) as Record<LectureTime, number>,
		});
	};

	const formStyles = {
		group: "flex flex-col gap-4",
		label: "text-sm font-medium text-gray-700",
		input:
			"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kw-brown/20",
		select: "w-full",
		timeList: "mt-4 space-y-2",
		timeItem: "flex items-center justify-between p-3 bg-gray-50 rounded-lg",
		timeText: "text-sm text-gray-600",
		addButton:
			"bg-kw-brown text-white px-4 py-2 rounded-lg hover:bg-kw-brown/90 transition-colors",
		removeButton: "text-red-500 hover:text-red-600 transition-colors",
		submitButton:
			"mt-6 w-full bg-kw-brown text-white px-4 py-3 rounded-lg hover:bg-kw-brown/90 transition-colors font-medium",
	};
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
									강의 생성
								</Dialog.Title>
								<div>
									<label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
										과목
									</label>
									<select
										id="courseId"
										value={courseId}
										onChange={(e) => setCourseId(e.target.value)}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										<option value="">과목을 선택하세요</option>
										{courses?.map((course) => (
											<option key={course.courseId} value={String(course.courseId)}>
												{course.courseName}
											</option>
										))}
									</select>
								</div>
								<div>
									<label htmlFor="year" className="block text-sm font-medium text-gray-700">
										년도
									</label>
									<input
										type="number"
										id="year"
										value={year}
										onChange={(e) => setYear(e.target.value)}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<div>
									<label htmlFor="semester" className="block text-sm font-medium text-gray-700">
										학기
									</label>
									<select
										id="semester"
										value={semester}
										onChange={(e) => setSemester(e.target.value as Semester)}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										<option value="">학기를 선택하세요</option>
										{Object.entries(SEMESTER_LABEL).map(([key, value]) => (
											<option key={key} value={key}>
												{value}
											</option>
										))}
									</select>
								</div>
								<div>
									<label htmlFor="sizeLimit" className="block text-sm font-medium text-gray-700">
										수강 정원
									</label>
									<input
										type="number"
										id="sizeLimit"
										value={sizeLimit}
										onChange={(e) => setSizeLimit(e.target.value)}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700">
										강의 시간
									</label>
									<div className="mt-2 space-y-2">
										<div className="flex gap-2">
											<select
												value={selectedTime}
												onChange={(e) => setSelectedTime(e.target.value)}
												className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											>
												<option value="">시간을 선택하세요</option>
												{Object.keys(LECTURE_TIME_LABEL).map((time) => (
													<option key={time} value={time}>
														{LECTURE_TIME_LABEL[time as LectureTime]}
													</option>
												))}
											</select>
											<select
												value={selectedLocation}
												onChange={(e) => setSelectedLocation(e.target.value)}
												className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											>
												<option value="">강의실을 선택하세요</option>
												{locations?.map((location) => (
													<option key={location.locationId} value={location.locationId}>
														{location.locationName}
													</option>
												))}
											</select>
											<button
												type="button"
												onClick={() => {
													if (!selectedTime || !selectedLocation) return;
													handleAddTime(selectedTime as LectureTime, parseInt(selectedLocation));
												}}
												className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
											>
												추가
											</button>
										</div>
										{selectedTimes.length > 0 && (
											<div className="mt-2 space-y-1">
												{selectedTimes.map((item, index) => (
													<div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
														<span className="text-sm text-gray-700">
															{LECTURE_TIME_LABEL[item.time]} - {locations?.find(loc => loc.locationId === item.location)?.locationName}
														</span>
														<button
															type="button"
															onClick={() => handleRemoveTime(index)}
															className="text-sm text-red-600 hover:text-red-700"
														>
															삭제
														</button>
													</div>
												))}
											</div>
										)}
									</div>
								</div>

								<div className="mt-6 flex justify-end gap-3">
									<button
										type="button"
										onClick={onClose}
										className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
									>
										취소
									</button>
									<button
										onClick={() => handleSubmit()}
										className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										생성
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

const timeOptions = [
	"MON_1",
	"MON_2",
	"MON_3",
	"MON_4",
	"MON_5",
	"MON_6",
	"MON_7",
	"MON_8",
	"TUE_1",
	"TUE_2",
	"TUE_3",
	"TUE_4",
	"TUE_5",
	"TUE_6",
	"TUE_7",
	"TUE_8",
	"WED_1",
	"WED_2",
	"WED_3",
	"WED_4",
	"WED_5",
	"WED_6",
	"WED_7",
	"WED_8",
	"THU_1",
	"THU_2",
	"THU_3",
	"THU_4",
	"THU_5",
	"THU_6",
	"THU_7",
	"THU_8",
	"FRI_1",
	"FRI_2",
	"FRI_3",
	"FRI_4",
	"FRI_5",
	"FRI_6",
	"FRI_7",
	"FRI_8",
] as LectureTime[];