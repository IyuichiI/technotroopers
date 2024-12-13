import Header from "./Header.jsx";
import React, { useRef, useState, useEffect,createContext } from "react";
import LogIn from "./LogIn";
import GetToKnowONE from './GetToKnowONE'
import FAQs from './FAQs'
import ContactUs from './ContactUs'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import {AuthContext} from "./context/authcontext.js";
function Home(prop) {
    const [b,setB]=prop.pers;
    console.log(b)
    const slidesRef = useRef(null); // Reference for the slides container
    const [currentSlide, setCurrentSlide] = useState(0); // State for the current slide
    var charty = document.getElementById('acquisitions');
    charty.style.visibility="hidden";

    const slides = [
        {
            id: 1,
            title: "Save money, Save water",
            text: "Take control of your water usage like never before! Monitor your consumption, save money, and make every drop count with smart, real-time insights designed for a sustainable future.",
            image: "/src/images/homeSecc.png",
        },
        {
            id: 2,
            title: "Water Smarter, Not Harder",
            text: "Join the movement towards sustainable living. Track your water usage effortlessly and save for a better tomorrow.",
            image: "/src/images/homeSec2.png",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length); // Go to the next slide
    };

    const prevSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex - 1 + slides.length) % slides.length); // Go to the previous slide
    };  

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
        return () => clearInterval(interval); // Clear interval on unmount
    }, [currentSlide]);

    return (
        <>
        
       <Header pers={prop} />
            
            <br />
            <div className="slider">
                <div className="slides" ref={slidesRef}>
                    {slides.map((slide, index) => (
                        <section
                            key={slide.id}
                            className={`slide ${
                                index === currentSlide ? "displaySlide" : "hideSlide"
                            }`}
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div id="sec1Content">
                                <h2 id="homeh2">{slide.title}</h2>
                                <p className="paragraph">{slide.text}</p>
                            </div>
                        </section>
                    ))}
            </div>
                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <button className="next" onClick={nextSlide}>&#10095;</button>
            </div>
        </>
    );
}

export default Home;