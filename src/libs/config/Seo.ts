import type { NextSeoProps, BreadCrumbJsonLdProps } from "next-seo";
import { About } from "./";

const {
  name: { firstname, lastname },
} = About;

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  titleTemplate: `%s • ${firstname} ${lastname}`,
  defaultTitle: `${firstname} ${lastname}`,
  description: `${firstname} ${lastname}'s personal website`,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.umutk.me/",
    title: `${firstname} ${lastname}`,
    description: `${firstname} ${lastname}'s personal website`,
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
  additionalLinkTags: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/images/logo/apple-icon-180x180.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/images/logo/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "/images/logo/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/images/logo/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "/images/logo/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/images/logo/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "/images/logo/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "/images/logo/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "/images/logo/apple-icon-57x57.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/images/logo/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/images/logo/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/images/logo/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/images/logo/favicon-16x16.png",
    },
  ],
  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "msapplication-TileColor",
      content: "#000000",
    },
    {
      name: "msapplication-TileImage",
      content: "/images/logo/ms-icon-144x144.png",
    },
    {
      name: "application-name",
      content: `${firstname} ${lastname}`,
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "apple-mobile-web-app-title",
      content: `${firstname} ${lastname}`,
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
    {
      name: "msapplication-tap-highlight",
      content: "#000000",
    },
  ],
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
  ],
};
