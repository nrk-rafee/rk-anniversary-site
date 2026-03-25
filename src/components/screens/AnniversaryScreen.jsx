"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScreenContainer from "../ScreenContainer";

export default function AnniversaryScreen({ onNext }) {
  // ================= Day Calculation =================
  const [displayedDays, setDisplayedDays] = useState(0);
  const specialDate = new Date("2025-01-05");

  useEffect(() => {
    const today = new Date();
    const timeDiff = today.getTime() - specialDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    setDisplayedDays(daysDiff);
  }, []);

  // ================= Main Profile Image Slideshow =================
  const profileImages = [
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg"
  ];
  const [currentProfile, setCurrentProfile] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profileImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ================= Audio Management =================
  const audioRef = useRef(null);

  const handleStartJourney = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
    onNext();
  };

  // ================= Heart Game Logic =================
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        top: Math.random() * 70 + 15, // Screen er moddhe thakar jonno
        left: Math.random() * 80 + 10,
      };
      setHearts((prev) => [...prev, newHeart]);
      
      // 3 second por heart muche fela
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = (id) => {
    setScore((prev) => prev + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  // ================= Memory Slideshow =================
  const memoryImages = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
  ];
  const [currentMemory, setCurrentMemory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMemory((prev) => (prev + 1) % memoryImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScreenContainer>
      <div className="text-center max-w-3xl mx-auto relative min-h-[80vh] flex flex-col items-center justify-center">
        
        {/* Audio Element - Make sure the file is in 'public' folder */}
        <audio ref={audioRef} src="/public_audio_bg.mp3" loop />

        {/* Main Profile Image Slideshow */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6"
        >
          <div className="w-40 h-40 mx-auto bg-pink-500/10 rounded-full flex items-center justify-center border-4 border-pink-400/50 overflow-hidden shadow-lg shadow-pink-500/20">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentProfile}
                src={profileImages[currentProfile]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold text-pink-400 mb-6 drop-shadow-md"
        >
          Happy Anniversary <br />
          <span className="text-purple-400">Cutiepiee</span>
        </motion.h1>

        {/* Counter Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-10 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
        >
          <p className="text-lg text-pink-200 italic">We've been together for</p>
          <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            {displayedDays}
          </div>
          <p className="text-lg text-pink-200 italic">beautiful days and counting...</p>
        </motion.div>

        {/* Memory Slideshow (Instead of the marked section) */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 mb-10 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-3xl rotate-3 group-hover:rotate-6 transition-transform"></div>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentMemory}
              src={memoryImages[currentMemory]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              alt="Memory"
              className="relative w-full h-full object-cover rounded-3xl border-2 border-white/20 shadow-2xl"
            />
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartJourney}
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-pink-500/40 transition-all z-20"
        >
          Start Our Journey 💫
        </motion.button>

        {/* Heart Catching Game Overlay */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => handleHeartClick(heart.id)}
              className="absolute text-4xl cursor-pointer z-10 select-none"
              style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Game UI */}
        <div className="fixed top-6 right-6 flex flex-col items-end gap-1">
          <div className="bg-pink-500/20 backdrop-blur-md border border-pink-500/30 text-white px-5 py-2 rounded-full font-bold flex items-center gap-2">
            <span className="text-xl">❤️</span> {score}
          </div>
          <div className="text-pink-200/60 text-xs font-medium animate-pulse">
            Catch the hearts! ✨
          </div>
        </div>

      </div>
    </ScreenContainer>
  );
}
