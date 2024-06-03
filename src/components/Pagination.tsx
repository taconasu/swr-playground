import Link from "next/link";
import { tv } from "tailwind-variants";

const prev = tv({
  base: "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
});
const next = tv({
  base: "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
});
const page = tv({
  base: "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
  variants: {
    current: {
      true: "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
    },
  },
  defaultVariants: {
    current: false,
  },
});

type Props = {
  totalPage: number;
  currentPage: number;
  onPaginate: (page: number) => void;
  className?: string;
};

export const Pagination: React.FC<Props> = ({
  totalPage,
  currentPage,
  onPaginate,
  className,
}) => (
  <nav aria-label="Page navigation example" className={className}>
    <ul className="inline-flex -space-x-px text-base h-10">
      {currentPage > 1 && (
        <li>
          <Link
            href={`/step2?page=${currentPage - 1}`}
            className={prev()}
            onClick={() => onPaginate(currentPage - 1)}
          >
            Prev
          </Link>
        </li>
      )}
      {[...Array(totalPage)].map((_, i) => (
        <li key={`pagenation-${i}`}>
          <Link
            href={`/step2?page=${i + 1}`}
            className={page({ current: i + 1 === currentPage })}
            onClick={() => onPaginate(i + 1)}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {currentPage < totalPage && (
        <li>
          <Link
            href={`/step2?page=${currentPage + 1}`}
            className={next()}
            onClick={() => onPaginate(currentPage + 1)}
          >
            Next
          </Link>
        </li>
      )}
    </ul>
  </nav>
);
