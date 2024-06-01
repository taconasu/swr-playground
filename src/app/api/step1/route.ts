export type Step1Response = {
  message: string;
};

export async function GET() {
  // 無条件で2秒かかるGET APIくん
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Response.json({
    message: `Step.1 useSWR Response: ${new Date().toISOString()}`,
  });
}
