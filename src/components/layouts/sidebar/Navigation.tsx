"use client";

import Link from "next/link";
import { Navigation as NavigationItems } from "@/libs/config";

const Navigation = (): JSX.Element => {
  return (
    <div className="h-[calc(100vh-20rem)] w-full">
      <ul className="flex w-full flex-col items-center divide-y divide-dashed divide-[#1c1c1c]">
        {NavigationItems.map((link) => (
          <li key={link.name} className="links">
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
