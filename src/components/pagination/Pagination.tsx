//-assets
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface Props {
  page: number;
  pageCount: number;
  onClick: (arg: number) => void;
}

const Pagination = ({ page, pageCount, onClick }: Props) => {
  const chevron_class =
    "flex justify-center items-center w-6 h-6 transition-all duration-150";

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(pageCount, startPage + 4);

    if (page <= 3) {
      startPage = 1;
      endPage = Math.min(pageCount, 5);
    } else if (page >= pageCount - 2) {
      endPage = pageCount;
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`flex justify-center items-center w-8 h-6 text-xs text-gray-500 font-normal list-none rounded-full cursor-pointer transition-all duration-150 hover:bg-gray-50 ${
            i === page ? "bg-gray-100 text-gray-950" : ""
          }`}
          onClick={() => i !== page && onClick(i)}
        >
          <span>{i}</span>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination flex flex-row justify-center items-center gap-5 h-[56px]">
      <div
        className={`${chevron_class} ${
          page <= 1 ? "text-gray-200" : "text-gray-300 hover:text-gray-500"
        } cursor-pointer`}
        onClick={() => page > 1 && onClick(page - 1)}
      >
        <MdArrowBack />
      </div>

      <div className="flex flex-row items-center gap-2">
        {renderPageNumbers()}
      </div>

      <div
        className={`${chevron_class} ${
          page >= pageCount
            ? "text-gray-200"
            : "text-gray-300 hover:text-gray-500"
        } cursor-pointer`}
        onClick={() => page < pageCount && onClick(page + 1)}
      >
        <MdArrowForward />
      </div>
    </div>
  );
};

export default Pagination;
