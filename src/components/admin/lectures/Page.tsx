import ReadTemplate from "./template/Read.template";
import useLecture from "@/hook/useLecture";

export default function LecturePage() {
	const { lectures, isLoading } = useLecture();

	return (
		<div>
			<ReadTemplate lectures={lectures} isLoading={isLoading} />
		</div>
	);
}