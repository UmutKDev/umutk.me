export const About = {
  name: {
    firstname: "Umut",
    middleName: null,
    lastname: "Kızıloğlu",
  },
  biography: {
    birth: {
      date: new Date(2004, 7, 22),
      country: "Turkey",
      city: "Bursa",
      county: "Osmangazi",
    },
    languages: ["Turkish", "English"],
    interests: [
      "Web Programming",
      "Playing games",
      "Reading",
      "Watching movies",
      "Listening to music",
    ],
    occupation: "Full-Stack Developer",
    events: [
      {
        name: "Hackathon",
        date: new Date(2021, 10, 1),
        location: "Bursa, Turkey",
      },
    ],
    education: [
      {
        school: "Ali Osman Sonmez Vocational High School",
        degree: "Web Designer",
        date: {
          start: new Date(2019, 9, 1),
          end: new Date(2022, 6, 16),
        },
      },
    ],
    works: [
      {
        name: "Türkün Holding",
        position: "Strategic Marketing Intern",
        date: {
          start: new Date(2021, 9, 6),
          end: new Date(2022, 6, 16),
        },
      },
      {
        name: "Freelancer",
        position: "Web Developer",
        date: {
          start: new Date(2022, 6, 1),
          end: null,
        },
      },
    ],
    summary: `
        I'm Umut Kızıloğu, 18 years old and i still learning for become a full stack web developer.
        `,
  },
};
