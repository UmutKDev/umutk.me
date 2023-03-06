import Main from "@/components/layouts/Main";
import { NextSeo } from "next-seo";
import { Skills as SkillsStacks, NEXT_SEO_DEFAULT } from "@/libs/config";
import SVG from "react-inlinesvg";
import { Courier_Prime } from "@next/font/google";

const curriorPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
export default function Skills() {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Skills" />
      <Main title="Skills">
        <div className="w-full">
          <ul className="flex h-[calc(100vh-9.5rem)] flex-col gap-y-4 overflow-auto rounded-md ">
            {SkillsStacks.map((stack, i) => (
              <li
                key={i}
                className="grid h-28 w-full grid-cols-12 rounded-md border border-[#1C1C1C] bg-transparent transition-all duration-200 ease-in-out hover:bg-white/10"
              >
                <div className="col-span-1 flex w-full flex-col items-center justify-center border-r border-[#1C1C1C]">
                  <SVG src={stack.icon} className="!h-24 !w-24" />
                </div>
                <div className="col-span-2 flex flex-col items-start justify-center border-r border-[#1C1C1C] pl-5">
                  <p className={curriorPrime.className}>name</p>
                  <p className="font-light text-white/80">{stack.name}</p>
                </div>
                <div className="col-span-3 flex flex-col items-start justify-center border-r border-[#1C1C1C] pl-5">
                  <p className={curriorPrime.className}>type</p>
                  <p className="flex items-center font-light text-white/80">
                    {stack.type}
                  </p>
                </div>
                <div className="col-span-6 flex flex-col items-start justify-center pl-5">
                  <p className={curriorPrime.className}>use case</p>
                  <p className="font-light text-white/80">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </>
  );
}
