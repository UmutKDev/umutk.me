import Image from "next/image";

const AvatarImage = (): JSX.Element => {
  return (
    <figure className="relative">
      <Image
        src="/images/umutk.jpg"
        className="lef-0 absolute top-0 bottom-0 right-0 z-0 rounded blur-lg"
        width={96}
        height={96}
        draggable={false}
        alt="Avatar"
      />
      <Image
        src="/images/umutk.jpg"
        className="sticky rounded"
        draggable={false}
        width={96}
        height={96}
        alt="Avatar"
      />

      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-md bg-green-500"></div>
    </figure>
  );
};

export default AvatarImage;
