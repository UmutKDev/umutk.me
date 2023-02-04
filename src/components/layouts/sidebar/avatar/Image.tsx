const Image = (): JSX.Element => {
  return (
    <figure className="relative">
      <img src="img/umutk.jpg" className="w-24 rounded" draggable={false} />
      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-md bg-green-500"></div>
    </figure>
  );
};

export default Image;
