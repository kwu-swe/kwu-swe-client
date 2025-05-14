import { Button } from "fast-jsx";
import ReadTemplate from "./template/Read.template";
import CreateTemplate from "./template/Create.template";
import useLecture from "@/hook/useLecture";

export default function LecturePage() {
	const { lectures, post, isCreateMode, setIsCreateMode, isLoading } = useLecture();

	return (
		<div>
			<Button title="강의 생성" onClick={() => setIsCreateMode(true)} />
			<ReadTemplate lectures={lectures} isLoading={isLoading} />
			{isCreateMode && <CreateTemplate post={post} />}
		</div>
	);
}