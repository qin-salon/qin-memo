import { LogoIcon } from "src/components/icon/LogoIcon";
import { SearchIcon } from "src/components/icon/SearchIcon";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";
import { EXAMPLE_USER_01 } from "src/models/user";

export const UserHeader = () => {
  const user = EXAMPLE_USER_01;
  return (
    <div className="flex flex-row items-center">
      <div className="flex-1">
        <div className="flex justify-end mr-4">
          <LogoIcon />
        </div>
      </div>
      <div className="flex-1 my-auto mx-16">
        <InputText
          id="serach"
          startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6" />}
          placeholder="メモを検索する"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-row">
          <div className="ml-4">
            <Button id="memo" button>
              メモを書く
            </Button>
          </div>
          <div className="my-auto">
            <Avatar id="user" alt={user.name} src={user.avatarUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
