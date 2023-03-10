import Image from "next/image";
import UmutKImage from "public/images/umutk.jpg";

const AvatarImage = (): JSX.Element => {
  return (
    <figure className="relative">
      <Image
        src={UmutKImage}
        loading="eager"
        priority={true}
        className="lef-0 absolute top-0 bottom-0 right-0 z-0 h-24 w-24 rounded blur-lg"
        draggable={false}
        alt="Avatar"
      />
      <Image
        src={UmutKImage}
        loading="eager"
        priority={true}
        className="sticky h-24 w-24 rounded"
        draggable={false}
        alt="Avatar"
      />
    </figure>
  );
};

export default AvatarImage;
