# Qin Memo

## 使用技術

- React
- Next.js
- TypeScript
- ESLint
- Prettier
- Jest
- GitMoji 😜

## セットアップ

### ① yarn の準備

まずは yarn がインストールされているか確認しましょう。ターミナルで下記コマンドを打ってバージョンが表示されたら、それ以降の手順は飛ばして OK です。

```
yarn -v
```

yarn がまだの方はインストールしましょう。yarn のインストールには npm が必要です。まずは npm が入っているか確認しましょう。

```
npm -v
```

バージョンが表示された方は下記コマンドを打って、yarn をインストールしてください。

```
npm install -g yarn
```

npm が入っていなかった方は Node.js も入っていないと思うので、[こちら](https://www.npmjs.com/get-npm)から Node.js をインストールしてください。npm は Node.js とともに配布されるため、Node.js をインストールしたら npm も自動的にインストールされます。その後、yarn をインストールしてください。

### ② VS Code 拡張機能のインストール

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### ③ リポジトリのクローン

このリポジトリをローカル環境にクローンしてください。

コマンドで行う場合

```
git clone https://github.com/qin-salon/qin-memo.git
```

VS Code で行う場合は、リポジトリをクローンする（英語だと Clone Repository）というボタンがあるので、それをクリックしていただき、`https://github.com/qin-salon/qin-memo.git` を入力してエンターを押してください。

### ④ 依存関係のインストール

ターミナルを開き、下記コマンドで依存関係をインストールしましょう。以上で、環境構築は完了です。

```
yarn
```

## 開発する

開発を行う場合

```
yarn dev // localhost:3000 で立ち上がります
```

本番の動作確認を行う場合

```
yarn build
yarn start // localhost:3000 で立ち上がります。dev中はportを変える必要があります。
```

## Git ブランチ戦略

考え中。

## 貢献者

考え中。
