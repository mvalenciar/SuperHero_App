import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface SearchFiltersProps {
  onPublisherFilter: (value: string) => void;
  onTypeFilter: (value: string) => void;
}

export const SearchFilters = ({
  onPublisherFilter,
  onTypeFilter,
}: SearchFiltersProps) => {
  return (
    <div className="w-full max-w-sm mx-auto flex justify-around mb-3">
      <NativeSelect onChange={(e) => onPublisherFilter(e.target.value)}>
        <NativeSelectOption value={``}>Publisher</NativeSelectOption>
        <NativeSelectOption value={`dc`}>DC</NativeSelectOption>
        <NativeSelectOption value={`marvel`}>Marvel</NativeSelectOption>
      </NativeSelect>
      <NativeSelect onChange={(e) => onTypeFilter(e.target.value)}>
        <NativeSelectOption value={``}>Type</NativeSelectOption>
        <NativeSelectOption value={`good`}>Héroe</NativeSelectOption>
        <NativeSelectOption value={`bad`}>Villano</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};
