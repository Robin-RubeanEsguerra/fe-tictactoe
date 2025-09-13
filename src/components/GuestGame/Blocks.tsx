import { BaguetteCross, CatDonut1 } from "@/assets";
import Image from "next/image";

type BlockProps = {
  children: React.ReactNode;
  index: number;
  onClick?: () => void;
};

export const Blocks = ({ children, onClick, index }: BlockProps) => {
  const renderContent = () => {
    if (children === 1) {
      return (
        <Image
          src={BaguetteCross}
          alt="Baguette Cross"
          className="w-full h-full z-10 object-contain"
        />
      );
    }
    if (children === 2) {
      return (
        <Image
          src={CatDonut1}
          alt="Cat Donut"
          className="w-full h-full z-10 object-contain"
        />
      );
    }
    return <span className="text-3xl opacity-40">🍴</span>;
  };

  return (
    <div
      key={index}
      onClick={onClick}
      className="scale-on-hover hover:border-4 hover:border-ttt-orange rounded-xl hover:cursor-pointer drop-shadow-amber-600 h-24 w-24 lg:h-32 lg:w-32 bg-white border-gray-300 border-3 text-white text-2xl font-bold flex justify-center items-center relative"
    >
      <div className="absolute inset-2 rounded-xl border-2 border-gray-200 z-0" />

      <div className="z-10 flex justify-center  h-full items-center">
        {renderContent()}
      </div>
    </div>
  );
};
