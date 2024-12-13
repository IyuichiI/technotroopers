import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import React, { useState} from 'react';
import validation from './LoginValidation.jsx';
import axios from 'axios';
function LogIn(prop) {
    // console.log(prop);
    const [auth,setAuth,id,setId]=prop.box;
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    var charty = document.getElementById('acquisitions');
    charty.style.visibility="hidden";

    const handleSubmit = () => {
        // Get validation results
        const validationErrors = validation(values);

        // Update errors state
        setErrors(validationErrors);
        // Check if there are no errors
        const hasNoErrors = Object.keys(validationErrors).length === 0;

        if (hasNoErrors) {
            
      axios
      .post(`http://localhost:8080/api/login`,{values})
      .then((response) => {
        console.log(response);
        if (response.status===500) {
            alert("No user found with the provided email.")
        }else if (response.status===501) {
            alert("Invalid email or password.")
        }else if (response.status===200) {
            // console.log(response)
            setAuth(true);
            setId(response.data);
            localStorage.setItem("id",response.data);
            alert("you got in successfully")
        }
      })
      .then((response)=>navigate("/dashboard"))
      .catch((error) => {
        console.error("There was an error!", error);
      });
                
        
        }
    };

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    return (
        <>
           {!auth && <div id="back">
                <div id="background">
                    <div className="logIn">
                        <h3>Log In</h3>
                        <p>
                            Don't have an account? <Link to="/SignUp" id="linkToSignUp">Sign Up</Link>
                        </p>
                        <>
                            <div className="Labels">
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
                                <label htmlFor="subscribe">Keep me logged in</label><br />
                            </div>
                            <button onClick={()=>handleSubmit()}  id="login">Login</button>
                        </>
                    </div>
                </div>
                <Footer />
            </div>}
            {/* {auth && <Dashboard id={id} /> } */}
        </>
    );
}

export default LogIn;