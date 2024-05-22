export const Loader = () => {
  return (
    <div className="absolute inset-0">
      <div className="flex h-full w-full items-center justify-center">
        <span className="relative flex h-10 w-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="animate-bounce inline-flex rounded-full h-10 w-10 bg-sky-500"></span>
        </span>
      </div>
    </div>
  );
};
