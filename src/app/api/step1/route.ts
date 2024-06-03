export type Step1Response = {
  message: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  // 無条件で2秒かかるGET APIくん
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // status が "error" の場合はエラーレスポンスを返却する
  if (status === "error") {
    return Response.error();
  }

  return Response.json({
    message: `Step.1 useSWR Response: ${new Date().toISOString()}`,
  });
}
