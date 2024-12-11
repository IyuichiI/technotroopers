import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import React, { useState } from 'react';
import validation from './LoginValidation.jsx';
import axios from 'axios';

function LogIn() {
    const [values, setValues] = useState({
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
            // Perform the POST request
            axios.post('http://localhost:5000/logIn', values)
              .then((res) => {
                console.log('Login successful:', res.data);
                alert('Welcome ' + res.data.user.name); // Display success message
                navigate('/'); // Navigate to the home page (or dashboard)
              })
              .catch((err) => {
                console.error('Error during login:', err);
                alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
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
                    <div className="logIn">
                        <h3>Log In</h3>
                        <p>
                            Don't have an account? <Link to="/SignUp" id="linkToSignUp">Sign Up</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit" id="login">Login</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default LogIn;