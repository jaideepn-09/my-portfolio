"use client";
import React from "react";
import '@/app/globals.css'
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] to-[#0a0a1a] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto drop-shadow-glow" />
        </motion.div>

        {/* Text Content */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6"
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-gray-300 mb-12 max-w-md mx-auto"
        >
          Your message has been successfully delivered. I'll get back to you soon!
        </motion.p>

        {/* Home Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 
                      rounded-xl text-white font-semibold tracking-wide
                      transform transition-all duration-300
                      hover:scale-105 hover:shadow-glow
                      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Return Home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite`
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(20px); }
        }

        @keyframes blob {
          0% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.2) rotate(120deg); }
          66% { transform: scale(0.8) rotate(240deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .animate-blob {
          animation: blob 20s infinite linear;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 12px rgba(72, 187, 120, 0.4));
        }

        .hover\:shadow-glow:hover {
          box-shadow: 0 0 25px rgba(72, 187, 120, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;