import { Heart } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type ErrorProps = {
  refetchData: () => void;
};

const Error: React.FC<ErrorProps> = ({ refetchData }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <Heart className="w-12 h-12 text-red-500" /> {/* Or an error icon */}
      <p className="text-lg font-semibold">Oops! Something went wrong.</p>
      <p className="text-muted-foreground">
        Failed to load projects. Please try again.
      </p>
      <Button onClick={refetchData}>Retry</Button>
    </div>
  );
};

export default Error;
