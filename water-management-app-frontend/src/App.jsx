import Home from './Home'
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LogIn from "./LogIn";
import GetToKnowONE from './GetToKnowONE'
import FAQs from './FAQs'
import ContactUs from './ContactUs'
import SignUp from './SignUp'

function App() {
 

  return(  
    <BrowserRouter>
    
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/GetToKnowONE" element={<GetToKnowONE />} />
                <Route path="/FAQs" element={<FAQs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        
</BrowserRouter>
    
  )
}

export default App
