import React from "react";
import { Link } from "react-router-dom";


function Header(){
  
return(

    <header>
        <div id="div1">
        
        <h1 id="h1">Smart Water Bills</h1>
        <div id = "div2">
               <Link to="/SignUp">
                <button id="SignUp" className="buttons-header">Sign Up</button>
                </Link>
                <Link to="/login">
                <button id="LogIn" className="buttons-header" >Log In</button>
                 </Link>
            
        </div>
        </div>
      
        
        <nav>
            <ul id="ul-header">
                
            <li className="li-header"><Link to="/">Home</Link></li>
            <li className="li-header"><Link to="/GetToKnowONE">Get To Know Us</Link></li>
            <li className="li-header"><Link to="/FAQs">FAQs</Link></li>
            <li className="li-header"><Link to="/ContactUs">Contact Us</Link></li>
            </ul>
        </nav>
    </header>
)

}

export default Header