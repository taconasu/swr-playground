"use client";
import { useStep1 } from "@/playgrounds/step1";
import { tv } from "tailwind-variants";
import { Button } from "../Button";

const flexItem = tv({
  base: "p-2",
});

export const ChildComponent: React.FC = () => {
  const { data, error, isLoading, isValidating, clear, revalidate } = useStep1(
    "step3-ErrorBoundary",
    undefined,
    "error"
  );

  return (
    <div className="flex flex-col gap-4">
      {/* ErrorBoundary */}
      <div className={flexItem()}>
        <h1 className="text-xl font-bold">ErrorBoundary</h1>
        <p>
          {data?.message}
          {error && (
            // これはuseSWRのerrorオブジェクトの存在を確認するためのコードです
            <span>
              データの取得に失敗しました。時間を置いて再度お試しください。
            </span>
          )}
          {!isLoading && isValidating && <span>(isValidating...)</span>}
          {isLoading && <p>Now Loading...</p>}
        </p>
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
    </div>
  );
};
