import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function LoginInForm({setIsLoggedIn}) {

    const navigate = useNavigate();
    /* state variable to store email and password values */
    const[userData,setuserData] = useState({email:"", password:""});
    /* state variable to visibility of password */
    const [showPassword, setShowPassword] = useState(false);


    function changeHandler(event) {
        setuserData((prevData) => (
            {
                ...prevData,
                [event.target.name] : event.target.value
            }
        ))
        console.log(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const { email ,password} = userData;

        const res = await fetch("http://localhost:4000/api/v1/login" , {
            method:"POST",
            //credentials: 'include',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,password,
            })
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (res.status === 400) {
            toast.error(data.message);
        } else if (res.status === 401) {
            toast.error(data.message);
        } else if (res.status === 402) {
            toast.error(data.message);
        } else if (res.status === 500) {
            toast.error(data.message);
        } else {
            setIsLoggedIn(true);
            toast.success("User logined Successfully");
            navigate("/dashboard");
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler} class="flex flex-col w-full gap-4 mt-6">
            <label class="w-full relative">
                <p class="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">Email Address<sup class="text-pink-200">*</sup></p>
                <input
                    type="text"
                    required
                    name="email"
                    onChange={changeHandler}
                    value={userData.email}
                    placeholder="Enter Email id"
                    class="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] hover:scale-105 transition-transform"
                ></input>
            </label>
            <label class="w-full relative">
                <p class="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">Password<sup class="text-pink-200">*</sup></p>
                <input
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    onChange={changeHandler}
                    value={userData.password}
                    placeholder="Enter Password"
                    class="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] hover:scale-105 transition-transform"
                ></input>
                <span onClick={() => setShowPassword((prev) => !prev)} class="absolute right-3 top-[38px] cursor-pointer  hover:scale-67 transition-transform">
                    {showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"></AiOutlineEyeInvisible>}
                </span>
                <a href="#" class="text-xs mt-1 text-blue-100 max-w-max ml-auto">Forgot Password</a>
            </label>
            <button class="bg-yellow-500 py-2 rounded-md font-medium  hover:scale-105 transition-transform">Sign In</button>
        </form>
        </div>
    );
}

export default LoginInForm;