"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation as NavigationItems } from "@/libs/config";
import useSound from "use-sound";

const Navigation = (): JSX.Element => {
  const pathname = usePathname();

  const [playSwitchPageSound] = useSound("/sounds/switch-page.mp3");
  useEffect(() => {
    playSwitchPageSound();
  }, [pathname]);

  return (
    <div className="relative flex h-[calc(100vh-21rem)] w-full">
      <ul className="flex w-full flex-col items-center divide-y divide-dashed divide-[#1c1c1c]">
        {NavigationItems.map((link) => (
          <li
            key={link.name}
            className={`links border-green-400 last:!border-b`}
          >
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
