import Interweave from "interweave";
import { UrlMatcher } from "interweave-autolink";
import Link from "next/link";
import type { VFC } from "react";
import type { NoteType } from "src/api/handler/note/type";
import { Avatar } from "src/component/Avatar";
import { Layout } from "src/layout";

import { PublicLabel } from "./PublicLabel";

/**
 * @package
 */
export const NoteViewer: VFC<{ note: NoteType }> = (props) => {
  return (
    <Layout left="memo" right={[<PublicLabel key="publicLabel" />]}>
      <div className="space-y-7">
        <Link href={`/user/${props.note.users.userName}`}>
          <a className="flex items-center space-x-4 w-max">
            <Avatar
              src={props.note.users.avatarUrl}
              alt={props.note.users.accountName}
              width={64}
              height={64}
              className="overflow-hidden w-16 h-16 rounded-full"
              noDialog
            />
            <div className="flex flex-col">
              <span className="font-bold">{props.note.users.accountName}</span>
            </div>
          </a>
        </Link>
        <p className="text-lg leading-loose whitespace-pre-wrap">
          <Interweave
            content={props.note.content}
            matchers={[
              new UrlMatcher("url", { validateTLD: false }, (urlProps) => {
                return (
                  <a
                    href={urlProps.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline cursor-pointer"
                  >
                    {urlProps.children}
                  </a>
                );
              }),
            ]}
          />
        </p>
      </div>
    </Layout>
  );
};
