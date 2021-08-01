import { rest } from "msw";

import type { NoteType } from "./type";

const endpoint = "/notes/:noteId/public";

/**
 * @package 特定のメモを公開する
 */
export const patchNotesNoteIdPublic = rest.patch<never, NoteType, { noteId: string }>(endpoint, (req, res, ctx) => {
  const { noteId } = req.params;
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId, public: !EXAMPLE_NOTE.public }));
});

const EXAMPLE_NOTE: NoteType = {
  id: "a9gVKV12YV1o0wyknm74x",
  content:
    "ウェブサイト（英: website）は、World Wide Web (WWW) 上にあり、一般に特定のドメイン名の下にある複数のウェブページの集まりのこと。サイトと呼ばれることもある。企業などの団体が自身を紹介するため自ら構築したサイトを、その団体の公式サイトなどと呼ぶ。\n" +
    "\n" +
    "ホームページと呼ばれることもあるが、この用法は誤用とされる場合もある。また、ウェブサイトのトップページのみをさしてホームページと呼ぶ場合もある。\n" +
    "\n" +
    "1990年代のWWWは実験運用の時代にあった。この時代には、WWW提案よりも前の集中型の思想を参考にして、組織の総合的な情報を掲載した、静的コンテンツによるウェブサイトを立ち上げ、手動で管理されるポータルサイトに登録を依頼する例が多かった。しかし、2000年代からロボット型検索エンジンによるウェブサイトの自動登録に移行し、 組織が複数のドメインを取得してサービス別にサイトを切り分けるなど、WWWの本来の思想である分散型のシステムに移行して行った。\n" +
    "\n" +
    "イギリスのネットクラフト社（英語版）の調査によると、1995年8月にはインターネット上のサイト数は約1万8000件だった。2006年11月2日の時点でサイト数は1億件を突破した[1]。また、インターネット統計サイトのインターネット・ライブ・スタッツのリアルタイム統計では、2014年9月16日に世界のサイト数が10億件を突破した。WWWの考察者とされるティム・バーナーズリーは、ミニブログのツイッターでこの様子を喜んでいる[2]。",
  public: true,
  updatedOn: "2021-07-31T14:10:30.538Z",
};
