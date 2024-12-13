import Home from './Home'
import React , {useState} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LogIn from "./LogIn";
import GetToKnowONE from './GetToKnowONE'
import FAQs from './FAQs'
import ContactUs from './ContactUs'
import SignUp from './SignUp'
import Dashboard from './Dashboard'

function App() {
 
  const [auth,setAuth]=useState(false);
  const [id,setId]=useState(localStorage.getItem("id") || 0);
  const [b,setB]= useState(id!=0);
  console.log(b)
  console.log(id);
  return(  
    <BrowserRouter>
    
            
            <Routes>
              <Route path="/" element={<Home pers={[b,setB]} />} />
                <Route path="/GetToKnowONE" element={<GetToKnowONE />} />
                <Route path="/FAQs" element={<FAQs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/SignUp" element={<SignUp box={[auth,setAuth,id,setId]} />} />
                <Route path="/login" element={<LogIn box={[auth,setAuth,id,setId]} />} />
                <Route path="/dashboard" element={<Dashboard id={id} />} />
            </Routes>
        
</BrowserRouter>
    
  )
}

export default App
