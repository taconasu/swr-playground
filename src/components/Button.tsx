import { tv } from "tailwind-variants";

const button = tv({
  variants: {
    type: {
      primary:
        "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      secondary:
        "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      tertiary:
        "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      quaternary:
        "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    },
  },
  defaultVariants: {
    type: "primary",
  },
});

type Props = {
  type?: "primary" | "secondary" | "tertiary" | "quaternary";
  label: string;
  onClick: () => void;
};
export const Button: React.FC<Props> = ({
  type = "primary",
  label,
  onClick,
}) => (
  <button className={button({ type })} type="button" onClick={onClick}>
    {label}
  </button>
);
