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

### Sample API

`src/api/step1/route.ts`にて２秒後に現在日時付きのデータを返却する GET API を用意

### Sample SWR hooks

`src/playgrounds/step1/index.ts`にて基本的な useSWR の実装を用意  
`useStap1`として hooks を export し、利用する画面でデータやローディングの状態、再検証のためのハンドラを受け取れるように実装

### Sample Page

`src/app/step1/page.tsx`にて、オプションを利用しないベーシックな SWR の利用ケースと`useSWRImmutable`と同等のオプションを指定したケースの 2 パターンを用意  
それぞれの場合の再検証の挙動を確認可能
