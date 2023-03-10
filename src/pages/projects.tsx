import Main from "@/layouts/Content";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Courier_Prime } from "@next/font/google";
import { Projects as ProjectsItems, NEXT_SEO_DEFAULT } from "@/libs/config";

const curriorPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Projects = () => {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Projects" />
      <Main title="Projects">
        <p className="text-white/80">
          These are the projects I have worked on.
        </p>
        <div className="mt-3 grid w-full gap-y-6 overflow-auto lg:h-[calc(100vh-11.5rem)] lg:w-full lg:pr-4">
          {ProjectsItems.map((project, i) => (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              key={i}
              className="flex h-auto w-full flex-col rounded-xl border border-[#1C1C1C] transition-colors duration-150 ease-in-out hover:bg-[#1C1C1C] lg:h-24 lg:flex-row"
            >
              <div className="flex flex-col justify-center border-t border-[#1C1C1C] p-4 pl-5 lg:w-32 lg:border-r lg:border-t-0">
                <h5 className={curriorPrime.className}>name</h5>
                <p className="text-sm text-white/80">{project.name}</p>
              </div>
              <div className="flex flex-col justify-center border-t border-[#1C1C1C] p-4 pl-5 lg:w-60 lg:border-t-0 lg:border-r">
                <h5 className={curriorPrime.className}>language</h5>
                <p className="flex items-center text-sm text-white/80">
                  {project.language}
                  <span
                    className="ml-3 h-3 w-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  ></span>{" "}
                </p>
              </div>
              <div className="flex flex-col justify-center border-t border-[#1C1C1C] p-4 pl-5 lg:border-t-0">
                <h5 className={curriorPrime.className}>Description</h5>
                <p className="text-sm text-white/80">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </Main>
    </>
  );
};

export default Projects;
