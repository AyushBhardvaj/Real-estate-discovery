import React from "react";
import { Link } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";
import HeaderMenu from "Layout/Header/HeaderMenu";

const Header = () => {
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

          <div>
            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
