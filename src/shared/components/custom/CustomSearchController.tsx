import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export const CustomSearchController = () => {
  return (
    <div className="w-full max-w-md mx-auto mb-3">
      <div
        className="
        flex items-center 
        bg-linear-to-r from-red-600 via-purple-600 to-blue-600 
        p-0.5 rounded-xl
      "
      >
        <div
          className="
          flex w-full items-center 
          bg-background rounded-xl 
          overflow-hidden
          focus-within:ring-2 focus-within:ring-yellow-400
        "
        >
          <Search className="ml-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Buscar héroes o villanos..."
            className="
              border-0 
              focus-visible:ring-0 
              bg-transparent
              text-foreground
            "
          />

          <Button
            className="
              rounded-none 
              bg-yellow-400 
              text-black 
              hover:bg-yellow-300
            "
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};
