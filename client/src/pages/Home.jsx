import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { assets } from "../assets/assets";


function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${assets.gradientBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5, 
          pointerEvents: "none", 
        }}
      />
      <div className="relative z-10">
        <Navbar />
        <Header />
      </div>
    </div>
  );
}

export default Home;
