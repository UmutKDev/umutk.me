const en = {
  skip: "Skip to content",
  nav: { home: "Home", work: "Work", now: "Now", uses: "Uses", cv: "CV", primary: "Primary", language: "Language", search: "Search" },
  palette: {
    placeholder: "Type a command or search",
    empty: 'No results for "{q}"',
    switchLang: "Türkçeye geç",
    copyEmail: "Copy email",
    copied: "Email copied",
    blocked: "Couldn't copy, the email is {email}",
    title: "Command palette",
    results: "Commands",
    github: "Open GitHub",
    linkedin: "Open LinkedIn",
    close: "Close",
  },
  spotify: {
    playing: "Now playing",
    last: "Last played",
    off: "Nothing playing right now",
    error: "Couldn't reach Spotify",
  },
  terminal: {
    label: "Command",
    run: "Run",
    output: "Terminal output",
    help: "Commands: help, whoami, work, stack, contact, lang, clear",
    whoami: "Umut Kızıloğlu, full-stack developer in Bursa, Türkiye.",
    lang: "Language: English. Type lang tr to switch.",
    unknown: "Command not found: {cmd}. Type help.",
  },
  hero: {
    title: "Full-stack work, kept as a record.",
    sentence: "React, NestJS and PostgreSQL, built and shipped from Bursa since 2023.",
    contact: "Contact",
    cv: "CV",
    intro:
      "I'm Umut Kızıloğlu, a full-stack developer in Bursa, Türkiye. Since April 2024 I've built HR products at ThinkCut: reusable UI components, API integrations and server-rendered pages tuned for speed and search. Before that I shipped client projects at Dijital Sahne with Node.js, TypeScript and PostgreSQL. I work in React, Next.js, NestJS, PostgreSQL, Redis and Docker.",
  },
  record: {
    title: "Every role, stored as a diff",
    versions: "Versions",
    change: "Change",
    field: "Field",
    before: "Before",
    company: "Company",
    role: "Role",
    period: "Period",
    kept: "Stack kept",
    dropped: "Dropped",
    added: "Added",
    why: "Why",
    who: "Who",
    when: "When",
    changed: "changed",
    removed: "removed",
    new: "added",
    comparedWith: "compared with",
    branchedFrom: "branched from",
    first: "first entry",
  },
  work: { title: "Selected work", next: "Next case study", caseStudy: "case study", stack: "Stack" },
  now: { title: "Now", current: "Currently" },
  uses: { title: "Uses", stack: "Stack" },
  cv: { experience: "Experience", skills: "Skills" },
  close: { title: "Write the next entry.", memoji: "Umut's memoji", sign: "Umut, Osmangazi, Bursa", elsewhere: "Elsewhere" },
  notFound: { title: "This page isn't in the record", back: "Back to the home page" },
  meta: {
    home: {
      title: "Umut Kızıloğlu — Full-Stack Developer in Bursa, Türkiye",
      description:
        "Full-stack developer in Bursa building scalable web apps with React, Next.js, TypeScript, NestJS and PostgreSQL. Currently at ThinkCut.",
    },
    now: {
      title: "Now — Umut Kızıloğlu",
      description:
        "What I'm focused on right now: work at ThinkCut, what I'm learning and building as a full-stack developer in Bursa.",
    },
    uses: {
      title: "Uses: Tools, Stack & Setup — Umut Kızıloğlu",
      description:
        "The editor, hardware, frameworks and services I use daily as a full-stack developer: React, Next.js, NestJS, PostgreSQL, Docker and more.",
    },
    cv: {
      title: "CV — Umut Kızıloğlu, Full-Stack Developer",
      description:
        "Résumé of Umut Kızıloğlu: full-stack developer at ThinkCut, previously Dijital Sahne. React, Next.js, NestJS, PostgreSQL. Download the PDF.",
    },
    work: {
      "pick-a-seat": {
        title: "Pick a Seat: Seat Reservation UI — Umut Kızıloğlu",
        description:
          "Case study: responsive ticketing and seat-reservation interfaces for Biletinial's Pick a Seat, built with Next.js, TypeScript and Tailwind CSS.",
      },
      "thinkcut-hr-suite": {
        title: "ThinkCut HR Suite Case Study — Umut Kızıloğlu",
        description:
          "Case study: HR web features at ThinkCut — reusable UI system, API integrations and SSR pages with NestJS, React, PostgreSQL, Redis and Docker.",
      },
    } as Record<string, { title: string; description: string }>,
  },
};

export type Dict = typeof en;
export default en;
