import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import ProfilepicDropbox from "./ProfilepicDropbox";
import { useRef } from "react";
import { useEffect } from "react";
import demoImage from "assets/user.png";

const HeaderMenu = () => {
  const isNonMobile = useMediaQuery("(min-width:1024px)");
  const user = useSelector((state) => state.persisted.user);
  const profileRef = useRef();
  const profileIconRef = useRef();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    if (
      isProfileMenuOpen &&
      profileRef.current &&
      !profileRef.current.contains(e.target) &&
      e.target !== profileIconRef.current
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  const handleProfileIconClick = (e) => {
    if (user?.isAuthenticated) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    } else {
      navigate("/auth");
    }
    // navigate("/auth");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleProfileClick);

    return () => {
      document.removeEventListener("mousedown", handleProfileClick);
    };
  }, [isProfileMenuOpen]);

  return (
    <div>
      {isNonMobile ? (
        <div className=" gap-2 md:flex md:items-center">
          <Link to="/">
            <div className="py-2 px-3 hover:bg-slate-300 rounded-md border-none">
              Home
            </div>
          </Link>
          <Link to="/about">
            <div className="py-2 px-3 hover:bg-slate-300 rounded-md border-none">
              About
            </div>
          </Link>
          <div className="cursor-pointer hover:shadow-md hover:shadow-slate-400 rounded-full border-none">
            <img
              ref={profileIconRef}
              onClick={handleProfileIconClick}
              src={user?.user ? user.user.profilePic.url : demoImage}
              alt="user"
              style={{
                height: "36px",
                width: "36px",
                borderRadius: "100%",
              }}
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className={` hover:bg-slate-300 rounded-full cursor-pointer p-2`}
        >
          {isProfileMenuOpen ? <IconX /> : <IconMenu2 />}
        </div>
      )}

      {isProfileMenuOpen && (
        <div
          ref={profileRef}
          className="absolute z-10 right-0 top-10 lg:top-20 "
        >
          <ProfilepicDropbox profilemenuStatus={setIsProfileMenuOpen} />
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
