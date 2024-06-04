"use client";
import { SWRErrorProvider } from "@/components/SWRErrorProvider";
import { ChildComponent } from "@/components/step3/ChildComponent";

export default function Page() {
  return (
    <>
      <SWRErrorProvider fallback={<p>SWRProviderのfallbackテキスト</p>}>
        <ChildComponent />
      </SWRErrorProvider>
    </>
  );
}
