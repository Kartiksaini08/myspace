import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate   } from 'react-router-dom';
import {toast} from "react-hot-toast"

function SignUpForm({setIsLoggedIn}) {
    const navigate = useNavigate();
    const [userData, setUserData ] = useState({name:"",lastname:"",email:"",password:"",confirmPassword:""});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changeHandler(event) {
        setUserData((prevData) => ({
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if(userData.password !== userData.confirmPassword){
            toast.error("Password don't match");
            return ;
        }
        const { name,lastname,email,password,confirmPassword } = userData;

        const res = await fetch("http://localhost:4000/api/v1/signup" , {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,lastname,email,password,confirmPassword
            })
        });
        const data = await res.json();
        if (res.status === 400) {
            toast.error(data.message);
        } else if (res.status === 401) {
            toast.error(data.message);
        } else if (res.status === 500) {
            toast.error(data.message);
        } else {
            setIsLoggedIn(true);
            toast.success("Account Created successfully");
            navigate("/login");
        }
    }

    return (
        <div>
            <form method="POST" onSubmit={submitHandler} className="mt-[10px]">
                <div className="flex flex-row justify-between gap-x-4 mt-4">
                    <label>
                        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] " >First Name<sup className="text-pink-200">*</sup></p>
                        <input type="text" required placeholder="Enter First Name" name="name" onChange={changeHandler} value={userData.name}  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  transform transition-transform hover:scale-105 cursor-pointer"></input>
                    </label>
                    <label >
                        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">Last Name<sup className="text-pink-200">*</sup></p>
                        <input type="text" required placeholder="Enter Last Name" name="lastname" onChange={changeHandler} value={userData.lastname}  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  transform transition-transform hover:scale-105 cursor-pointer"></input>
                    </label>
                </div>
                <label className="w-full">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] mt-4" >Email Address<span className="text-pink-200">*</span></p>
                    <input type="email" required placeholder="Enter Email Address" name="email" onChange={changeHandler} value={userData.email}  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  transform transition-transform hover:scale-105 cursor-pointer"></input>
                </label>
                <div className="flex flex-row gap-x-4 justify-between mt-4">
                    <label className="relative ">
                        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] " > Create Password<span className="text-pink-200">*</span></p>
                        <input type={showPassword ? "text" : "password"} name="password" required placeholder="Enter Password" onChange={changeHandler} value={userData.password}  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  transform transition-transform hover:scale-105 cursor-pointer"></input>
                        <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px]  transform transition-transform hover:scale-105 cursor-pointer">{showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>) : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"></AiOutlineEyeInvisible>) } </span>
                    </label>
                    <label className="relative">
                        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] " >Confirm Password<span className="text-pink-200">*</span></p>
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required placeholder="Confirm Password" onChange={changeHandler} value={userData.confirmPassword}  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  transform transition-transform hover:scale-105 cursor-pointer"></input>
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-[38px]   transform transition-transform hover:scale-105 cursor-pointer">{showConfirmPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>) : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"></AiOutlineEyeInvisible>)}</span>
                    </label>
                </div>
                <button  className="w-full mt-4 bg-yellow-500 py-2 rounded-md font-medium  transform transition-transform hover:scale-105 cursor-pointer" >Create Account</button>
            </form>
        </div>
    );
}

export default SignUpForm;