"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

  // ================= Image Slideshow =================
  const images = ["/images/5.jpg", "/images/6.jpg", "/images/7.jpg", "/images/8.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ================= Audio =================
  const audioRef = useRef(null);
  const handleStartJourney = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    onNext();
  };

  // ================= Heart Game =================
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = (id) => {
    setScore((prev) => prev + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <ScreenContainer>
      <div className="text-center max-w-3xl mx-auto relative">

        {/* Audio */}
        <audio ref={audioRef} src="/public_audio_bg.mp3" loop />

        {/* Image */}
        <motion.div className="mb-8">
          <div className="w-36 h-36 md:w-40 md:h-40 mx-auto bg-pink-500/10 rounded-full flex items-center justify-center border-2 border-pink-400/30 overflow-hidden">
            <img
              src={images[currentImage]}
              alt="img"
              className="w-28 md:w-32 object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-pink-400 mb-8">
          Happy Anniversary <span className="text-purple-400">Cutiepiee</span>
        </h1>

        {/* Days */}
        <div className="mb-12">
          <p className="text-xl text-pink-200">We've been together for</p>
          <div className="text-6xl font-bold text-pink-400">{displayedDays}</div>
          <p className="text-xl text-pink-200">days and counting...</p>
        </div>

        {/* Button */}
        <button
          onClick={handleStartJourney}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold"
        >
          Start Our Journey 💫
        </button>

        {/* ❤️ Game */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            onClick={() => handleHeartClick(heart.id)}
            className="absolute text-3xl cursor-pointer animate-bounce"
            style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
          >
            ❤️
          </div>
        ))}

        {/* Score */}
        <div className="absolute top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-full">
          ❤️ {score}
        </div>

        {/* Instruction */}
        <div className="absolute top-16 right-4 text-white text-sm">
          Catch the hearts 💖
        </div>

      </div>
    </ScreenContainer>
  );
}
