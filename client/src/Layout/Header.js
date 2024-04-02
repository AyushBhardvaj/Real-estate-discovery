import React from "react";
import { Link } from "react-router-dom";
import { IconSearch, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const isNonMonile = useMediaQuery("(min-width:768px)");
  return (
    <header className="w-full h-[3rem] md:h-[4.5rem]">
      <div className="w-full h-full bg-slate-200 flex items-center px-4 md:px-14 ">
        <div className="w-full h-full flex justify-between items-center relative">
          <Link to="/">
            <div className=" md:text-xl text-lg">
              <span className=" text-gray-500 font-medium">Sahand</span>
              <span className=" font-semibold">Estate</span>
            </div>
          </Link>
          <div className="h-full">
            <form className="h-full flex items-center">
              <div className="md:w-[16rem] sm:w-[13rem] w-[10rem] h-[70%] px-2 md:px-3 flex items-center gap-2 bg-slate-100 rounded-md">
                <input
                  placeholder="Search..."
                  className="w-[80%] bg-slate-100 rounded-md focus:outline-0 active:outline-0"
                  type="text"
                />
                <button type="submit">
                  <IconSearch strokeWidth="2" width={20} height={20} />
                </button>
              </div>
            </form>
          </div>

          <div className=" gap-2 hidden md:flex">
            <Link to="/">
                <div className="py-2 px-3 hover:bg-slate-300 rounded-md border-none">Home</div>
            </Link>
            <Link to="/about">
                <div className="py-2 px-3 hover:bg-slate-300 rounded-md border-none">About</div>
            </Link>
            <Link to="/auth">
                <div className="py-2 px-3 hover:bg-slate-300 rounded-md border-none">SignIn</div>
            </Link>
           
          </div>
          {!isNonMonile && (
            <div
              onClick={() => setIsMenu(true)}
              className={`${isMenu ? "hidden" : "flex"}`}
            >
              <IconMenu2 />
            </div>
          )}

          <div
            onClick={() => setIsMenu(false)}
            className={`${!isMenu ? "hidden" : "flex"}`}
          >
            <IconX />
          </div>
          {isMenu && (
            <div
              onClick={() => setIsMenu(false)}
              className=" w-20 absolute flex flex-col border top-[3.4rem] right-0 shadow-md"
            >
              <Link to="/">
                <div className=" flex py-1 px-2 text-gray-600">Home</div>
              </Link>
              <Link to="/about">
                <div className="flex py-1 px-2 text-gray-600">About</div>
              </Link>
              <Link>
                <div className="flex py-1 px-2 text-gray-600">SignIn</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
