export type Step2Response = {
  data: Array<{ id: string; name: string }>;
  currentPage: number;
  totalPage: number;
};

const responseData: Step2Response[] = [
  {
    data: [
      { id: "page1-item1", name: "銀狼" },
      { id: "page1-item2", name: "花火" },
      { id: "page1-item3", name: "星" },
      { id: "page1-item4", name: "ブローニャ" },
      { id: "page1-item5", name: "ヘルタ" },
    ],
    currentPage: 1,
    totalPage: 3,
  },
  {
    data: [
      { id: "page2-item1", name: "青雀" },
      { id: "page2-item2", name: "ロビン" },
      { id: "page2-item3", name: "アベンチュリン" },
      { id: "page2-item4", name: "白露" },
      { id: "page2-item5", name: "ルアン・メェイ" },
    ],
    currentPage: 2,
    totalPage: 3,
  },
  {
    data: [
      { id: "page3-item1", name: "ゼーレ" },
      { id: "page4-item2", name: "姫子" },
    ],
    currentPage: 3,
    totalPage: 3,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  // 無条件で2秒かかるGET APIくん
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return Response.json(responseData[Number(page) - 1]);
}
