import { LoaderCircle } from "lucide-react";

type Props = {
    className?: string;
};
export const LoadingCircle = ({ className }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin ${className}`}><LoaderCircle/></div>
    </div>
  );
};