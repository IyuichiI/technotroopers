import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import React, { useState } from 'react';
import validation from './SignupValidation.jsx';
import axios from 'axios';

function SignUp() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get validation results
        const validationErrors = validation(values);

        // Update errors state
        setErrors(validationErrors);

        // Check if there are no errors
        const hasNoErrors = Object.keys(validationErrors).length === 0;

        if (hasNoErrors) {
            // Perform the POST request with then and catch
            axios.post('http://localhost:8081/SoftwareProject', values)
              .then((res) => {
                // Handle the response if registration is successful
                console.log('User registered successfully:', res.data);
                navigate('/LogIn'); // Navigate to login page after successful registration
              })
              .catch((err) => {
                // Handle errors during the request
                console.error('Error during sign-up:', err);
                // Show a more detailed error message in case of failure
                alert('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
              });
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

                        <form onSubmit={handleSubmit}>
                            <div className="Labels">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" id="name" onChange={handleInput} name="name" />
                                {errors.name && <span className="text-danger">{errors.name}</span>}
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
                            <button type="submit" id="signup">Sign Up</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default SignUp;