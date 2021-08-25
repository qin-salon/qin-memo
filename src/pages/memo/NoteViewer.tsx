import Link from "next/link";
import type { NoteWithUserType } from "src/api/handler/note/type";
import { Avatar } from "src/component/Avatar";

export const NoteViewer = (props: NoteWithUserType) => {
  return (
    <div className="space-y-7">
      <Link href={`/user/${props.users.userName}`}>
        <a className="flex items-center space-x-4 w-max">
          <Avatar
            src={props.users.avatarUrl}
            alt={props.users.accountName}
            width={64}
            height={64}
            className="overflow-hidden w-16 h-16 rounded-full"
            noDialog
          />
          <div className="flex flex-col">
            <span className="font-bold">{props.users.accountName}</span>
          </div>
        </a>
      </Link>
      <p className="text-lg leading-loose whitespace-pre-wrap">{props.content}</p>
    </div>
  );
};
