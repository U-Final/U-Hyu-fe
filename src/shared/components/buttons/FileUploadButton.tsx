import { ButtonBase } from "@/shared/components/buttons/ButtonBase";
import { useRef } from "react";

interface FileUploadButtonProps {
  onFileSelect: (file: File) => void;
  children?: React.ReactNode;
}

export const FileUploadButton = ({ onFileSelect, children }: FileUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleChange} className="hidden" />
      <ButtonBase onClick={handleClick} variant="primary">
        {children}
      </ButtonBase>
    </>
  );
};
