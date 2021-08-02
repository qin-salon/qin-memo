import { Dialog, Transition } from "@headlessui/react";
import type { ChangeEvent, VFC } from "react";
import { Fragment, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "src/component/Button";
import { Input } from "src/component/Form";

type Props = {
  show: boolean;
  onClose: () => void;
  onClickOk: () => Promise<void>;
  title: string;
  buttonText: string;
};

/**
 * @package
 */
export const InputConfirmDialog: VFC<Props> = (props) => {
  const buttonRef = useRef(null);
  const [text, setText] = useState("");

  const handleClose = useCallback(() => {
    props.onClose();
    setText("");
  }, [props]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    if (text === "ok") {
      toast.error("大文字で入力してください");
      return;
    }
    if (text !== "OK") {
      toast.error("テキストに誤りがあります");
      return;
    }
    toast.promise(props.onClickOk(), {
      loading: "処理中",
      success: "削除しました",
      error: "失敗しました",
    });
  }, [props, text]);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        static
        className="overflow-y-auto fixed inset-0 z-10"
        open={props.show}
        onClose={handleClose}
        initialFocus={buttonRef}
      >
        <div className="text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-0 scale-95"
          >
            <div className="inline-block overflow-hidden p-4 sm:p-6 w-10/12 max-w-sm text-left align-middle bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all transform">
              <div className="text-center">
                <Dialog.Title as="h3" className="font-bold leading-6">
                  {props.title}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm whitespace-pre-line opacity-70">
                    {`この操作は取り消すことはできません。\u000A実行するには「OK」と入力してください`}
                  </p>
                </div>
                <div className="mt-2">
                  <Input name="name" value={text} onChange={handleChange} className="py-0 h-8 text-center" />
                </div>
              </div>
              <div className="flex mt-6 space-x-3 sm:space-x-4">
                <Button variant="outline" className="flex-1 py-2 text-sm" onClick={handleClose} ref={buttonRef}>
                  キャンセル
                </Button>
                <Button variant="solid-red" className="flex-1 py-2 text-sm" onClick={handleClick}>
                  {props.buttonText}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
