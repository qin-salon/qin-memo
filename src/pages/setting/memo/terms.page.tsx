import type { NextPage } from "next";
import { Layout } from "src/layout";

const SettingMemoTerms: NextPage = () => {
  return (
    <Layout left="back" center="利用規約">
      <div className="mx-auto prose prose-blue dark:prose-light">
        <p>
          本規約は、合同会社Qin（以下「弊社」とします）が提供するブログサービス『Qin
          Memo』（以下「本サービス」とします）について、その利用者との間に適用されるものです。
        </p>

        <h4>第１条 利用登録等</h4>
        <ol>
          <li>本サービスは、本サービスを利用する各ユーザーを識別するための文字列を設定することがあります。</li>
          <li>
            ユーザーが本サービスを利用するには、ニックネーム、メールアドレス、パスワード等の登録、又は本サービスが指定する第三者の発行する
            ID 及びパスワードを求められることがあります。
          </li>
          <li>
            本サービスは、本サービスを利用するにあたり登録した情報（以下「登録情報」といいます）が以下に該当すると判断した場合、当該ユーザーによる登録を承認しないこと、当該登録を削除すること又は本サービスが適切と判断する措置を講ずることがあります。
            <ul>
              <li>登録情報が第三者に嫌悪感を与える等の公序良俗に反する表現を含んでいる場合</li>
              <li>本規約に違反したことがある者からの利用登録である場合</li>
              <li>本規約に違反したことがある者からの招待による利用登録である場合</li>
              <li>第三者になりすますことを目的としている場合</li>
              <li>本サービスの判断により､新規の利用を制限している場合</li>
              <li>前各号以外で、本サービスが不適切な利用であると判断する場合</li>
            </ul>
          </li>
        </ol>

        <h4>第２条 登録情報</h4>
        <ol>
          <li>ユーザーは、登録情報について、自己の責任の下、登録及び管理するものとします。</li>
          <li>
            本サービスは、ユーザーが登録情報を失念、削除、不正確又は虚偽であったためにユーザーが被った不利益及び損害に関して、責任を負わないものとします。
          </li>
          <li>
            ユーザーは、本サービスの事前の同意なく登録情報を第三者に利用させたり、貸与、譲渡、売買、質入、公開等をすることはできません。
          </li>
          <li>
            本サービスは、登録情報によって本サービスの利用があった場合、利用登録を行ったユーザー本人が利用したものと扱うことができ、当該利用によって生じた結果については、利用登録を行ったユーザー本人に帰属するものとします。
          </li>
          <li>
            ユーザーによる登録情報の管理が不十分であったために第三者が登録情報を不正使用した場合、ユーザーに不利益又は損害が生じても、本サービスは責任を負わないものとします。
          </li>
          <li>
            前項の第三者の不正使用により、本サービス又は第三者に損害が生じた場合、ユーザーは本サービス及び損害を被った第三者に対し、損害を賠償するものとします。
          </li>
          <li>
            ユーザーは、登録情報を第三者に不正に使用される可能性がある場合は、速やかに本サービスに通知するものとします。
          </li>
        </ol>

        <h4>第３条 本サービスの修正等</h4>
        <p>
          本サービスは、本サービスの都合により、ユーザーに通知することなく、いつでも任意の理由で本サービスについて修正、追加、変更、中断、終了、運営を第三者に委託、又は本サービスを第三者に譲渡することができます。この場合、ユーザーに発生した損害について、本サービスは一切の責任を負わないものとします。
        </p>

        <h4>第４条 個人情報について</h4>
        <ol>
          <li>本サービスは、ユーザーから取得した個人情報の保護に最大限の注意を払います。</li>
          <li>
            本サービスにおいて、本サービスが複数のユーザー間でメッセージの投稿又は掲示板への投稿を行う機能を設定した場合、ユーザー自身が投稿した個人情報、又は他のユーザーが投稿した当該ユーザーに関する個人情報が、他のユーザー又は第三者に知られることとなり、また利用されることになったとしても、本サービスは一切の責任を負いません。
          </li>
          <li>
            本サービスは、ユーザーの個人情報を以下の目的で利用することができるものとし、ユーザーはあらかじめこれに同意するものとします。
            <ul>
              <li>本人確認のため</li>
              <li>アフターサービス、問い合わせのため</li>
              <li>本サービスに関するお知らせ、その他の本サービスのサービスに関する情報の提供のため</li>
              <li>第三者の商品又はサービスに関する広告を提供するため</li>
              <li>アンケート、懸賞、キャンペーンの実施のため</li>
              <li>マーケティング調査、統計、分析のため</li>
              <li>規約、条件、ポリシーの変更等の通知を連絡するため</li>
              <li>その他本サービスが運営する各サービスにおいて定める目的のため</li>
            </ul>
          </li>
          <li>本サービスは、個人情報の取扱い業務の一部を他社に委託する場合があります。</li>
          <li>
            本サービスは、以下の場合には、ユーザーの個人情報を第三者に提供することができるものとし、ユーザーは予めこれに同意するものとします。
            <ul>
              <li>個人情報の開示、利用についてユーザーの同意がある場合</li>
              <li>ユーザーが希望するサービスを提供するために、第三者に対し個人情報の開示が必要と認められる場合</li>
              <li>本サービス又は第三者の広告、サービス等に関する情報を、ユーザーに送信する場合</li>
              <li>本サービスの向上、本サービスの事業開発、マーケティング等の目的で登録情報を集計又は分析等する場合</li>
              <li>個人情報の取扱業務を他社に委託する場合</li>
              <li>裁判所、検察庁、警察又はこれらに準ずる権限を有する公的機関から正当に開示を求められた場合</li>
              <li>
                国の機関もしくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合
              </li>
              <li>人の生命、身体及び財産等に対する差し迫った危険があり、緊急の必要性がある場合</li>
              <li>公衆衛生の向上又は青少年の健全な育成の推進のために特に必要がある場合</li>
              <li>合併、営業譲渡その他の事由による事業の承継の際に、事業を承継する者に対して開示する場合</li>
            </ul>
          </li>
          <li>本サービスは、個人情報を、個人情報保護管理者の統括の下、管理します。</li>
          <li>
            ユーザーは、個人情報に関する利用目的の通知、開示、内容の訂正/追加/削除、利用の停止、消去又は第三者への提供停止の請求を個人情報保護方針に記載された方法によりおこなうことができます。
          </li>
          <li>
            個人情報の登録は任意ですが必要な個人情報を登録頂けない場合は、本サービスの利用に支障が発生する場合があります。
          </li>
          <li>
            その他、本サービスのプライバシーに対する考え方の詳細については、
            <a target="_blank" rel="noopener noreferrer" href="/setting/memo/privacy">
              プライバシーポリシー
            </a>
            を参照してください。
          </li>
        </ol>

        <h4>第５条 同意事項</h4>
        <ol>
          <li>
            本サービスは、本サービスに本サービス又は第三者の広告を掲載することができるものとし、ユーザーはこれに同意するものとします。
          </li>
          <li>
            本サービスは、投稿情報の内容を確認し、法令・利用規約・公序良俗等に反する、青少年の健全な利用に反する又はその他不適切な利用であると本サービスが判断した場合には、ユーザー又は第三者が当該投稿情報等の内容を閲覧する前か否かに関わらず、当該投稿情報等の全部若しくは一部を削除、停止、あるいは裁判所・警察等の公的機関に開示・提供する等の本サービスが適切と判断する措置を行うことができるものとし、ユーザーはこれに同意するものとします。
          </li>
          <li>
            本サービスは、ユーザーが本サービスのリンク等を通じて本サービス以外のサービスを利用する場合には、ユーザーの責任で利用するものとし、ユーザーはこれに同意するものとします。
          </li>
          <li>
            本サービスは、ユーザーが本サービス及び本サービスによって表示される広告等を閲覧、利用等したことによって得られた個人を特定しない情報を集計、分析し、その結果を、本サービス、広告を本サービスに提供している第三者及び本サービスと業務提携している会社の事業開発、マーケティング、本サービスの改善・向上等の目的で利用することに、ユーザーは同意するものとします。
          </li>
          <li>
            ユーザーが、本サービスを利用することにより、本サービス又は他のユーザー等の第三者に対し損害を与えた場合、ユーザーは自己の費用と責任において生じた損害の一切を賠償する必要があることに予め同意するものとします。
          </li>
        </ol>

        <h4>第６条 禁止行為</h4>
        <ol>
          <li>
            ユーザーは、以下の行為又はそのおそれがある行為を行ってはならないものとします。
            <ul>
              <li>法令又は公序良俗に反する行為</li>
              <li>犯罪行為の全部又は一部をなす行為</li>
              <li>
                暴力的、グロテスク、その他一般的に不快を感ずる文章、画像、図画、イメージ、その他の表現及び情報等の投稿する行為
              </li>
              <li>ストーキング行為を行う等の第三者に対する嫌がらせ行為</li>
              <li>
                他のユーザー又は第三者を差別もしくは誹謗中傷し、又はその信用、名誉、プライバシー権、肖像権その他一切の権利を侵害する行為
              </li>
              <li>
                本サービス又は第三者の特許権、実用新案権、意匠権、商標権、著作権、技術上もしくは営業上のノウハウその他の権利、又はこれらの権利に基づく実施権等の権利を侵害する行為
              </li>
              <li>他のユーザー又は第三者の個人情報を投稿又は掲載する行為</li>
              <li>わいせつな表現、アダルト画像・図画、又は露出度の高い画像・図画を投稿する行為</li>
              <li>アダルトサイト、出会い系サイト、年齢制限を有するサイト等への誘導、リンクさせる行為</li>
              <li>政治的活動、宗教活動、宗教団体への勧誘する行為</li>
              <li>異性交際を求める/求めに応じる等の不適切な交際を促進する行為</li>
              <li>登録情報において、実在する第三者の人物・団体名などを登録する行為</li>
              <li>他のユーザー又は第三者になりすまして 本サービスを利用する行為</li>
              <li>連鎖講（マルチ商法、ねずみ講、マルチまがい商法）などに類する勧誘・取引行為</li>
              <li>
                本サービス内の機能、本サービス内の機能の操作、その他本サービスに関する一切の事由について、現実の通貨で売買する行為
              </li>
              <li>本サービスのサーバー又はネットワークに悪意をもって負荷をかける行為</li>
              <li>チートツール、BOT、その他の技術を利用して 本サービスを不正に操作する行為</li>
              <li>本サービスに発生した不具合を意図的に利用する行為</li>
              <li>ジェイルブレイク等、端末に対して改変を行った状態での 本サービスへのアクセス行為</li>
              <li>
                本サービスの全部又は一部を複製もしくは改変する行為、又は逆コンパイル等のリバースエンジニアリングをする行為
              </li>
              <li>本サービスを第三者に再配布する行為</li>
              <li>本サービスに関するウェブサイト上の情報を改ざん、又は消去する行為</li>
              <li>他のユーザー又は第三者をコンピューター・ウイルスに感染させる行為</li>
              <li>その他 本サービスにて本サービスが不正と判断する行為</li>
              <li>その他本サービスが不適切と判断する行為</li>
            </ul>
          </li>
          <li>
            本サービスは、ユーザーが前項各号の行為を行った又は本規約に違反した場合、当該ユーザーの本サービスの利用制限、利用停止、利用禁止、投稿情報の削除、登録情報の削除等の本サービスが適切と判断する措置を行うことができるものとします。
          </li>
          <li>
            本サービスは、本条第 1
            項各号の行為をユーザーが行うこと、又は受けることによって、他のユーザー又は第三者との間でトラブルが生じた場合、当該ユーザーは、自己の責任と費用においてこれを解決し、本サービスは一切の責任を負わないものとします。この場合において、本サービス又は第三者が何らかの損害を被ったときは、当該ユーザーは本サービス及び当該第三者に対して損害の賠償をしなければならないものとします。
          </li>
        </ol>

        <h4>第７条 免責事項</h4>
        <ol>
          <li>
            ユーザーは、自己責任において本サービスを利用するものとします。本サービスは、本サービスを利用してなされた一切の行為及びその結果について一切の責任を負わないものとします。
          </li>
          <li>
            本サービスは、ユーザーによる本サービスの不正利用又は不適切な利用について監視する義務を負わないものとします。
          </li>
          <li>
            本サービスは、本サービス及び本サービスに関連して提供されるデータ（ユーザーによるメッセージ投稿及び掲示板への投稿を含む）について、完全性、正確性、信頼性、有用性、合法性、道徳性等に関する保証を含め、一切の責任を負わないものとします。
          </li>
          <li>
            本サービス上にて掲載された広告の内容はすべて広告主が責任を負い、本サービス上もしくは遷移先問わず当該内容について真偽の判断はユーザーの自己責任において行うものとし、本サービスはそれによって生じた事項について、一切の責任を負わないものとします。
          </li>
          <li>
            本サービスは、本サービス及び提携先又は広告主等を含む第三者のウェブサイトからのダウンロードやコンピューター・ウイルス感染等により発生した損害について、賠償する義務を一切負わないものとします。
          </li>
          <li>
            本サービスは、本サービスに関するシステム障害、通信障害、停電、火災、自然災害、戦争、内乱、暴動、労働争議等の発生により本サービスの正常な運営が不能となった場合であっても、それによってユーザーに生じた損害について、一切の責任を負わないものとします。
          </li>
          <li>
            本サービスは、ユーザーが利用しているインターネット接続サービス及び端末の利用制限、中断、速度の低下、機能低下等によってユーザーに生じた損害について、一切の責任を負わないものとします。
          </li>
        </ol>

        <h4>第８条 ユーザー間等のトラブル</h4>
        <p>
          ユーザー間又はユーザーと主催者等の第三者との間で生じたトラブルについては、ユーザーは自己の責任で解決しなければならず、本サービスはこれらのトラブルに関して、一切の責任を負いません。
        </p>

        <h4>第９条 知的財産権の帰属</h4>
        <p>
          本サービスに関する特許権、実用新案権、意匠権、著作権等（著作権法第 27 条及び第 28
          条に規定する権利を含む。以下本条において総称して「知的財産権」といいます）は、本サービス又は正当な権利を有する第三者に帰属します。
        </p>

        <h4>第１０条 ユーザーへの通知</h4>
        <ol>
          <li>
            本サービスからの通知を、本サービス上に表示することにより行う場合は、本サービスが本サービス上に通知を表示したときに、ユーザーに通知が到達したものとみなします。
          </li>
          <li>
            本サービスからの通知を、本サービスに登録されたメールアドレス等に送信することにより行う場合は、通常到達すべきときに、ユーザーに通知が到達したものとみなします。
          </li>
          <li>
            本サービスからの通知を、チャット機能又はプッシュ通知により行う場合は、通常到達すべきときに、ユーザーに通知が到達したものとみなします。
          </li>
        </ol>

        <h4>第１１条 権利義務の譲渡の禁止</h4>
        <p>
          ユーザーは、本サービスに関するユーザー資格、ユーザー資格に基づく権利義務の一切を、第三者に譲渡し又は担保に供してはならないものとします。
        </p>

        <h4>第１２条 利用停止等</h4>
        <ol>
          <li>
            本サービスは、以下の各号に掲げる場合は、ユーザーに事前に通知又は催告することなく、本サービスの利用制限、又は利用停止させることができるものとします。
            <ul>
              <li>
                ユーザーによる本サービスを含む本サービスのサービスの利用に関し他のユーザー又は第三者から本サービスにクレーム、請求等がなされ、かつ本サービスが必要と認めた場合
              </li>
              <li>ユーザーが不正又は本サービスの予定していない方法により賞金等を獲得又は受け取った場合</li>
              <li>ユーザーが反社会勢力に該当しもしくは該当していたことが判明した場合</li>
              <li>本サービスの保守のために必要な場合</li>
              <li>本サービスのシステムに不具合があった場合</li>
              <li>その他本規約に違反する行為があった場合</li>
            </ul>
          </li>
          <li>本サービスはユーザーに対して、前項の措置を講じた理由を開示する義務を負わないものとします。</li>
          <li>
            ユーザーが第 1 項各号（第 4 号、第 5
            号を除く）のいずれかに該当することにより本サービスが損害を被った場合、本サービスは当該ユーザーに対して損害の賠償を請求できるものとします。
          </li>
        </ol>

        <h4>第１３条 利用終了</h4>
        <ol>
          <li>
            本サービスは、ユーザーが利用を終了した場合、そのユーザーの利用履歴、投稿情報、登録情報、個人情報、賞金等獲得情報等のデータ等を引き続き保有する義務はないものとします。
          </li>
          <li>
            ユーザーが自らの意志による利用を終了した場合でも、本規約に同意していることには変更はなく、規約は適用されるものとします。
          </li>
        </ol>

        <h4>第１４条 規約の改定について</h4>
        <p>
          本サービスは、ユーザーの了解を得ることなく本規約を変更できるものとします。この場合、本サービスが別途定める場合を除き、変更後の規約は本サービス上に表示した時点より効力を生じるものとします。
        </p>

        <h4>第１５条 本規約の有効性</h4>
        <ol>
          <li>
            本規約が消費者契約法に定める消費者契約に該当する場合には、本規約のうち、本サービスの損害賠償責任を完全に免責する規定は適用されないものとします。
          </li>
          <li>
            本サービスは、前項において、ユーザーに発生した損害が債務不履行又は不法行為に基づくときは、当該ユーザーが直接かつ現実に被った損害を上限として、当該ユーザーから受領した料金の範囲で損害賠償責任を負い、特別損害については責任を負わないものとします。
          </li>
          <li>
            本規約が法令に違反する場合、本規約のうち法令に違反する条項のみが無効であり、その他の条項は有効に存続するものとします。
          </li>
          <li>
            本規約が特定のユーザーとのあいだで、一部無効、もしくは取り消しになった場合でも、本規約は他のユーザーとの関係では有効であるとします。
          </li>
        </ol>

        <h4>第１６条 準拠法・裁判管轄</h4>
        <ol>
          <li>本規約は、日本法に従って解釈されます。</li>
          <li>
            本サービスとユーザーとの紛争については、日本法を準拠法とし、訴額に応じて東京簡易裁判所又は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </li>
        </ol>

        <time>2020 年 9 月 25 日 改定</time>
      </div>
    </Layout>
  );
};

export default SettingMemoTerms;
