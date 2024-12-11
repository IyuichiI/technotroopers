import Header from "./Header.jsx";
import React from "react";

function ContactUs(){



    return(

        <>
                
        <Header />
       

       
       <div className="card1">
            
        
        
            <p>We'd love to hear from you! Whether you have questions, feedback, or need assistance, please reach out to us through any of the methods below.</p>
            <div class="contact-info">
            <h2>Our Office</h2>
                <p>1234 Water Conservation Blvd.
                Casablanca, Morocco</p>
                <p>Phone: +212-XXX-XXX-XXX
                Email: <a href="mailto:info@smartwaterbills.com">info@smartwaterbills.com</a></p>
            </div>
    
            <div class="business-hours">
                <h2>Business Hours</h2>
                <p>Monday – Friday: 9:00 AM – 6:00 PM
                Saturday: 10:00 AM – 4:00 PM
                Sunday: Closed</p>
            </div>
            
           </div>
    
          
       
        </>
    )
}

export default ContactUs