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

オーソドックスな[useSWR API](https://swr.vercel.app/ja/docs/api)を試す

### Files

- `src/api/step1/route.ts`
- `src/playgrounds/step1/index.ts`
- `src/app/step1/page.tsx`

### 📝 Memo

- Option の型は`SWRConfiguration`
  - `swr`から import
- immutable なオプションを適用した場合、初回の fetch 時や mutate 実行時の挙動は通常の useSWR と変わらない
- fetcher で error が発生した場合、data が存在しないため再検証時および mutate 実行時は`isLoading`も true になる
- fetcher で error 発生時、useSWR はデフォルトで API の再試行を試みる
  - 再試行をさせたくない場合は useSWR のオプションで`errorRetryCount: 0`を指定する
    - 再試行（retry）と再検証（revalidate）は別物なので`errorRetryCount`を 0 にしても revalidate は有効にしていれば実行される
  - 再試行の間隔を調整したい場合は`errorRetryInterval`で任意のミリ秒を指定する
- 再検証時にエラーが発生した場合は直前で取得成功している data は残る（エラー発生によって data が undefined になったりはしない）

## Step.2 useSWRInfinite

ページネーションや無限ローディングのための[useSWRInfinite API](https://swr.vercel.app/ja/docs/pagination#useswrinfinite)を試す

### Files

- `src/api/step2/route.ts`
- `src/playgrounds/step2/index.ts`
- `src/app/step2/page.tsx`

### 📝 Memo

- Option の型は`SWRInfiniteConfiguration`
  - `swr/infinite`から import
- `useSWRInfinite`の第一引数には fetcher の前処理となる getKey 関数を指定する
  - getKey の返り値は SWR のキー情報となるだけでなく、fetcher の引数となる
  - ページ番号などを fetcher に渡すために利用することもできる
- デフォルトでは再検証時に毎回最初のページを revalidate してしまう
  - 無効にしたい場合は options の`revalidateFirstPage`を false にする
- 特定のページのみ再検証させたい場合は mutate の`revalidate` options を使う
  - revalidate 対象のページの場合のみ true を返却するような関数を指定する
  - 👆 の関数はページごとに再帰的に検証する（関数の引数として当該ページのデータを参照できる）
- `mutate()`は取得済みの全ページを再検証する
- useSWRInfinite で自動再検証を無効にしたい場合は、useSWRImmutable と同等にするための以下のオプションを true にする
  - `revalidateIfStale` / `revalidateOnFocus` / `revalidateOnReconnect`
  - [自動再検証の無効化](https://swr.vercel.app/ja/docs/revalidation#disable-automatic-revalidations)
- getKey 関数で null を返却した場合、当該 index の処理をスキップするわけではなく、data が存在しない状態になる
  - 特定のページの fetch をスキップする用途では利用できない
- `parallel`オプションで並列リクエストが可能
  - ページネーションで一気に数百ページ先を読み込む時などは危険そう

## Step.3 SWR Error Provider

エラー発生時に備えた fallback コンポーネントの表示を試す

今回は SWRConfig の`onError`ハンドラを用いてエラーが発生している場合は Provider 配下のコンポーネントを表示せずに、fallback コンポーネントを表示させる実装を試す

### Files

※useSWR や hooks についてはエラーレスポンスを試行できさえすればよいので Step.1 のものを流用する

- `src/app/step3/page.tsx`
- `src/components/step3/ChildComponent.tsx`
  - fallback によって表示されなくなるコンポーネント
- `src/components/SWRErrorProvider.tsx`
  - ページ全体をラップして、配下のコンポーネントで SWR の API リクエストでエラーが発生した場合に fallback を表示する

### 📝 Memo

- `SWRConfig`の onError を使うことで fetcher のエラー発生時にハンドリングが可能
  - onError は useSWR の [options](https://swr.vercel.app/ja/docs/api#options) でも利用可能（スコープの制御が可能）
- 再試行などをさせる場合、`onSuccess`を利用するとより柔軟なハンドリングができる
