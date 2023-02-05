import Main from "@/components/layouts/Main";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Technologies() {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Technologies" />
      <Main title="Technologies">
        <p>Technologies</p>
      </Main>
    </>
  );
}
