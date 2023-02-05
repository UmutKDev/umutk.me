import Main from "@/components/layouts/Main";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Home() {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Home" />
      <Main title="Home">
        <p>Home</p>
      </Main>
    </>
  );
}
