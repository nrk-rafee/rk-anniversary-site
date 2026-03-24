"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import AnniversaryScreen from "@/components/screens/AnniversaryScreen"
import PhotoGalleryScreen from "@/components/screens/PhotoGalleryScreen"
import MessageScreen from "@/components/screens/MessageScreen"

export default function AnniversaryApp() {
  const [currentScreen, setCurrentScreen] = useState("loader")

  const goToIntro = () => setCurrentScreen("intro")
  const goToAnniversary = () => setCurrentScreen("anniversary")
  const goToGallery = () => setCurrentScreen("gallery")
  const goToMessage = () => setCurrentScreen("message")

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 overflow-hidden">

      <AnimatePresence mode="wait">
        {currentScreen === "loader" && <LoaderScreen key="loader" onComplete={goToIntro} />}
        {currentScreen === "intro" && <IntroScreen key="intro" onNext={goToAnniversary} />}
        {currentScreen === "anniversary" && <AnniversaryScreen key="anniversary" onNext={goToGallery} />}
        {currentScreen === "gallery" && <PhotoGalleryScreen key="gallery" onNext={goToMessage} />}
        {currentScreen === "message" && <MessageScreen key="message" />}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light">
        @nrk-rafee
      </motion.div>
    </div>
  )
}
