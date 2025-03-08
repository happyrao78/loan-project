import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import AboutUs from '../components/AboutUs'
import Projects from '../components/Projects'
import FeedbackSlider from '../components/Feedback'
import Footer from '../components/Footer'
import ContactUs from '../components/ContactUs'
// import Navbar from '../components/Navbar'
import ChatBot from '../components/Chatbot'
import Team from '../components/Team'
import Steps from '../components/Steps'
import Advantages from '../components/Advantages'
import Partners from '../components/Partners'
import FAQ from '../components/Faq'
import Required from '../components/Required'

const Home = () => {
  return (
    <div>
      
        <Hero/>
        <Services/>
        <AboutUs/>
        {/* <Projects/> */}
        <Steps/>
        <Required/>
        <Advantages/>
        <Partners/>
        {/* <ChatBot /> */}
        {/* <Team/> */}
        <FeedbackSlider/>
        <FAQ/>
        
        {/* <ContactUs/> */}
       
        <Footer/>
    </div>
  )
}

export default Home