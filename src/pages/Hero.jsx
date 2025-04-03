'use client';
import React, { useState, useEffect, useCallback } from "react";
import { Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import ComputersCanvas from "../components/ComputersCanvas";
import AOS from 'aos';
import 'aos/dist/aos.css';

const StatusBadge = () => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
    </div>
  </div>
);

const TechStack = ({ tech }) => (
  <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
);

const CTAButton = ({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[150px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-10 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
);

const SocialLink = ({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-2">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
);

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Computer Science(Data Science) Student", "Tech Enthusiast"];
const TECH_STACK = ["JavaScript", "NextJS", "Python", "Flask", "Docker"];
const SOCIAL_LINKS = [
  { icon: FaGithub, link: "https://github.com/jaideepn-09" },
  { icon: FaLinkedin, link: "https://www.linkedin.com/in/jaideep-n-b647ab228" },
  { icon: FaInstagram, link: "https://www.instagram.com/jai_deepn02" }
];

const Hero = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div className="min-h-screen w-full overflow-hidden" id="hero">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Added mt-16 for mobile and lg:mt-0 for desktop */}
        <div className="container mx-auto max-w-full px-8 sm:px-10 lg:px-12 min-h-screen flex items-center mt-16 lg:mt-0">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            {/* Left Column - Adjusted for mobile */}
            <div className="w-full lg:w-2/5 space-y-5 text-left lg:ml-32 mt-8 lg:mt-0" 
                 data-aos="fade-right" 
                 data-aos-delay="200">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <StatusBadge />
                </div>
                
                {/* Title with mobile sizing */}
                <div className="space-y-1">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                    <span className="relative inline-block">
                      <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                      <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                        FullStack
                      </span>
                    </span>
                    <br />
                    <span className="relative inline-block mt-1">
                      <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                      <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                        Developer
                      </span>
                    </span>
                  </h1>
                </div>

                {/* Typing effect with mobile sizing */}
                <div className="h-7 flex items-center justify-start" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-base md:text-3xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[2px] h-5 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description with mobile adjustments */}
                <p className="text-base md:text-base text-gray-400 max-w-lg leading-relaxed font-light mt-2 md:mt-0"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Creating Innovative, Functional, and User-Friendly Websites for Digital Solutions.
                </p>

                {/* Tech Stack with mobile spacing */}
                <div className="text-xl flex flex-wrap gap-2 md:gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <div key={index} className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm md:text-base text-gray-300 hover:bg-white/10 transition-colors">
                      {tech}
                    </div>
                  ))}
                </div>

                {/* CTA Buttons with mobile spacing */}
                <div className="flex flex-row gap-2 md:gap-3 justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links with mobile sizing */}
                <div className="flex gap-3 md:gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <a href={social.link} key={index} target="_blank" rel="noopener noreferrer">
                      <button className="group relative p-2 md:p-3">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                        <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 md:p-3 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                          <social.icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - 3D Computer visualization (unchanged) */}
            <div className="w-full mb-4 lg:w-3/5 xl:w-3/5 relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px] xl:h-[800px] -mt-10 lg:-mt-20"
                 data-aos="fade-left" 
                 data-aos-delay="600">
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 w-full h-full bg-gradient-radial from-purple-700/30 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/30 rounded-full filter blur-[110px]"></div>
                </div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full">
                    {isMounted && <ComputersCanvas />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
