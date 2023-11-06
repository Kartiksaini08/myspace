import signupImg from "../assests/signup.png"
import Template from "../components/Template";
import React from "react";

function Signup({setIsLoggedIn}) {
    return(
        <div>
            <Template
                title="Join the millions learning to code"
                desc1="Build skills for today, tomorrow, and beyond."
                desc2="Education to future-proof your career."
                image={signupImg}
                formType="signup"
                setIsLoggedIn={setIsLoggedIn}>
            </Template>
        </div>
    );
}

export default Signup;