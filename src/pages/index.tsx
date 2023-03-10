import Main from "@/layouts/Main";
import { NextSeo } from "next-seo";
import { About, NEXT_SEO_DEFAULT } from "@/libs/config";

const Home = () => {
  const {
    name: { firstname, lastname },
    biography: {
      birth: { city, country, county, date },
      languages,
      interests,
    },
  } = About;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(date);

  const formattedLanguage = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(languages);

  const formattedPassion = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(interests);

  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="About" />
      <Main title="About">
        <div className="prose text-white/75">
          <p>
            {" "}
            Let me introduce myself. My name is{" "}
            <span className="important">
              {firstname} {lastname}
            </span>
            , and I was born on{" "}
            <span className="important">{formattedDate} </span>
            in{" "}
            <span className="important">
              {city}, {country}.
            </span>{" "}
            I am a fluent speaker of{" "}
            <span className="important">{formattedLanguage}</span> languages. I
            have a passion for{" "}
            <span className="important">{formattedPassion}</span>
          </p>
          <p>
            Currently, I am working as a full-stack developer, utilizing my
            skills and knowledge to build amazing web applications.
            Additionally, I have participated in a Hackathon event that took
            place in Bursa, Turkey, in November 2021.
          </p>{" "}
          <p>
            Education has been a crucial aspect of my career, and I am proud to
            have completed my studies at Ali Osman Sonmez Vocational High
            School, where I pursued and received a degree in web design from
            September 2019 to June 2022.{" "}
          </p>
          <p>
            In terms of professional experience, I had the opportunity to work
            as a strategic marketing intern at Türkün Holding from October 2021
            to June 2022. Currently, I am working as a freelance web developer,
            where I use my expertise to create custom web solutions for clients.
          </p>
          <p>
            Overall, I am enthusiastic, driven, and passionate about the field
            of web development, and I am committed to continuing to grow my
            skills and knowledge in this exciting industry.
          </p>
        </div>
      </Main>
    </>
  );
}

export default Home;