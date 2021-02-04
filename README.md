# Qin Memo

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 使用技術

- [React](https://ja.reactjs.org/)
  - 言わずとしれた Facebook 製 UI ライブラリ。
- [Next.js](https://nextjs.org/)
  - React のフレームワーク。純粋な React だけで構築するとしんどい部分を簡単にしてくれます。最も将来性が高いと思っている技術です。
- [TypeScript](https://www.typescriptlang.org/)
  - 型を使うことでバグを防いだり、ドキュメント代わりになったり、チーム開発がスムースになります。
- [ESLint](https://eslint.org/)
  - コードを分析し問題点を指摘してくれるツールです。これがあることでメンバー同士のコード差異が少なくなったり、独自ルールを追加して書き方を統一できます。
- [Prettier](https://prettier.io/)
  - コードフォーマッターです。改行やクォーテーションなどを統一できます。ESLint とあわせて使うのが一般的で、ESLint だけでは実現できない部分をカバーします。
- [Jest](https://jestjs.io/ja/)
  - Facebook 製の JavaScript のテスティングフレームワークです。テストに関する様々な機能を提供しており、ドキュメントも豊富かつ実績もあるため、採用しています。
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - React "Components"をテストするためのものです。[Jest 公式](https://jestjs.io/docs/ja/tutorial-react#dom-%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88)でもコンポーネントをテストしたい場合に使えるものだと言及されています。
- [GitMoji](https://gitmoji.dev/) 😜
  - Commit メッセージに絵文字を使うことでパッと見で分かりやすくするものです。

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

npm が入っていなかった方は Node.js も入っていないと思うので、まずは Node.js をインストールしてください。インストール方法はたくさんありますが、[VOLTA](https://volta.sh/)をオススメしております。VOLTA のサイトを参考に Node.js をインストールしてください。

npm は Node.js とともに配布されるため、Node.js をインストールしたら npm も自動的にインストールされます。その後、yarn をインストールしてください。

Next.js のインストールは、④ 依存関係のインストールの yarn で実行されるので、npx 等でインストールする必要はありません。

### ② VS Code 拡張機能のインストール

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

上記の拡張機能をいれることで、保存時に自動で ESLint(+Prettier) が走り、コードを整形してくれます。

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

## Git ブランチルール

`main`

- マージされると本番に自動反映されます。

`develop`

- 本番反映前に確認するための環境（ステージング環境）。
- 常駐しているブランチで、feature からの変更を受け付け、main にマージする。

`hotfix`

- 本番で発生した緊急のバグに対処するためのブランチ。
- 必ず main から分岐し、main と develop にマージする。

`feature/あなたのGitHub名-*`

- 開発にはここを用いる。
- 必ず develop から分岐し、develop にマージする。
- 「あなたの GitHub 名」にはアカウント名を入力。
- `*` は開発するものを簡易的に記入。
- 例: feature/lightsound-add-about-page

`main`, `develop`, `hotfix` に直接 push してはいけません。基本的に皆さんが触って良いのは `feature/あなたのGitHub名_*` ブランチだけです。

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://youtube.com/c/shimabu_it"><img src="https://avatars2.githubusercontent.com/u/8220973?v=4?s=100" width="100px;" alt=""/><br /><sub><b>しまぶー</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/commits?author=lightsound" title="Documentation">📖</a> <a href="#projectManagement-lightsound" title="Project Management">📆</a> <a href="https://github.com/qin-salon/qin-memo/pulls?q=is%3Apr+reviewed-by%3Alightsound" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/satoru-hirai"><img src="https://avatars2.githubusercontent.com/u/62086450?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sa hi</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/commits?author=satoru-hirai" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ippo012"><img src="https://avatars3.githubusercontent.com/u/9071515?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ippo</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/pulls?q=is%3Apr+reviewed-by%3Aippo012" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://freelance-jak.com/"><img src="https://avatars3.githubusercontent.com/u/44320334?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Takumi Okada</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/commits?author=reachscript-jak" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mike3104"><img src="https://avatars2.githubusercontent.com/u/64879464?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mike</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/commits?author=mike3104" title="Code">💻</a></td>
    <td align="center"><a href="https://fe-notes.work/"><img src="https://avatars.githubusercontent.com/u/38152917?v=4?s=100" width="100px;" alt=""/><br /><sub><b>reeve0930</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/commits?author=reeve0930" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/magatakohei"><img src="https://avatars.githubusercontent.com/u/65271262?v=4?s=100" width="100px;" alt=""/><br /><sub><b>magako</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/commits?author=magatakohei" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Takanaka123"><img src="https://avatars.githubusercontent.com/u/76854640?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Takanaka123</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/commits?author=Takanaka123" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/abc123931"><img src="https://avatars.githubusercontent.com/u/15182311?v=4?s=100" width="100px;" alt=""/><br /><sub><b>abc123931</b></sub></a><br /><a href="https://github.com/qin-salon/qin-memo/pulls?q=is%3Apr+reviewed-by%3Aabc123931" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
