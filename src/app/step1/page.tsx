"use client";
import { useStep1 } from "@/playgrounds/step1";
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

const flexItem = tv({
  base: "p-2",
});

export default function Page() {
  const { data, isLoading, isValidating, clear, revalidate } = useStep1();
  // エラーが発生した場合のデータを取得する
  const {
    data: errorData,
    error,
    isLoading: errorIsLoading,
    isValidating: errorIsValidating,
    clear: errorClear,
    revalidate: errorRevalidate,
  } = useStep1("occuredError", { errorRetryCount: 0 }, "error");
  // useSWRImmutableと同等のオプションを指定する
  // https://swr.vercel.app/ja/docs/revalidation#disable-automatic-revalidations
  const {
    data: immutableData,
    isLoading: immutableIsLoading,
    isValidating: immutableIsValidating,
    clear: immutableClear,
    revalidate: immutableRevalidate,
  } = useStep1("immutable", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Basic useSWR */}
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
          onClick={() => revalidate()}
        >
          mutate()
        </button>
        <button
          className={button({ type: "tertiary" })}
          type="button"
          onClick={() =>
            revalidate({
              message: `revalidate apply data: ${new Date().toISOString()}`,
            })
          }
        >
          mutate(data)
        </button>
        <button
          className={button({ type: "quaternary" })}
          type="button"
          onClick={() =>
            revalidate(
              {
                message: `revalidate apply data: ${new Date().toISOString()}`,
              },
              {
                revalidate: false,
              }
            )
          }
        >
          mutate(data) revalidate: false
        </button>
      </div>
      {/* Occured Error */}
      <div className={flexItem()}>
        <h1 className="text-xl font-bold">
          Occured Error useSWR (errorRetryCount: 0)
        </h1>
        <p>
          {errorData?.message}
          {!errorIsLoading && errorIsValidating && (
            <span>(isValidating...)</span>
          )}
        </p>
        {error && <p>Occured Error!!</p>}
        {errorIsLoading && <p>Now Loading...</p>}
        <button className={button()} type="button" onClick={errorClear}>
          mutate(undefined)
        </button>
        <button
          className={button({ type: "secondary" })}
          type="button"
          onClick={() => errorRevalidate()}
        >
          mutate()
        </button>
        <button
          className={button({ type: "tertiary" })}
          type="button"
          onClick={() =>
            errorRevalidate({
              message: `revalidate apply data: ${new Date().toISOString()}`,
            })
          }
        >
          mutate(data)
        </button>
      </div>
      {/* Immutable useSWR */}
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
          onClick={() => immutableRevalidate()}
        >
          mutate()
        </button>
      </div>
    </div>
  );
}
