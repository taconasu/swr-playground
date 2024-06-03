"use client";
import { Button, Pagination, Table } from "@/components";
import { useStep2 } from "@/playgrounds/step2";
import { tv } from "tailwind-variants";

const flexItem = tv({
  base: "p-2",
});

export default function Page() {
  const {
    data,
    currentPage,
    isLoading,
    isValidating,
    handlePaginate,
    clear,
    revalidate,
    revalidateLastPage,
  } = useStep2({ revalidateFirstPage: false });

  return (
    <div className="flex flex-col gap-4">
      {/* Basic useSWRInfinite */}
      <div className={flexItem()}>
        <h1 className="text-xl font-bold">useSWRInfinite</h1>
        <div className="py-4">
          {data && data.length > 0 && (
            <div className="flex flex-col gap-4">
              {data[currentPage - 1] && (
                <Table
                  headers={Object.keys(data[currentPage - 1].data[0])}
                  data={data[currentPage - 1].data.map((d) => Object.values(d))}
                />
              )}
              <Pagination
                totalPage={data[0].totalPage}
                currentPage={currentPage}
                onPaginate={handlePaginate}
                className="self-center"
              />
            </div>
          )}
          {!isLoading && isValidating && <span>(isValidating...)</span>}
        </div>
        {isLoading && <p>Now Loading...</p>}
        <Button type="primary" label="mutate(undefined)" onClick={clear} />
        <Button
          type="secondary"
          label="mutate() (revalidate all page)"
          onClick={() => revalidate()}
        />
        {/* 現在のページを再検証する実装 */}
        <Button
          type="tertiary"
          label="mutate(data) (revalidate current page)"
          onClick={() => revalidate(currentPage)}
        />
        {/* 取得済みの最後のページを再検証する実装 */}
        <Button
          type="quaternary"
          label="mudate(data) (revalidate last page)"
          onClick={revalidateLastPage}
        />
      </div>
    </div>
  );
}
