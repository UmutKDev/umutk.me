import { useLanyard, LanyardData } from "react-use-lanyard";

const Lanyard = () => {
  const { loading, status } = useLanyard({
    userId: "312962543591096322",
    socket: true,
  });

  return {
    loading,
    status: status as LanyardData,
  };
};

export default Lanyard;
