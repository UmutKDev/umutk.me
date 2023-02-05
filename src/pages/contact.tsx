import Main from "@/components/layouts/Main";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Contact() {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Contact" />
      <Main title="Contact">
        <p>Contact</p>
      </Main>
    </>
  );
}
