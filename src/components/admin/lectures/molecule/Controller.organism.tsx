import { cn } from 'fast-jsx/util'
export default function Controller({ isOpen }: { isOpen: boolean }) {
	const container = {
		position: 'absolute left-1/2 -translate-x-1/2',
		size: 'w-24 h-24',
		border: 'rounded-full bg-gray-100 flex items-center justify-center'
	}
	return isOpen ? <div className={cn(container)}></div> : null;
}