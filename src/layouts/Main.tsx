const Main = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <section id={title.toLocaleLowerCase()} className={className}>
      <h1 className="mb-4 text-3xl font-semibold underline decoration-sky-500/80 decoration-2 underline-offset-4">
        {title}
      </h1>
      {children}
    </section>
  );
};

export default Main;
