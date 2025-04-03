"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { styles } from "../styles";
import EarthCanvas from "../components/EarthCanvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import SendButton from "../components/SendButton";

const Contact = () => {
  const router = useRouter();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if form is valid
    if (!form.name || !form.email || !form.message) {
      return; // SendButton will be disabled anyway
    }

    setLoading(true);
    setIsSent(false);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Jaideep N",
          from_email: form.email,
          to_email: "deepj2944@gmail.com",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setIsSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => router.push("/ThankYou"), 1500);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert("Ahh, something went wrong. Please try again.");
      });
  };

  // Check if form is complete
  const isFormValid = form.name && form.email && form.message;

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden pb-12">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 rounded-2xl xl:mr-10"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-6 max-w-xl mx-auto relative z-10 p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg shadow-blue-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-500/30 blur-2xl opacity-60 -z-10"></div>

          {/* Name Input */}
          <div className="relative group">
            <label className="flex flex-col relative">
              <span className="text-white/80 font-medium mb-2 flex items-center gap-2">
                Your Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                className="bg-black/50 backdrop-blur-sm py-3 px-5 text-white placeholder:text-white/40 rounded-lg outline-none border border-white/20 focus:border-purple-400 transition-all duration-300 shadow-md shadow-purple-500/10 focus:ring-2 focus:ring-purple-500/40"
                required
              />
            </label>
          </div>

          {/* Email Input */}
          <div className="relative group">
            <label className="flex flex-col relative">
              <span className="text-white/80 font-medium mb-2 flex items-center gap-2">
                Email Address
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Where can the cosmos contact you?"
                className="bg-black/50 backdrop-blur-sm py-3 px-5 text-white placeholder:text-white/40 rounded-lg outline-none border border-white/20 focus:border-blue-400 transition-all duration-300 shadow-md shadow-blue-500/10 focus:ring-2 focus:ring-blue-500/40"
                required
              />
            </label>
          </div>

          {/* Message Input */}
          <div className="relative group">
            <label className="flex flex-col relative">
              <span className="text-white/80 font-medium mb-2 flex items-center gap-2">
                Message
              </span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Transmit your thoughts to the stars..."
                className="bg-black/50 backdrop-blur-sm py-3 px-5 text-white placeholder:text-white/40 rounded-lg outline-none border border-white/20 focus:border-indigo-400 transition-all duration-300 shadow-md shadow-indigo-500/10 focus:ring-2 focus:ring-indigo-500/40"
                required
              />
            </label>
          </div>

          {/* Submit Button - Only SendButton remains */}
          <div className="mt-6 flex justify-center">
            <SendButton 
              type="submit"
              disabled={!isFormValid || loading || isSent}
              isSent={isSent}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");