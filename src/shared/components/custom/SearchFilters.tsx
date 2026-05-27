import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface SearchFiltersProps {
  onPublisherFilter: (value: string) => void;
  onTypeFilter: (value: string) => void;
  onGenderFilter: (value: string) => void;
}

export const SearchFilters = ({
  onPublisherFilter,
  onTypeFilter,
  onGenderFilter,
}: SearchFiltersProps) => {
  return (
    <div className="w-full max-w-sm mx-auto flex justify-around mb-3">
      <NativeSelect onChange={(e) => onPublisherFilter(e.target.value)}>
        <NativeSelectOption value={``}>Editorial</NativeSelectOption>
        <NativeSelectOption value={`dc`}>DC</NativeSelectOption>
        <NativeSelectOption value={`marvel`}>Marvel</NativeSelectOption>
      </NativeSelect>
      <NativeSelect onChange={(e) => onTypeFilter(e.target.value)}>
        <NativeSelectOption value={``}>Tipo</NativeSelectOption>
        <NativeSelectOption value={`good`}>Héroe</NativeSelectOption>
        <NativeSelectOption value={`bad`}>Villano</NativeSelectOption>
      </NativeSelect>
      <NativeSelect onChange={(e) => onGenderFilter(e.target.value)}>
        <NativeSelectOption value={``}>Género</NativeSelectOption>
        <NativeSelectOption value={`Male`}>Masculino</NativeSelectOption>
        <NativeSelectOption value={`Female`}>Femenino</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};
