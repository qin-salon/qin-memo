import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";

/**
 * @package
 */
export const useFile = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  const handleOpenFileDialog = useCallback(() => {
    imageRef.current?.click();
  }, []);

  const handleChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.item(0);
    if (!file) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }, []);

  return {
    imageUrl,
    imageRef,
    selectedFile,
    handleChangeFile,
    handleOpenFileDialog,
  };
};
