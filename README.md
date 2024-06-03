# SWR-Playground

SWR をお試しするための実験用リポジトリ

## Setup

```sh
# setup corepack
corepack enable
corepack prepare --activate

# install packages
pnpm i
```

# Learning

## Step.1 useSWR

オーソドックスな[useSWR API](https://swr.vercel.app/ja/docs/api)の利用方法を試す

### Files

- `src/api/step1/route.ts`
- `src/playgrounds/step1/index.ts`
- `src/app/step1/page.tsx`

### 📝 Memo

- immutable なオプションを適用した場合、初回の fetch 時や mutate 実行時の挙動は通常の useSWR と変わらない
- fetcher で error が発生した場合、data が存在しないため再検証時および mutate 実行時は`isLoading`も true になる
- fetcher で error 発生時、useSWR はデフォルトで API の再試行を試みる
  - 再試行をさせたくない場合は useSWR のオプションで`errorRetryCount: 0`を指定する
    - 再試行（retry）と再検証（revalidate）は別物なので`errorRetryCount`を 0 にしても revalidate は有効にしていれば実行される
  - 再試行の間隔を調整したい場合は`errorRetryInterval`で任意のミリ秒を指定する
- 再検証時にエラーが発生した場合は直前で取得成功している data は残る（エラー発生によって data が undefined になったりはしない）
