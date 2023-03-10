import type { NextSeoProps, BreadCrumbJsonLdProps } from "next-seo";
import { About } from "./";

const {
  name: { firstname, lastname },
} = About;

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  titleTemplate: `%s • ${firstname} ${lastname}`,
  defaultTitle: `${firstname} ${lastname}`,
  description: `Full Stack Developer`,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.umutk.me/",
    title: `${firstname} ${lastname}`,
    description: `Full Stack Developer`,
    images: [
      {
        url: "/images/umutk.jpg",
        alt: `Full Stack Developer`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@umutkdev",
    site: "@umutkdev",
  },
};

export const BREADCRUMB_JSON_LD: BreadCrumbJsonLdProps = {
  itemListElements: [
    {
      position: 1,
      name: "Skills",
      item: "https://www.umutk.me/skills",
    },
    {
      position: 2,
      name: "Projects",
      item: "https://www.umutk.me/projects",
    },
    {
      position: 3,
      name: "Blog",
      item: "https://www.umutk.me/blog",
    },
    {
      position: 4,
      name: "Contact",
      item: "https://www.umutk.me/contact",
    },
  ],
};
