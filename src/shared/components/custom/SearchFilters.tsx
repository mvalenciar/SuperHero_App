import { NativeSelect, NativeSelectOption } from "../ui/native-select";

export const SearchFilters = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex justify-around mb-3">
      <NativeSelect>
        <NativeSelectOption value={`publisher`}>Publisher</NativeSelectOption>
        <NativeSelectOption value={`dc`}>DC</NativeSelectOption>
        <NativeSelectOption value={`marvel`}>Marvel</NativeSelectOption>
      </NativeSelect>
      <NativeSelect>
        <NativeSelectOption value={`type`}>Type</NativeSelectOption>
        <NativeSelectOption value={`good`}>Héroe</NativeSelectOption>
        <NativeSelectOption value={`bad`}>Villano</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};
