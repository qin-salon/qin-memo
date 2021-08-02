import type { VFC } from "react";
import type { NoteType } from "src/api/handler/note/type";
import { ConfirmDialog, MenuDialog, MenuDialogList } from "src/components/Dialogs";

import { useNoteMenu } from "./useNoteMenu";

type NoteActionProps = {
  public?: NoteType["public"];
  isShowMenu: boolean;
  onCloseMenu: () => void;
  togglePublicStatus: () => Promise<any>;
  deleteNote: () => Promise<any>;
};

export const NoteAction: VFC<NoteActionProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { isShowMenu, ...rest } = props;
  const { isShowDeleteDialog, menu, handleDeleteNote, handleCloseDeleteDialog } = useNoteMenu(rest);

  return (
    <div>
      <MenuDialog show={isShowMenu} onClose={props.onCloseMenu}>
        <MenuDialogList menu={menu} />
      </MenuDialog>

      <ConfirmDialog
        show={isShowDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onClickOk={handleDeleteNote}
        title="メモを削除"
        description="復元できませんがよろしいですか？"
        buttonText="削除する"
        buttonColor="red"
      />
    </div>
  );
};
