import { PlusCircle, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConnection } from "@/hooks/useConnection";

import logo from "../assets/logo.png";
import { useDialog } from "@/hooks/useDialog";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export const NavBar = () => {
  const { isConnected } = useConnection();
  const { onOpen } = useDialog();
  const { user } = useAuth();

  return (
    <div className="relative flex justify-between items-center text-sm sm:text-lg  md:text-xl lg:text-4xl px-8 lg:px-32 font-extrabold  bg-sky-500 h-1/3 text-white">
      <Wifi
        className={cn(
          "absolute top-4 left-4 border-2 rounded-full p-2",
          isConnected ? "text-green-300" : "text-red-500"
        )}
        size={50}
      />
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
      {user?.role === 2 && (
        <Button
          onClick={onOpen}
          variant="secondary"
          className="absolute gap-2 right-20 bottom-4 text-sky-500"
          size="lg"
        >
          <span className="text-xl">اضافة مقابلة</span>
          <PlusCircle size={32} />
        </Button>
      )}
    </div>
  );
};
