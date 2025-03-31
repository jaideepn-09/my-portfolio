'use client';
import { useState } from "react";
import Hero from "@/src/pages/Hero";
import Navbar from "@/src/components/Navbar";
import AnimatedBackground from "@/src/components/Background";
import WelcomeScreen from "@/src/pages/WelcomeScreen";
import { AnimatePresence } from "framer-motion";
import About from "@/src/pages/About";
import Portfolio from "@/src/pages/Portfolio";
import Contact from "@/src/pages/Contact";
import StarsCanvas from "@/src/components/Stars";
import Footer from "@/src/pages/Footer";

export default function Home() {
  const [showRain, setShowRain] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  return (
    <>
    <div className="bg-[#030014]">
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>
      {!showWelcome && (
        <>
        <div className='relative z-0'>
        <StarsCanvas />
          <Navbar />
          <Hero />
          <About />
          <Portfolio />
          <Contact />
          <Footer />
        </div>
        </>
      )}
       </div>
    </>
  );
}
