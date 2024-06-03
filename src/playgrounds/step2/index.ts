import { Step2Response } from "@/app/api/step2/route";
import { useCallback, useState } from "react";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export const useStep2 = (options?: SWRInfiniteConfiguration) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getKey = (index: number, _previousPageData: Step2Response[]) => {
    const pageIndex = index + 1;
    // fetcherの第一引数に渡る (SWRのキーとしても利用される)
    return [`/api/step2?page=${pageIndex}`, pageIndex];
  };

  const fetcher = async (keyData: any[]): Promise<Step2Response> => {
    const [_key, pageIndex] = keyData;
    const res = await fetch(`/api/step2?page=${pageIndex}`);
    const data = await res.json();
    return data;
  };
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<Step2Response>(getKey, fetcher, options);

  // ページネーションのボタンクリック時のハンドラ
  const handlePaginate = useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (size < page) setSize(page);
    },
    [setSize, size]
  );

  // キャッシュを削除
  const clear = () => mutate(undefined);

  const revalidate = (pageNumber?: number) => {
    if (!pageNumber) return mutate();

    // 特定のページの再検証を行う
    // https://swr.vercel.app/ja/docs/pagination#revalidate-specific-pages
    mutate(data, {
      revalidate: (pageData) => pageData.currentPage === pageNumber,
    });
  };

  const revalidateLastPage = () =>
    mutate(data, {
      // 取得済みの最後のページのみを再検証する
      revalidate: (pageData) => pageData.currentPage === size,
    });

  return {
    data,
    currentPage,
    error,
    isLoading,
    isValidating,
    size,
    handlePaginate,
    setSize,
    clear,
    revalidate,
    revalidateLastPage,
  };
};
