import Header from './Header.jsx'
import React from 'react'

function GetToKnowONE(){

     var charty = document.getElementById('acquisitions');
     charty.style.visibility="hidden";

return(
     <>
     <Header/>
     <main>
          <div class="grid-container">
          <section class="grid-item">
               <h2>Welcome to Smart Water Bills</h2>
               <p>
                    Smart Water Bills is an innovative solution designed to simplify water usage 
                    management and promote sustainability. By integrating seamlessly with the ONEE 
                    system, we provide accurate, real-time data to help users save water and reduce 
                    their bills.
               </p>
          </section>

          <section class="grid-item">
               <h2>How It Works</h2>
               <p>Smart Water Bills connects directly with ONEE’s advanced metering system to provide:</p>
               <ul>
                    <li>💧 Real-time tracking</li>
                    <li>📊 Usage insights</li>
                    <li>🔔 Leak alerts</li>
                    <li>💳 Secure payments</li>
               </ul>



          </section>

          <section class="grid-item">
               <h2>Our Partnership with ONEE</h2>
               <p>
                    As a trusted provider of water and electricity in Morocco, ONEE is the backbone of 
                    Smart Water Bills. By integrating with their smart metering system, we ensure:
               </p>
               <ul>
                    <li>✅ Real-time data.</li>
                    <li>✅ Transparent billing.</li>
                    <li>✅ Issue alerts</li>
               </ul>
          </section>


          <section class="grid-item">
               <div className="cta">
                    <h2>Get Started Today!</h2>
                    <p>
                         Join the thousands of households and businesses already benefiting from 
                         Smart Water Bills and ONEE’s advanced system.
                    </p>
                    <button onClick={() => alert("Sign Up Coming Soon!")}>Sign Up</button>
               </div>
          </section>
          </div>
          
     </main> 
                       

     </>

);


}

export default GetToKnowONE