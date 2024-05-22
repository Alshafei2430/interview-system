import logo from "../assets/logo.png";

export const NavBar = () => {
  return (
    <div className=" flex justify-between items-center text-sm sm:text-lg  md:text-xl lg:text-4xl px-8 lg:px-32 font-extrabold  bg-sky-500 h-1/3 text-white">
      <div className=" shadow-lg rounded-full border-[#ffc400] border-8 ring-8">
        <img
          className="lg:w-40 lg:h-40 md:w-20 md:h-20 w-14 h-14"
          src={logo}
          alt=""
        />
      </div>
      <div>
        <h1>المقابلات اليومة</h1>
      </div>
      <div className="text-center">
        <p>الجيش الثالث الميداني</p>
        <p>فرع نظم المعلومات</p>
      </div>
    </div>
  );
};
