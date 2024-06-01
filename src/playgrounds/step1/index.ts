import { Step1Response } from "@/app/api/step1/route";
import useSWR from "swr";
import type { SWRConfiguration } from "swr";

export const useStap1 = (key?: string, options?: SWRConfiguration) => {
  const fetcher = async (): Promise<Step1Response> => {
    const res = await fetch("/api/step1");
    const data = await res.json();
    return data;
  };
  const { data, isLoading, isValidating, mutate } = useSWR(
    ["/api/step1", key],
    fetcher,
    options
  );

  // キャッシュを削除（undefined）して再取得をする（これによってisLoadingがtrueになる）
  const clear = () => mutate(undefined);
  // リクエストを再検証する
  // https://swr.vercel.app/ja/docs/mutation#revalidation
  const revalidate = () => mutate();

  return { data, isLoading, isValidating, clear, revalidate };
};
