import React, { useEffect, useState } from "react";
import image1 from "assets/real-estate1.jpg";
import image2 from "assets/real-estate2.jpg";
import image3 from "assets/real-estate3.jpg";

const images = [{ pic: image1 }, { pic: image2 }, { pic: image3 }];

const ListingDetailUi = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center py-16">
        <div className="w-full flex flex-col items-center gap-5">
          <div className=" w-[90%] rounded-lg bg-white border border-slate-300 px-5 py-8">
            <div className="w-full flex flex-col gap-3">
              <div className=" w-full flex justify-between">
                <div className="flex flex-col gap-3">
                  <h4 className=" font-medium text-2xl">
                    A 3bhk flat in Gulsan Vivante
                  </h4>
                  <h5 className=" font-normal text-gray-400 text-[1.2rem]">
                    3C Lotus Panache, Sector 110 Noida, Noida, U P
                  </h5>
                </div>
                <div className="flex flex-col gap-3 items-end mr-5">
                  <h3 className=" text-2xl text-red-600 font-medium">
                    For Sale
                  </h3>
                  <div className="flex gap-1">
                    <p className=" text-gray-400 text-[0.9rem] font-light">
                      Posted on :
                    </p>
                    <p className=" text-gray-400 text-[0.9rem] font-light">
                      Aug 30, 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-8 my-8">
                <div className="w-full md:w-[55%] flex  justify-center ">
                  <div className="h-[23rem] w-full grid grid-cols-3 grid-rows-2 gap-5 ">
                    {/* Main banner */}
                    <div className=" col-span-2 row-span-2 rounded-md overflow-hidden relative">
                      <div className="w-full h-full absolute">
                        <img
                          src={image1}
                          alt=""
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>{" "}
                    </div>
                    {/*  */}
                    <div className="col-span-1 row-span-1 rounded-md overflow-hidden">
                      <img
                        src={image2}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-span-1 row-span-1 rounded-md overflow-hidden">
                      <img
                        src={image3}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[45%] grid grid-cols-3 grid-rows-3 gap-3">
                  <div className=" flex flex-col gap-1 items-start">
                    <h5 className=" font-light text-gray-500 text-[1.2rem]">
                      Carpet Area
                    </h5>
                    <h6 className=" font-medium text-[1.2rem]">2090 sqft</h6>
                  </div>
                  <div className=" flex flex-col gap-1 items-start">
                    <h5 className=" font-light text-gray-500 text-[1.2rem]">
                      Bedrooms
                    </h5>
                    <h6 className=" font-medium text-[1.2rem]">2</h6>
                  </div>
                  <div className=" flex flex-col gap-1 items-start">
                    <h5 className=" font-light text-gray-500 text-[1.2rem]">
                      Bathrooms
                    </h5>
                    <h6 className=" font-medium text-[1.2rem]">2</h6>
                  </div>
                  <div className=" flex flex-col gap-1 justify-center">
                    <h5 className=" font-light text-gray-500 text-[1.2rem]">
                      Facing
                    </h5>
                    <h6 className=" font-medium text-[1.2rem]">East</h6>
                  </div>
                  <div className=" flex flex-col gap-1 justify-center">
                    <h5 className=" font-light text-gray-500 text-[1.2rem]">
                      Furnishing Status
                    </h5>
                    <h6 className=" font-medium text-[1.2rem]">
                      Semi-Furnished
                    </h6>
                  </div>
                  <div className=" flex flex-col gap-1 justify-center">
                    <h5 className=" font-light text-gray-500 text-[1.2rem]">
                      Type
                    </h5>
                    <h6 className=" font-medium text-[1.2rem]">Apartment</h6>
                  </div>
                  <div className=" flex flex-col gap-1 justify-end">
                    <h5 className=" font-light text-gray-500 text-[1.2rem]">
                      Carpet Area
                    </h5>
                    <h6 className=" font-medium text-[1.2rem]">2090 sqft</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[90%] rounded-lg bg-white border border-slate-300 px-3 md:px-5 py-8">
            <div className="w-full flex flex-col items-start gap-4 md:gap-7">
              <h3 className="w-full font-medium text-2xl md:text-3xl">
                More Details
              </h3>
              <div className="w-full flex flex-col gap-3 md:gap-6 ml-[0.15rem] md:ml-2">
                <div className="w-full flex justify-start ">
                  <div className="w-[35%] md:w-[23%]">
                    <h6 className="text-lg md:text-[1.35rem] text-gray-600 font-light tracking-[0.045em]">
                      Rental Value
                    </h6>
                  </div>
                  <h5 className=" font-medium text-[1.25rem] md:text-[1.4rem] tracking-[0.04em]">
                    25,000
                  </h5>
                </div>
                <div className="flex justify-start ">
                  <div className="w-[23%]">
                    <h6 className="text-[1.35rem] text-gray-600 font-light tracking-[0.045em]">
                      Address
                    </h6>
                  </div>
                  <div className="w-[75%]">
                    <h5 className=" font-medium text-[1.4rem] tracking-[0.04em]">
                      L 214. Gulshan vivante sector 137 Noida, Sector 137, Noida
                      - Noida Expressway, Delhi NCR
                    </h5>
                  </div>
                </div>
                <div className="flex justify-start ">
                  <div className="w-[23%]">
                    <h6 className="text-[1.35rem] text-gray-600  font-light tracking-[0.045em]">
                      Landmark
                    </h6>
                  </div>
                  <h5 className=" font-medium  text-[1.4rem] tracking-[0.04em]">
                    Orion Mall
                  </h5>
                </div>
                <div className="flex justify-start ">
                  <div className="w-[23%]">
                    <h6 className="text-[1.35rem] text-gray-600  font-light tracking-[0.045em]">
                      Flooring
                    </h6>
                  </div>
                  <h5 className=" font-medium text-[1.4rem] tracking-[0.04em]">
                    Vitrified
                  </h5>
                </div>
                <div className="flex justify-start ">
                  <div className="w-[23%]">
                    <h6 className="text-[1.35rem] text-gray-600 font-light tracking-[0.045em]">
                      Age of Construction
                    </h6>
                  </div>
                  <h5 className=" font-medium  text-[1.4rem] tracking-[0.04em]">
                    Less than 5 years
                  </h5>
                </div>
                <div className="flex justify-start ">
                  <div className="w-[23%]">
                    <h6 className="text-[1.35rem] text-gray-600 font-light tracking-[0.045em]">
                      Overlooking
                    </h6>
                  </div>
                  <h5 className=" font-medium text-[1.4rem] tracking-[0.04em]">
                    Main Road
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[90%] rounded-lg bg-white border border-slate-300 px-5 py-8">
            <div className="w-full flex flex-col items-start gap-5">
              <h3 className="w-full font-medium text-3xl">Owner Details</h3>
              <div className=" flex flex-col md:flex-row gap-10 md:gap-20">
                <div className=" flex items-center gap-3">
                  <div className=" w-16 h-16 rounded-full border-2">
                    <img
                      src={image1}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                    />
                  </div>
                  <h6 className=" font-medium text-xl">Nikhil Mehta</h6>
                </div>
                <div className="flex flex-col gap-1">
                  <h6 className=" font-medium text-lg pb-1">
                    Contact Details:
                  </h6>
                  <div className="flex gap-2 pl-2">
                    <p className=" text-[0.95rem] text-gray-400 font-light">
                      Contact Number:
                    </p>
                    <p className=" text-[1rem] text-gray-400">+91 95xxxxxxxx</p>
                  </div>
                  <div className="flex gap-2 pl-2">
                    <p className=" text-[0.95rem] text-gray-400 font-light">
                      Email id:
                    </p>
                    <p className=" text-[1rem] text-gray-400">
                      ayushbhardvaj01@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailUi;
