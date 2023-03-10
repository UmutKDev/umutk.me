import Main from "@/layouts/Main";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "@/libs/config";

const Contact = () => {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="Contact" />
      <Main title="Contact">
        <p>Contact</p>
      </Main>
    </>
  );
}

export default Contact;