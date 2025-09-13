  import { Button1, Button2 } from "@/assets";
  import Image, { StaticImageData } from "next/image";


  interface SpecialButtonProps extends ButtonProps {
    backgroundImage: StaticImageData; 
    children:React.ReactNode;
    className?: string;
      type?: "submit" | "reset" | "button";
  }


  type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    className?: string;
  };

  export const Button = ({ children, onClick,type,className }: ButtonProps) => {
    return (
      <button type={type} className={`flex h-full bg-gray-500 p-3 rounded-md justify-center w-full ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  export const SpecialButton = ({
    children,
    onClick,
    type,
    className,
    backgroundImage,
  }: SpecialButtonProps) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`relative w-60 text-shadow-stroke hover:cursor-pointer scale-on-hover text-shadow-amber-800 
        text-[2rem]  h-24 px-2 flex items-center justify-center text-white ${className}`}
      >
        <Image
          src={backgroundImage}
          alt="button background"
          fill
          className="absolute inset-0 object-cover -z-0 pointer-events-none"
        />
        <span className="relative z-10">{children}</span> {/* <-- Wrap children */}
      </button>
    );
  };



interface MenuButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}
export const MenuButton = ({
  className,
  children,
  onClick,
  type = "button",
}: MenuButtonProps) => {
  return (
    <SpecialButton
      className={` w-44 md:w-72 lg:w-96 lg:text-[3rem] ${className}`}
      backgroundImage={Button2}
      onClick={onClick}
      type={type}
    >
      {children}
    </SpecialButton>
  );
};