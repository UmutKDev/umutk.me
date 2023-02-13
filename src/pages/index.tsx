import Main from "@/components/layouts/Main";
import { NextSeo } from "next-seo";
import { About, NEXT_SEO_DEFAULT } from "@/libs/config";

export default function Home() {
  return (
    <>
      <NextSeo {...NEXT_SEO_DEFAULT} title="About" />
      <Main title="About">
        <div className=" text-base font-light text-white/90">
          <div className="mb-5 text-2xl font-medium">
            {About.name.firstname} {About.name.lastname}
          </div>
          <div className="mb-5">
            {About.biography.birth.city}, {About.biography.birth.country}{" "}
            doğumluyum.
            {About.biography.languages.length > 0
              ? "Bildiğim diller: " + About.biography.languages.join(", ")
              : null}
            .
          </div>
          <div className="mb-5">
            {About.biography.occupation} olarak çalışmaktayım ve{" "}
            {About.biography.interests.join(", ")} gibi ilgi alanlarım var.
          </div>
          <div className="mb-5">
            {About.biography.education.length > 0 ? "Eğitim geçmişim: " : null}
            {About.biography.education.map((edu, index) => (
              <div key={index} className="mb-2">
                {edu.school} ({edu.degree})
              </div>
            ))}
          </div>
          <div className="mb-5">
            {About.biography.works.length > 0 ? "Çalışma geçmişim: " : null}
            {About.biography.works.map((work, index) => (
              <div key={index} className="mb-2">
                {work.name} ({work.position})
              </div>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}
