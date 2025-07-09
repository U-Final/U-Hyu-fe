export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  variant?: "gray" | "white";
}
