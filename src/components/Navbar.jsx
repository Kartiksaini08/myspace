import logo from "../assests/Logo.svg"
import { Link } from "react-router-dom";
import React from "react";
import { toast } from "react-hot-toast";

function Navbar(props){

    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    return(
        <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
            <Link to="/login"> <p className="bg-yellow-500 text-white py-2 px-4 rounded-[8px] border border-richblack-700  hover:scale-105 transition-transform font-bold text-xl">File Upload App</p></Link>
            <nav>
                <ul className="flex gap-3 text-white gap-x-6">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    <li>
                        <Link to="/">Contact</Link>
                    </li>
                </ul>
            </nav>
            {/* Login - SignUp - LogOut - Dashboard */}
            <div className="flex items-center gap-x-4 text-white">
                <div>
                    { !isLoggedIn && <Link to="/login"><button className="bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700 opacity-75  hover:scale-105 transition-transform hover:text-bold">Log In</button></Link> }
                </div>
                <div>
                    { !isLoggedIn && <Link to="/signup"><button className="bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700 opacity-75  hover:scale-105 transition-transform">Sign Up</button></Link> }
                </div>
                <div>   
                    { isLoggedIn && <Link to="/" ><button className="bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700 opacity-75  hover:scale-105 transition-transform" onClick={() => {setIsLoggedIn(false); toast.success("Logged Out")}}>Log Out</button></Link> }
                </div>
                <div>
                    { isLoggedIn && <Link to='/dashboard'><button className="bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700 opacity-75 hover:scale-105 transition-transform" >DashBoard</button></Link> }
                </div>
            </div>
        </div>
    );
}

export default Navbar;