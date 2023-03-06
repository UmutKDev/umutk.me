import Main from "@/layouts/Main";
import { NextSeo } from "next-seo";
import { Skills as SkillsStacks, NEXT_SEO_DEFAULT } from "@/libs/config";
import SVG from "react-inlinesvg";
import { Courier_Prime } from "@next/font/google";
import Image from "next/image";

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
        <p className="text-white/80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="mt-3 grid w-screen gap-y-4 overflow-auto lg:h-[calc(100vh-11.5rem)] lg:w-full lg:pr-4">
          {SkillsStacks.map((stack, i) => (
            <div
              key={i}
              className="flex h-auto w-full flex-col rounded-xl border border-[#1C1C1C] lg:h-24 lg:flex-row"
            >
              <div className="flex items-center justify-center rounded-l bg-white lg:w-24">
                <Image
                  draggable={false}
                  src={stack.icon}
                  width={96}
                  height={96}
                  alt={"Skill Icon"}
                />
              </div>
              <div className="flex flex-col justify-center border-t border-[#1C1C1C] p-4 pl-5 lg:w-32 lg:border-r lg:border-t-0">
                <h5 className={curriorPrime.className}>name</h5>
                <p className="text-sm text-white/80">{stack.name}</p>
              </div>
              <div className="flex flex-col justify-center border-t border-[#1C1C1C] p-4 pl-5 lg:w-60 lg:border-t-0 lg:border-r">
                <h5 className={curriorPrime.className}>type</h5>
                <p className="text-sm text-white/80">{stack.type}</p>
              </div>
              <div className="flex flex-col justify-center border-t border-[#1C1C1C] p-4 pl-5  lg:border-t-0">
                <h5 className={curriorPrime.className}>use case</h5>
                <p className="text-sm text-white/80">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          ))}
        </div>
      </Main>
    </>
  );
}
