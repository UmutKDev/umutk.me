import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Head() {
  return <NextSeo {...NEXT_SEO_DEFAULT} title="Contact" useAppDir={true} />;
}
