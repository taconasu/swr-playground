"use client";
import { useState } from "react";
import { SWRConfig } from "swr";

type Props = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

export const SWRErrorProvider: React.FC<Props> = ({ fallback, children }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  // Error Responseを受け取っている場合はfallbackを表示する
  if (hasError) {
    return <>{fallback}</>;
  }

  return (
    <SWRConfig
      value={{
        // 再試行の結果正常に取得できた場合は通常通り子要素を表示する
        onSuccess: () => {
          setHasError(false);
        },
        onError: (_error: any, _key: string) => {
          setHasError(true);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
