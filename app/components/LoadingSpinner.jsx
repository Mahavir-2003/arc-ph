import { Spinner } from "@heroui/react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingSpinner; 