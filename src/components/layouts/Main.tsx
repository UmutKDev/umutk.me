const Main = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <h1 className="text-3xl">{title}</h1>
      {children}
    </>
  );
};

export default Main;
