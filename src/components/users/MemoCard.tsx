import type { VFC } from "react";
import type { ListNoteType } from "src/types/types";

type Props = {
  note: ListNoteType;
};

// タイトルの取得（改行コードまでをタイトルとする）
const pattarn = "(^.*)(\n)";
const getTitle = (excTitle: RegExpMatchArray | null) => {
  return String(excTitle ? excTitle[0] : "");
};

export const MemoCard: VFC<Props> = (props) => {
  const title = getTitle(props.note.excerpt.match(pattarn));
  return (
    <div className="bg-gray-200 my-4 rounded-3xl w-full h-32 mx-auto p-2">
      <strong>
        <div className="h-6 mt-2 truncate">
          <span>{title}</span>
        </div>
      </strong>
      <div className="my-2 truncate">
        <span>{props.note.excerpt.replace(title, "")}</span>
      </div>
      <div className="flex flex-row justify-between items-end ">
        <div className="pb-2">
          <span>{props.note.updatedOn}</span>
        </div>
        <div>
          {props.note.public ? (
            <span className="py-1 px-1 my-0 mx-auto rounded-full w-auto text-white bg-yellow-500">公開中</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
