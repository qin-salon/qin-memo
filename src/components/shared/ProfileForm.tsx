import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "src/components/providers/UserProvider";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { Input } from "src/components/shared/Input";
import type { UserType } from "src/types/types";

type ProfileFormProps = { user?: UserType };

type Form = {
  name: string;
  accountId: string;
  avatarUrl: string;
};

export const ProfileForm: VFC<ProfileFormProps> = (props) => {
  const authUser = useAuthUser();
  const { user } = useUser();
  const { register, handleSubmit } = useForm<Form>();

  const handleSave = handleSubmit(async (data) => {
    try {
      const idToken = await authUser.getIdToken();
      await fetch(`/api/proxy/v1/users/${user?.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  });

  // TODO: 修正必要
  if (!user) return null;

  // TOOD: アイコンの設定がまだ
  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex justify-start items-center space-x-6">
            <Avatar
              src={props.user?.avatarUrl}
              alt={props.user?.name}
              width={96}
              height={96}
              className="overflow-hidden w-24 h-24 rounded-full"
            />
            <Button variant="solid-gray" className="py-2.5 px-5 mt-4">
              アイコンを{props.user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input label="名前" defaultValue={user?.name} {...register("name")} />
        <Input label="ユーザー名" prefix="@" defaultValue={user?.accountId} {...register("accountId")} />
      </div>

      <div className="mt-12 space-y-4">
        {props.user ? (
          <Button variant="solid-blue" className="p-3 w-full" onClick={handleSave}>
            保存する
          </Button>
        ) : (
          <>
            <Button variant="solid-blue" className="p-3 w-full">
              登録してはじめる
            </Button>
            <Button variant="solid-gray" className="p-3 w-full">
              登録せずに終了する
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
