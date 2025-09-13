import Image from "next/image";
import { BaguetteCol, BaguetteFooter, DonutCol, DonutHeader } from "@/assets";

type LayoutPageProps = {
  children: React.ReactNode;
};

export const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <div className="h-screen flex lg:flex-row flex-col relative overflow-x-none w-screen  ">
      <Image src={DonutHeader} alt="cat donut" className="w-full lg:hidden block  " />
      <Image
        src={BaguetteCol}
        alt="cat donut"
        className=" hidden lg:block object-right   object-cover  lg:w-[150px] absolute h-screen 4xl:w-[300px] "
      />
      <div className="w-full flex items-center justify-center h-full">{children}</div>
      <Image
        src={DonutCol}
        alt="cat donut"
        className="hidden lg:block object-left object-cover  lg:w-[150px] absolute right-0 h-screen 4xl:w-[300px]  "
      />
      <Image src={BaguetteFooter} alt="cat donut" className="w-full lg:hidden block  " />
    </div>
  );
};
