import Name from "./Name";
import Job from "./Job";
import Image from "./Image";

const Avatar = (): JSX.Element => {
  return (
    <div className="display mt-4 flex flex-col items-center space-y-8 border-b border-[#1C1C1C] p-4 pb-6">
      <Image />
      <div className="space-y-1 text-center">
        <Name />
        <Job />
      </div>
    </div>
  );
};

export default Avatar;
