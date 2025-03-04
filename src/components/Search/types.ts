export interface SearchProps {
  debounceTimer?: number;
  isLoading?: boolean;
  label: string;
  onChange?: (value: string) => void;
}
