import React from "react";
import LoginInForm from "./LoginInForm";
import SignUpForm from "./SignUpForm";
import {FcGoogle} from "react-icons/fc"
import frameImage from "../assests/frame.png"

function Template({title, desc1, desc2, image, formType, setIsLoggedIn}) {
    return (
        <div className="flex flex-row w-11/12 max-w-[1160px] py-6 mx-auto gap-x-12 gap-y-0 justify-between">
            <div className="w-11/12 max-w-[450px]">
                <h1 className="text-richblack-5 font-semibold text-[1.375rem] leading-[2.375rem]">{title}</h1>
                <p className="text-[1.125rem] leading-[1.625] mt-4">
                    <span className="text-richblack-100">{desc1}</span><br></br>
                    <span className="text-blue-100">{desc2}</span>
                </p>
                {formType === "login" ? (<LoginInForm setIsLoggedIn={setIsLoggedIn}></LoginInForm>):(<SignUpForm setIsLoggedIn={setIsLoggedIn}></SignUpForm>)}
                {/* Line */}
                <div className="flex flex-row  w-full items-center my-4 gap-x-2">
                    <div className="w-full h-[1px] bg-richblack-700"></div>
                    <p className="text-richblack-700 font-medium leading-[1.375rem]">Or</p>
                    <div className="w-full h-[1px] bg-richblack-700"></div>
                </div>
                {/* Login with google button */}
                <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 hover:scale-105 transition-transform" ><FcGoogle></FcGoogle> <p>Sign In with Google</p> </button>
            </div>
            <div className="relative w-11/12 max-w-[450px] mt-10">
                <img src={image} alt="pattern" width={558} height={490} loading="lazy" className="absolute -top-4 right-4"></img>
            </div>
        </div>
    );
}

export default Template;