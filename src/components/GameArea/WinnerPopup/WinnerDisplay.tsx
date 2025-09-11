import { BaguetteCross, CatDonut1, Chu, Juberto } from "@/assets";
import Image from "next/image";
type WinnerDisplayProps = {
  winner: number | "tie";
  
};
export const WinnerDisplay = ({ winner }: WinnerDisplayProps) => {
  const renderWinner = () => {
    if (winner === 1) {
      return <div className="flex items-center justify-center">
         <Image src={BaguetteCross} alt="Chu" className="w-[80px] h-auto md:w-[120px] animate-slow-spin  " />
         <Image src={Chu} alt="Chu" className="w-[180px] md:w-[230px] animate-bounce2"  />
          <Image src={BaguetteCross} alt="Chu" className="w-[80px] h-auto md:w-[120px] animate-slow-spin " />
      </div>;
    } else if (winner ===2) {
      return <div className="flex items-center justify-center">
        <Image src={CatDonut1} alt="Chu" className="w-[80px] h-auto md:w-[120px] animate-slow-spin  " />
        <Image src={Juberto} alt="Juberto" className="w-[180px] md:w-[230px] animate-bounce2" />
        <Image src={CatDonut1} alt="Chu" className="w-[80px] h-auto md:w-[120px] animate-slow-spin " />
      </div>;
    } else {
      return (
        <div className="flex justify-center -space-x-9 items-center">
            <Image src={BaguetteCross} alt="Chu" className="w-[80px] animate-slow-spin  h-[80px] " />
          <Image src={Chu} alt="Chu" className="w-[150px]  animate-bounce2   " />
          <Image src={Juberto} alt="Juberto" className="w-[150px]    animate-bounce2  " />
           <Image src={CatDonut1} alt="Chu" className="w-[80px] animate-slow-spin  h-[80px] " />
        </div>
      );
    }
  };
  return <div className="flex flex-col mt-2">
    <div className="flex w-full justify-center ">{renderWinner()}</div>
  </div>;
};
