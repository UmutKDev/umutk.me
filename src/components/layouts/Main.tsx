const Main = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section>
      <h1 className="text-3xl font-semibold underline decoration-sky-500/80 decoration-2 underline-offset-4">
        {title}
      </h1>
      {children}
    </section>
  );
};

export default Main;
