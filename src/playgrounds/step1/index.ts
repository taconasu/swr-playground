import { Step1Response } from "@/app/api/step1/route";
import useSWR from "swr";
import type { MutatorOptions, SWRConfiguration } from "swr";

export const useStep1 = (
  key?: string,
  options?: SWRConfiguration,
  status: "ok" | "error" = "ok"
) => {
  const fetcher = async (): Promise<Step1Response> => {
    const res = await fetch(`/api/step1?status=${status}`);
    const data = await res.json();
    return data;
  };
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ["/api/step1", key],
    fetcher,
    options
  );

  // キャッシュを削除（undefined）して再取得をする（これによってisLoadingがtrueになる）
  const clear = () => mutate(undefined);
  // リクエストを再検証する
  // https://swr.vercel.app/ja/docs/mutation#revalidation
  const revalidate = (applyData?: Step1Response, options?: MutatorOptions) => {
    if (!applyData) return mutate();
    return mutate(applyData, options);
  };

  return { data, error, isLoading, isValidating, clear, revalidate };
};
