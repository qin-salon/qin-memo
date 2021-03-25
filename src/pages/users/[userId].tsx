import type { NextPage } from "next";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { UserHeader } from "src/components/users/userHeader";
import { EXAMPLE_MY_NOTE_LIST } from "src/models/note";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNote } from "src/types/types";
// import useSWR from "swr";

// import { getApi, userUrl } from "../../lib/api";

const User: NextPage = () => {
  // const router = useRouter();

  // const [listNote, setListNote] = useState<ListNote[]>([]);

  // メモ一覧を取得できない原因不明なので、とりあえずは直接読み込む
  // const { data: listNote } = useSWR(`${userUrl}/${router.query.id}/notes/`, getApi);
  const listNote = EXAMPLE_MY_NOTE_LIST;

  const user = EXAMPLE_USER_01;

  //   useEffect(() => {
  //     const fetchBootLoader = async () => {
  //       const listNote = await getApi<Promise<ListNote[]>>(`${userUrl}/${router.query.id}/notes/`);
  // setListNote(listNote);
  //     }
  //     fetchBootLoader();
  //    }, []);

  return (
    <div className="flex flex-col overscroll-none h-screen">
      <header>
        <UserHeader />
      </header>
      <div className="w-1/2 mx-auto">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <Avatar id="profile" alt={user.name} src={user.avatarUrl} size="medium" />
          </div>
          <div className="flex flex-col">
            <span className="ml-2 my-0">{user.name}</span>
            <Button
              id="profile-button"
              linkProps={{ href: "/settings/profile" }}
              size="extrasmall"
              bgColor="transparent"
            >
              プロフィール設定
            </Button>
          </div>
          {/* <span>ユーザ:{router.query.userId}</span> */}
        </div>
        <div className="w-full">
          {listNote.map((note: ListNote) => {
            return (
              <div key={note.id} className="bg-gray-200 my-4 rounded-3xl w-full h-32 mx-auto p-2 truncate">
                <div className="my-2">
                  <strong>
                    <span>{note.excerpt.split("。", 1)}</span>
                  </strong>
                </div>

                <div className="my-2 truncate">
                  <span>{note.excerpt}</span>
                </div>
                <div className="flex flex-row justify-between items-end ">
                  <div className="pb-2">
                    <span>2021/3/25</span>
                  </div>
                  <div>
                    {note.public ? (
                      <Button button id="orange" bgColor="orange" className="w-auto" size="extrasmall">
                        公開中
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default User;
