import { rest } from "msw";

import type { ListNoteType } from "./type";

const endpoint = "/users/:userId/notes";

/**
 * @package 自分または特定のユーザーのメモ一覧を取得する
 */
export const getUsersUserIdNotes = rest.get<never, ListNoteType[], { userId: string }>(endpoint, (req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200), ctx.json(NOTE_LIST));
});

const NOTE_LIST: ListNoteType[] = [
  {
    id: "a9gVKV12YV1o0wyknm74x",
    excerpt:
      "ウェブサイト（英: website）は、World Wide Web (WWW) 上にあり、一般に特定のドメイン名の下にある複数のウェブページの集まりのこと。サイトと呼ばれることもある。企業などの団体が自身を紹介するため自ら構築したサイトを、その団体の公式サイトなどと呼ぶ。\n\nホ",
    public: true,
    updatedOn: "2021-07-31T14:10:30.538Z",
  },
  {
    id: "9_0SrJE92WGz_fkd-tXGq",
    excerpt:
      "広義には、社会的ネットワークの構築の出来るサービスやウェブサイトであれば、ソーシャル・ネットワーキング・サービス（以下、SNS）またはソーシャル・ネットワーキング・サイトと定義される。この為、電子掲示板も広義的にはSNSに含まれることがある。\n\n狭義には、SNSとは人と人とのつな",
    public: true,
    updatedOn: "2021-07-31T06:37:03.004Z",
  },
  {
    id: "i4j6fPibsWrI2jBt6YFNF",
    excerpt:
      "ドローン宅配便（ドローンたくはいびん）とは、小型の無人飛行機（ドローン）を用いた商品宅配サービスのことである。\n\n2013年12月ネット通販最大手のアメリカ企業のアマゾン・ドット・コムがドローンを使った商品の配送を検討していると公表し、注目を集めた[1]。アメリカ国内では、ドロー",
    public: true,
    updatedOn: "2021-07-31T02:34:04.460Z",
  },
];
