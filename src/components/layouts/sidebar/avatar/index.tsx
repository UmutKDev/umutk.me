import Name from "./Name";
import Job from "./Job";
import Image from "./Image";

const Avatar = (): JSX.Element => {
  return (
    <div className="display flex flex-col items-center space-y-4 border-b border-[#1C1C1C] p-4">
      <Image />
      <div className="space-y-1 text-center">
        <Name />
        <Job />
      </div>
    </div>
  );
};

export default Avatar;
