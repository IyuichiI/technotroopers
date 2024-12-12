import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import React, { useState } from 'react';
import validation from './SignupValidation.jsx';
import axios from 'axios';

function SignUp() {
    const [values, setValues] = useState({
        id:'',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();



    const handleSubmit = () => {
        // Get validation results
        const validationErrors = validation(values);

        // Update errors state
        setErrors(validationErrors);
        // Check if there are no errors
        const hasNoErrors = Object.keys(validationErrors).length === 0;

        if (hasNoErrors) {
                fetch("http://localhost:5000/api/signup", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ values}),
                  })
                    .then((response) => {
                        console.log(response);
                        if (response.status===500) {
                            alert("id or email already in use")
                        }else if (response.status===200) {
                            alert("you got in successfully");
                            navigate("/dashboard");
                        }
                      return response.text();
                    })

        
        }
    };

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    return (
        <>
            <div id="back">
                <div id="background">
                    <div className="signUp">
                        <h3>Sign Up</h3>
                        <p>
                            Already have an account? <Link to="/LogIn" id="linkToLogIn">Log In</Link>
                        </p>

                        <>
                            <div className="Labels">

                                <label htmlFor="id">id</label><br />
                                <input type="id" id="id" onChange={handleInput} name="id" />
                                <br />

                            <label htmlFor="email">Email</label><br />
                                <input type="email" id="email" onChange={handleInput} name="email" />
                                {errors.email && <span className="text-danger">{errors.email}</span>}
                                <br />

                                <label htmlFor="password">Password</label><br />
                                <input type="password" id="password" onChange={handleInput} name="password" />
                                {errors.password && <span className="text-danger">{errors.password}</span>}
                                <br />
                            </div>

                            <div className="CheckBox">
                                <input type="checkbox" />
                                <label htmlFor="subscribe">Keep me signed in</label><br />
                            </div>
                            <button onClick={()=>handleSubmit()} type="submit" id="signup">Sign Up</button>
                        </>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default SignUp;