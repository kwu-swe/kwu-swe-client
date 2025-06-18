import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Submission } from "@/types/Assignment";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/date";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	submission?: Submission;
	mode: 'view';
}

export default function SubmissionDetailModal({
	isOpen,
	onClose,
	submission,
	mode
}: Props) {
	if (!submission) return null;

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
					<div className="flex min-h-full items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
								<div className="flex items-center justify-between mb-6">
									<div>
										<Dialog.Title className="text-lg font-semibold text-gray-900">
											과제 상세 내용
										</Dialog.Title>
										<p className="mt-1 text-sm text-gray-500">
											제출된 과제의 상세 내용을 확인할 수 있습니다.
										</p>
									</div>
									<button
										type="button"
										className="text-gray-400 hover:text-gray-500 transition-colors"
										onClick={onClose}
									>
										<XMarkIcon className="h-6 w-6" />
									</button>
								</div>

								<div className="space-y-6">
									<div>
										<h3 className="text-sm font-medium text-gray-900">과제 내용</h3>
										<div className="mt-2 p-4 bg-gray-50 rounded-lg">
											<p className="text-sm text-gray-700 whitespace-pre-wrap">
												{submission.content}
											</p>
										</div>
									</div>

									{submission.encodedFiles && submission.encodedFiles.length > 0 && (
										<div>
											<h3 className="text-sm font-medium text-gray-900 mb-2">첨부 파일</h3>
											<div className="space-y-2">
												{submission.encodedFiles.map((file, index) => (
													<div
														key={index}
														className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
													>
														<span className="text-sm text-gray-700">
															첨부파일 {index + 1}
														</span>
														<button
															onClick={() => {
																window.open(file, '_blank');
															}}
															className="text-kw-brown hover:text-kw-brown/80 text-sm font-medium transition-colors"
														>
															다운로드
														</button>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
