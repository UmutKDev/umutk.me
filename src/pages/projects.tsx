import Main from "@/layouts/Main";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Poppins, Courier_Prime } from "@next/font/google";
import { Projects as ProjectsItems, NEXT_SEO_DEFAULT } from "@/libs/config";

const curriorPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Projects(): JSX.Element {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Projects" />
      <Main title="Projects">
        <div className="w-full">
          <ul className="flex flex-col gap-y-4">
            {ProjectsItems.map((project, i) => (
              <Link href="#" key={i}>
                <li className="grid h-24 w-full grid-cols-12 rounded-md border border-[#1C1C1C] bg-transparent transition-all duration-200 ease-in-out hover:bg-white/10">
                  <div className="col-span-2 flex flex-col items-start justify-center border-r border-[#1C1C1C] pl-5">
                    <p className={curriorPrime.className}>name</p>
                    <p className="font-light text-white/80">umutk.me</p>
                  </div>
                  <div className="col-span-2 flex flex-col items-start justify-center border-r border-[#1C1C1C] pl-5">
                    <p className={curriorPrime.className}>language</p>
                    <p className="flex items-center font-light text-white/80">
                      typescript{" "}
                      <div className="ml-3 h-3 w-3 rounded-full bg-blue-800"></div>{" "}
                    </p>
                  </div>
                  <div className="col-span-8 flex flex-col items-start justify-center pl-5">
                    <p className={curriorPrime.className}>description</p>
                    <p className="font-light text-white/80">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* <ul>
          {ProjectsItems.map((project) => (
            <li key={project.name}>
              {project.name} - {project.description}
            </li>
          ))}
        </ul> */}
      </Main>
    </>
  );
}
