import React from "react";
import { Link } from "react-router-dom";


function Dashboard(){
  
return(

    <>
        <div id="div1">
        
        <h1 id="h1">Smart Water Bills</h1>
        
        </div>
      
        
        <nav>
            <ul id="ul-header">
                
            <li className="li-header"><Link to="/">Home</Link></li>
            <li className="li-header"><Link to="/GetToKnowONE">Get To Know Us</Link></li>
            <li className="li-header"><Link to="/FAQs">FAQs</Link></li>
            <li className="li-header"><Link to="/ContactUs">Contact Us</Link></li>
            </ul>
        </nav>
    </>
)

}

export default Dashboard