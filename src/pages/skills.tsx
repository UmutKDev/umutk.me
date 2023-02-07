import Main from "@/components/layouts/Main";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Skills() {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Skills" />
      <Main title="Skills">
        <p>Skills</p>
      </Main>
    </>
  );
}
