import type { NextSeoProps } from "next-seo";
import { About } from "./";

const {
  name: { firstname, lastname },
} = About;

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  titleTemplate: `%s • ${firstname} ${lastname}`,
  defaultTitle: `${firstname} ${lastname}`,
  description: `${firstname} ${lastname}: Full Stack Developer`,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.umutk.me/",
    title: `${firstname} ${lastname}`,
    description: `${firstname} ${lastname}: Full Stack Developer`,
    images: [
      {
        url: "/images/umutk.jpg",
        alt: `${firstname} ${lastname}: Full Stack Developer`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@umutkdev",
    site: "@umutkdev",
  },
};
