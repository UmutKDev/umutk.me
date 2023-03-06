import Image from "next/image";
import UmutKImage from "public/images/umutk.jpg";

const AvatarImage = (): JSX.Element => {
  return (
    <figure className="relative">
      <Image
        src={UmutKImage}
        loading="eager"
        className="lef-0 absolute top-0 bottom-0 right-0 z-0 h-24 w-24 rounded blur-lg"
        draggable={false}
        alt="Avatar"
      />
      <Image
        loading="eager"
        src={UmutKImage}
        className="sticky h-24 w-24 rounded"
        draggable={false}
        alt="Avatar"
      />

      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-md bg-green-500"></div>
    </figure>
  );
};

export default AvatarImage;
