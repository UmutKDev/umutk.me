import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Content = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <main className={[poppins.className, "py-12 px-8 lg:w-[calc(100vw-15rem)]"].join(" ")}>
      <section id={title.toLocaleLowerCase()} className={className}>
        <h1 className="mb-4 text-3xl font-semibold underline decoration-sky-500/80 decoration-2 underline-offset-4">
          {title}
        </h1>
        {children}
      </section>
    </main>
  );
};

export default Content;
