"use client";
import { Button } from "@/components";
import { useStep1 } from "@/playgrounds/step1";
import { tv } from "tailwind-variants";

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
        <Button label="mutate(undefined)" type="primary" onClick={clear} />
        <Button
          label="mutate()"
          type="secondary"
          onClick={() => revalidate()}
        />
        <Button
          label="mutate(data)"
          type="tertiary"
          onClick={() =>
            revalidate({
              message: `revalidate apply data: ${new Date().toISOString()}`,
            })
          }
        />
        <Button
          label="mutate(data) revalidate: false"
          type="quaternary"
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
        />
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
        <Button label="mutate(undefined)" type="primary" onClick={errorClear} />
        <Button
          label="mutate()"
          type="secondary"
          onClick={() => errorRevalidate()}
        />
        <Button
          label="mutate(data)"
          type="tertiary"
          onClick={() =>
            errorRevalidate({
              message: `revalidate apply data: ${new Date().toISOString()}`,
            })
          }
        />
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
        <Button
          label="mutate(undefined)"
          type="primary"
          onClick={immutableClear}
        />
        <Button
          label="mutate()"
          type="secondary"
          onClick={() => immutableRevalidate()}
        />
      </div>
    </div>
  );
}
