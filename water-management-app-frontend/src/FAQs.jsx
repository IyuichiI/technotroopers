import React, { useState } from 'react';
import Header from './Header.jsx';


function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  var charty = document.getElementById('acquisitions');
  charty.style.visibility="hidden";
  const faqItems = [
    {
      question: 'What is Smart Water Bills?',
      answer:
        'Smart Water Bills is a platform that helps users track their water usage in real-time, reduce waste, and manage bills efficiently by integrating with the ONEE system.',
    },
    {
      question: 'How does Smart Water Bills work?',
      answer:
        'Our platform connects to ONEE’s smart metering system to provide real-time data on your water usage, notify you of unusual activity, and streamline your bill payments.',
    },
    {
      question: 'What features does Smart Water Bills offer?',
      answer:
        'Real-time tracking of water usage, alerts for leaks or unusual consumption, insights into your usage patterns, and easy and secure bill payments.',
    },
    {
      question: 'How will this save me money?',
      answer:
        'By providing insights into your water consumption, Smart Water Bills helps you identify wasteful usage and reduce your bills. You’ll also receive alerts for leaks, saving on costly repairs.',
    },
    {
      question: 'How do I create an account?',
      answer:
        'Click on the "Sign Up" button on our homepage, fill in your details, and connect your account to your ONEE subscription.',
    },
    {
      question: 'What information do I need to register?',
      answer:
        'You’ll need your ONEE customer ID, an email address, and a phone number to complete the registration.',
    },
    {
      question: 'How will I receive alerts?',
      answer:
        'You can choose to receive alerts via email, SMS, or in-app notifications.',
    },
    {
      question: 'How do I pay my bill through Smart Water Bills?',
      answer:
        'Once your account is linked to ONEE, you can pay directly through our platform using a credit card, bank transfer, or mobile wallet.',
    },
    {
      question: 'Is Smart Water Bills available in all areas served by ONEE?',
      answer:
        'Currently, our platform is available in major cities and regions covered by ONEE’s smart metering system. We are working to expand coverage.',
    },
  ];

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className = "FAQContainer">
        <h1 style={{color:'#3c7d89'}}>FAQs</h1>
        <ul>
          {faqItems.map((item, index) => (
            <li className="list" key={index}>
              <div className={activeIndex === index ? 'active' : 'inactive'}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
              <button onClick={() => handleClick(index)}>+</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FAQs;