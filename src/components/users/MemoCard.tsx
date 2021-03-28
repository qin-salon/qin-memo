import type { VFC } from "react";
import { Button } from "src/components/shared/Button";
import type { ListNote } from "src/types/types";

type Props = {
  note: ListNote;
};

export const MemoCard: VFC<Props> = (props) => {
  const pattarn = "(^.*)(\n)";
  const excTitle = props.note.excerpt.match(pattarn);
  const title = String(excTitle ? excTitle[0] : "");
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
          <span>{props.note.date}</span>
        </div>
        <div>
          {props.note.public ? (
            <Button button bgColor="orange" className="w-auto" size="extrasmall">
              公開中
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
