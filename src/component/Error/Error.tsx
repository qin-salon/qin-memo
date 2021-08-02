import type { VFC } from "react";

/**
 * @package
 */
export const Error: VFC = () => {
  return (
    <div className="space-y-2">
      <p>
        エラーが発生しました。
        <br className="hidden sm:block" />
        更新してもうまくいかない場合は下記よりお問い合わせください。
      </p>
      <a
        className="inline-block font-bold text-blue-500"
        href="https://forms.gle/pNNUdFnf3YmYpqhJ6"
        target="_blank"
        rel="noopener noreferrer"
      >
        お問い合わせ
      </a>
    </div>
  );
};
