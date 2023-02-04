const Image = (): JSX.Element => {
  return (
    <figure className="relative">
      <img src="img/umutk.jpg" className="w-24 rounded" draggable={false} />
      <img
        src="img/umutk.jpg"
        className="lef-0 absolute top-0 bottom-0 right-0 -z-10  w-24 rounded blur-xl"
        draggable={false}
      />
      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-md bg-green-500"></div>
    </figure>
  );
};

export default Image;
