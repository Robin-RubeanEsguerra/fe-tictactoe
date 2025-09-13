import Image from "next/image";
import { StaticImageData } from "next/image";
import { Label } from "../shared/Label";
type PlayerBlockProps = {
  player: string;
  image: StaticImageData;
  active: boolean;
};

export const PlayerBlock = ({ player, image, active }: PlayerBlockProps) => {
  return (
    <div className="flex  flex-col ">
      <Label className="text-2xl md:text-7xl space-x-3 " variant="primary">
     <span className="md:hidden">  Current: </span>   Player {player}
      </Label>
      <div className="flex flex-row md:flex-col justify-center">
        <Image
          src={image}
          alt="Player-Image"
          className={`h-[100px] md:h-[250px]  object-contain transition-opacity duration-300 ${
            active ? "animate-pump-once" : "opacity-50"
          }`}
        />
        <Label className="hidden md:block text-3xl " variant="secondary">
          {active ? "MY TURN!" : ""}
        </Label>
      </div>
    </div>
  );
};
