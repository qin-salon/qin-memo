import { rest } from "msw";

export const handlers = [
  rest.get("https://demo.qin/login", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("https://demo.qin/me", (req, res, ctx) => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      return res(ctx.status(403), ctx.json({ errorMessage: "Not authorized" }));
    }
    return res(ctx.status(200), ctx.json({ id: "fjdajfiasj", name: "ゲームボーイ", img: "/img/dummy/user1.png" }));
  }),
  rest.get("https://demo.qin/user", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: "fdsjafiooo", name: "イカちゃん", img: "/img/dummy/user2.png" }));
  }),
  rest.get("https://demo.qin/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "fdjaifdaff",
          body:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate corporis cumque fugit perferendis eligendi possimus optio veritatis accusamus asperiores tempora beatae officiis, praesentium saepe neque architecto facilis corrupti ipsa sed.",
        },
        {
          id: "kfokdofkdo",
          body:
            "sapiente eum soluta cumque molestiae sed rem inventore! Libero doloribus aliquam numquam, quaerat totam harum officia inventore temporibus at dolore perspiciatis, repudiandae iusto ad assumenda laudantium alias fuga voluptates sapiente obcaecati voluptatem ullam necessitatibus dicta. Fuga explicabo cupiditate eaque, fugiat illum recusandae ipsum nulla sunt in necessitatibus commodi accusantium perferendis enim corporis nam. Blanditiis dicta vitae delectus accusantium nemo non nobis fugiat, officiis autem possimus repellendus porro vero est laudantium eligendi aliquid laboriosam qui perferendis soluta sapiente adipisci! Minima natus laudantium nam, expedita vero itaque perferendis corporis. Aut vero doloremque odit voluptates repellendus nisi necessitatibus tenetur eligendi vel assumenda, placeat in earum inventore distinctio, molestias, dolores ullam ipsum sint exercitationem alias dolorem? Fugit modi architecto quos veniam accusamus asperiores consequuntur quas dolore porro quam, ut libero magni saepe, nemo corrupti optio nulla quis blanditiis reprehenderit, consectetur repudiandae numquam earum! Illum nostrum molestiae accusantium minus ducimus, expedita laudantium magni quia facere accusamus eos neque ipsa excepturi ipsam placeat reiciendis odio modi, cumque dolorum odit ad consequuntur aut? Id eveniet fugiat repellendus. Nobis iste soluta deleniti, officiis perspiciatis accusantium eius dolorem ratione ipsum. Mollitia ipsum beatae cum nemo quidem sint dolorum doloribus pariatur nisi, dignissimos voluptatem maxime! Non veritatis tempora voluptatem labore nihil repellat corrupti amet, itaque, maxime deleniti fugit tenetur, minus ipsa. Eos, nobis asperiores eaque magnam obcaecati, alias deleniti maxime mollitia soluta nostrum dignissimos et excepturi, ad cum laboriosam impedit libero? Nesciunt consequatur similique dolor nam. Ex veritatis suscipit rem incidunt maiores blanditiis culpa cupiditate tenetur iusto aliquam amet atque deserunt alias voluptas illo fugiat cum iure repellendus dolorum voluptatum, harum sint ipsum perferendis? Totam recusandae suscipit ad. Numquam inventore dolor, non provident nesciunt ipsam doloremque accusantium facere delectus, et ratione aliquam voluptas voluptatibus sapiente pariatur libero. Minus, aliquam tempore perspiciatis vel illum dignissimos harum quam possimus sint, et enim ipsa laboriosam suscipit! Ut error, quis dicta quisquam enim at eligendi suscipit commodi labore alias eveniet dolores dolore debitis laboriosam qui.",
        },
        {
          id: "iofdskofka",
          body:
            "culpa incidunt, non explicabo totam quo, sed tempora deserunt reiciendis sequi saepe quaerat sit eos reprehenderit. Incidunt, sed eius. Dolore animi molestias laboriosam, tenetur atque repellendus numquam, velit reiciendis dolores, dicta esse. Sit, totam id aliquam repellat inventore similique nesciunt odit quasi repellendus, aperiam corporis ex neque dolores nulla repudiandae architecto perferendis, necessitatibus laborum quia ut ea ipsam deserunt praesentium accusantium. Totam provident asperiores labore optio obcaecati at distinctio, velit assumenda quis debitis alias beatae quos harum corrupti deleniti! Sit, ducimus nobis. Explicabo autem ipsum esse soluta doloremque perferendis ipsam at deserunt veritatis quaerat consectetur, in nam eaque ratione culpa corporis molestias assumenda nemo odio similique tempore numquam! Similique placeat dolorem nisi debitis amet recusandae nam ex dolor, eius porro ratione, possimus neque. Reprehenderit aliquid accusantium quae ea hic minus aliquam adipisci quo iusto voluptates?",
        },
        {
          id: "fkdfkkfffa",
          body:
            "magni nihil quia nam. Veniam ab dignissimos explicabo error fuga, odit, fugit beatae ipsam, doloremque voluptas accusantium quae. Veniam explicabo eum ipsam in? Ex quia est odit consequuntur voluptates molestiae perferendis ipsa. Ut dicta facere inventore, cupiditate recusandae exercitationem! Dolore rem quis, officia error tempore laborum ab dolorem dignissimos reiciendis repellendus commodi aspernatur fugiat possimus ea similique nam voluptates aliquam suscipit. Totam quas ea velit consectetur ipsam ducimus maiores, adipisci fugit excepturi laboriosam sunt quae cum corrupti molestiae dignissimos minima quam perferendis repudiandae. Est culpa nisi maxime quidem molestias reiciendis ullam reprehenderit nesciunt obcaecati eligendi inventore aliquam dolorem excepturi accusantium earum, in libero eos quo quod odio? Earum, explicabo praesentium eum officiis asperiores ad, ea hic, recusandae voluptatibus sapiente sequi eaque exercitationem iusto nostrum illum! Nesciunt hic, quibusdam, asperiores consequuntur dolores quasi quod molestiae fugit error accusamus commodi laboriosam aspernatur repellat sint omnis rerum laudantium, quia distinctio itaque beatae accusantium blanditiis? Minus sint quia sapiente, corrupti quibusdam cum magnam minima iusto! Nostrum, reprehenderit optio architecto illum consequatur porro eius, doloribus libero rem facilis vel corporis quod perspiciatis. Sunt vitae, expedita praesentium tempora eveniet esse, aperiam suscipit, harum inventore totam ut quis quos vero nisi. Eveniet, natus quae doloremque laborum vel maxime blanditiis sed autem iure minus quidem dolores inventore delectus earum doloribus nemo necessitatibus nam corporis. Soluta consequatur harum dolore error beatae qui, eius, commodi necessitatibus similique provident ut architecto. Asperiores vitae sapiente optio provident, itaque tempora! Aliquid unde velit, consequuntur aspernatur dignissimos sed iste accusantium tempora aliquam suscipit vel veniam dolorum odio ipsa tenetur distinctio laboriosam optio repellendus deleniti quam ea adipisci, eaque totam culpa! Officiis, veniam perspiciatis! Quis modi doloribus, quasi adipisci maxime pariatur. Odio cupiditate autem, magnam, placeat recusandae provident aut alias iste eveniet consequatur praesentium, voluptate dolore. Earum iusto repellat voluptatem vero delectus inventore ducimus libero rem praesentium, illo architecto non laudantium soluta est aperiam dolores neque. Doloribus quia excepturi alias delectus vitae officia nulla a obcaecati tempora neque aliquid porro culpa quod explicabo sit, eos tempore quasi pariatur, quaerat blanditiis labore nihil dolores. Sed architecto vitae quaerat laboriosam eius eveniet tempore quo enim doloribus reiciendis deserunt quam id nobis labore tenetur ipsum voluptatum at, dicta illum corrupti quos fugit amet!",
        },
        {
          id: "fkkfodaofk",
          body:
            "Odio quod ratione debitis, quia necessitatibus molestiae corrupti aliquid saepe, reprehenderit facere tenetur eveniet unde, omnis perferendis quisquam suscipit temporibus sapiente quas reiciendis modi beatae tempore voluptas exercitationem. Ab sapiente odit tempore harum, itaque, porro laborum pariatur sed laudantium nam asperiores modi recusandae explicabo ut est quas eaque, et ea. Minima, nesciunt? Explicabo aut cum praesentium est nobis molestias minus veniam sint soluta velit quidem quas, ipsa tenetur quia aliquam quisquam veritatis fugit, totam maiores, modi aspernatur tempora omnis qui! Eligendi cupiditate, quisquam architecto ipsa possimus nemo praesentium necessitatibus vel ipsum deleniti vitae. Placeat, eos fugiat repellat modi aliquam doloribus ab molestiae itaque omnis dolorem illo perferendis natus voluptas? Ipsa enim omnis ipsum atque nostrum nulla nam et, fugit eius assumenda consequatur beatae nobis provident aperiam ex explicabo ipsam? Nesciunt autem corporis cupiditate. Quis ratione veritatis debitis voluptates delectus impedit, iusto ullam? Voluptas dignissimos nihil.",
        },
      ])
    );
  }),
];
