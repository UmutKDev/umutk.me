const Presence = (): JSX.Element => {
  return (
    <div className="flex h-24 w-full items-center space-x-4 border-t border-[#1C1C1C] px-3">
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
  );
};

export default Presence;
