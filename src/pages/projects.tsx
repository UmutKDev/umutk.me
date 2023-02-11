import Main from "@/components/layouts/Main";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Projects as ProjectsItems, NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Projects(): JSX.Element {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Projects" />
      <Main title="Projects">
        <div className="w-full">
          <ul>
            <Link href="#">
              <li className="grid h-24 w-full grid-cols-12 rounded-md border border-[#1C1C1C] bg-transparent transition-all duration-200 ease-in-out hover:bg-white/10">
                <div className="col-span-2 flex flex-col items-start justify-center border-r border-[#1C1C1C] pl-5">
                  <span style={{ fontFamily: "" }}>name</span>
                  <span>umutk.me</span>
                </div>
                <div className="col-span-2 flex items-center justify-start border-r border-[#1C1C1C] pl-5">
                  Typescript
                </div>
                <div className="col-span-8 flex items-center justify-start pl-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </li>
            </Link>
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
