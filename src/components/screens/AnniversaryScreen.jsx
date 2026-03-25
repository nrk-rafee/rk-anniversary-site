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

  // ================= Profile Image Slideshow =================
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

  // ================= 🔥 FIXED AUDIO =================
  const audioRef = useRef(null);

  useEffect(() => {
    // যদি আগে থেকেই audio থাকে → use it
    if (typeof window !== "undefined") {
      if (window.globalAudio) {
        audioRef.current = window.globalAudio;
      } else {
        const audio = new Audio("/public_audio_bg.mp3");
        audio.loop = true;
        audioRef.current = audio;
        window.globalAudio = audio; // global save
      }
    }
  }, []);

  const handleStartJourney = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          onNext(); // page change হলেও গান চলবে
        })
        .catch((e) => {
          console.log("Play blocked:", e);
          onNext();
        });
    } else {
      onNext();
    }
  };

  // ================= Heart Game =================
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        top: Math.random() * 70 + 15,
        left: Math.random() * 80 + 10,
      };

      setHearts((prev) => [...prev, newHeart]);

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

  return (
    <ScreenContainer>
      <div className="text-center max-w-3xl mx-auto relative min-h-[80vh] flex flex-col items-center justify-center">

        {/* Profile Image */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-pink-400/50">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentProfile}
                src={profileImages[currentProfile]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-pink-400 mb-6">
          Happy Anniversary <br />
          <span className="text-purple-400">Cutiepiee</span>
        </h1>

        {/* Days */}
        <div className="mb-10">
          <p className="text-lg text-pink-200">We've been together for</p>
          <div className="text-7xl font-black text-pink-400">{displayedDays}</div>
          <p className="text-lg text-pink-200">beautiful days ❤️</p>
        </div>

        {/* GIF */}
        <img
          src="/gifs/anniversary.gif"
          className="w-72 h-72 object-cover rounded-3xl mb-6"
        />

        <p className="text-pink-300 mb-4 italic">
          It's Our Special Day 💖
        </p>

        {/* BUTTON */}
        <button
          onClick={handleStartJourney}
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold text-lg"
        >
          Start Our Journey 💫
        </button>

        {/* Hearts */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              onClick={() => handleHeartClick(heart.id)}
              className="absolute text-4xl cursor-pointer"
              style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Score */}
        <div className="fixed top-6 right-6 bg-pink-500 text-white px-4 py-2 rounded-full">
          ❤️ {score}
        </div>

      </div>
    </ScreenContainer>
  );
}
