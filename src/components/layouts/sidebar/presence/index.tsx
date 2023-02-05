const Presence = (): JSX.Element => {
  return (
    <div className="h-26 border-t border-[#1C1C1C]">
      <h5 className="m-2 mb-3 text-[13px] font-medium text-white/80">
        Doing Something
      </h5>
      <div className="flex items-center space-x-4 px-2">
        <div className="relative h-14 w-14">
          <div className="h-full w-full rounded-md bg-white/10"></div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-md bg-green-500"></div>
        </div>
        <div>
          <h5 className="mb-1 text-sm font-medium">Visual Studio Code</h5>
          <p className="text-xs text-white/80">[📁] UmutK.Main</p>
          <p className="text-xs text-white/80">[📝] index.tsx | 10:14</p>
        </div>
      </div>
    </div>
  );
};

export default Presence;
