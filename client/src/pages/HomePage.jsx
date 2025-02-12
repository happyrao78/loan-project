import React, { useEffect, useRef, useState } from "react";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import JobsSection from "../components/homePage/JobsSection";
// import { getJobs } from "../api/home";
import { homeHero } from "../data/data";
import client from "../api/client";
import axios from "axios";
import { useContext } from "react";
import { JobsContext } from "../context/JobsProvider";
// import { useJobs } from "../hooks";

const HomePage = ({ color }) => {
  const {hirings} = useContext(JobsContext)

  // useEffect(()=>{
  //   console.log(jobs);
    
  // },[jobs])
  const targetRef = useRef(null);
  const scrollToElement = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // console.log(jobs);
  return (
    <>
      <Header
        color={color}
        title1={homeHero.title1}
        title2={homeHero.title2}
        text={homeHero.text}
        btn={homeHero.btn}
        onclick={scrollToElement}
      />
      <div ref={targetRef}>
        <JobsSection jobs={hirings} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
