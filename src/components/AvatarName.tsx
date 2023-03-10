import { About } from "@/libs/config";

const Name = (): JSX.Element => {

  const {
    name: { firstname, lastname }
  } = About;

  return <h1 className="text-xl font-bold">{firstname} {lastname}</h1>;
};

export default Name;
