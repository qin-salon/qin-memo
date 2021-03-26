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
      <div className="inline-block mt-2 truncate">
        <strong>
          <span>{title}</span>
        </strong>
      </div>

      <div className="my-2 truncate">
        <span>{props.note.excerpt.replace(title, "")}</span>
      </div>
      <div className="flex flex-row justify-between items-end ">
        <div className="pb-2">
          <span>2021/3/25</span>
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
