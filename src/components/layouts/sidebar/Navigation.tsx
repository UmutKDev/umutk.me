"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation as NavigationItems } from "@/libs/config";

const Navigation = (): JSX.Element => {
  const path = usePathname();

  return (
    <div className="h-[calc(100vh-20rem)] w-full">
      <ul className="flex w-full flex-col items-center divide-y divide-dashed divide-[#1c1c1c]">
        {NavigationItems.map((link) => (
          <li
            key={link.name}
            className={`links ${
              path === link.path
                ? "!border-r !border-r-white transition-all duration-300 ease-in-out"
                : ""
            }`}
          >
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
