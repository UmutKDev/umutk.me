import Main from "@/components/layouts/Main";
import { NextSeo } from "next-seo";
import { About, NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Home() {
  const {
    name: { firstname, lastname },
  } = About;

  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="About" />
      <Main title="About">
        <div className="text-base font-light text-white/90">
          Hello, {"I'm"}
          <span className="font-semibold">
            {" "}
            {firstname + " " + lastname}
          </span>. {"I'm"} a full-stack web developer.
        </div>
      </Main>
    </>
  );
}
