interface SearchHeroSectionProps {
  searchBar: React.ReactNode;
  searchFilters?: React.ReactNode;
}
export const SearchHeroSection = ({
  searchBar,
  searchFilters,
}: SearchHeroSectionProps) => {
  return (
    <>
      {searchBar}
      {searchFilters}
    </>
  );
};
