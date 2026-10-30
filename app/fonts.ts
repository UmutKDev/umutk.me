import { Atkinson_Hyperlegible_Mono, Host_Grotesk } from "next/font/google";

// Shared by the [lang] root layout and global-not-found.
// Variable files on purpose: static 400/500 instances sometimes come back as
// fonts.gstatic.com/l/font?kit=…&skey=… URLs, which break the Turbopack next/font loader.
export const grotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const mono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
