"use client";
import { useStap1 } from "@/playgrounds/step1";
import { tv } from "tailwind-variants";

const button = tv({
  variants: {
    type: {
      primary:
        "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      secondary:
        "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    },
  },
  defaultVariants: {
    type: "primary",
  },
});

const flexItem = tv({
  base: "p-2",
});

export default function Page() {
  const { data, isLoading, isValidating, clear, revalidate } = useStap1();
  // useSWRImmutableと同等のオプションを指定する
  // https://swr.vercel.app/ja/docs/revalidation#disable-automatic-revalidations
  const {
    data: immutableData,
    isLoading: immutableIsLoading,
    isValidating: immutableIsValidating,
    clear: immutableClear,
    revalidate: immutableRevalidate,
  } = useStap1("immutable", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className={flexItem()}>
        <h1 className="text-xl font-bold">Basic useSWR</h1>
        <p>
          {data?.message}
          {!isLoading && isValidating && <span>(isValidating...)</span>}
        </p>
        {isLoading && <p>Now Loading...</p>}
        <button className={button()} type="button" onClick={clear}>
          mutate(undefined)
        </button>
        <button
          className={button({ type: "secondary" })}
          type="button"
          onClick={revalidate}
        >
          mutate()
        </button>
      </div>
      <div className={flexItem()}>
        <h1 className="text-xl font-bold">Immutable useSWR</h1>
        <p>
          {immutableData?.message}
          {!immutableIsLoading && immutableIsValidating && (
            <span>(isValidating...)</span>
          )}
        </p>
        {immutableIsLoading && <p>Now Loading...</p>}
        <button className={button()} type="button" onClick={immutableClear}>
          mutate(undefined)
        </button>
        <button
          className={button({ type: "secondary" })}
          type="button"
          onClick={immutableRevalidate}
        >
          mutate()
        </button>
      </div>
    </div>
  );
}
