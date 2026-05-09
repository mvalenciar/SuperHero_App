import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface HeroPaginationControllerProps {
  totalPages: number;
  currentPage: number;
  pagesPerGroup: number;
  nextPage: () => void;
  prevPage: () => void;
}

export const HeroPaginationController = ({
  totalPages,
  currentPage,
  pagesPerGroup,
  nextPage,
  prevPage,
}: HeroPaginationControllerProps) => {
  // ---
  const group = Math.floor((currentPage - 1) / pagesPerGroup);
  const start = group * pagesPerGroup + 1;
  const end = Math.min(start + pagesPerGroup - 1, totalPages);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="m-8">
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              className="transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={prevPage}
            />
          </PaginationItem>
          {!pages.includes(1) && (
            <PaginationItem>
              <PaginationEllipsis className="text-muted-foreground" />
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                className={`
                w-10 h-10 flex items-center justify-center
                rounded-xl font-semibold
                transition-all duration-200
                ${
                  page === currentPage
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-muted/40 text-foreground hover:bg-primary hover:text-primary-foreground"
                }
              `}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {!pages.includes(totalPages) && (
            <PaginationItem>
              <PaginationEllipsis className="text-muted-foreground" />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              className="transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={nextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
