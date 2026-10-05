"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function MessageScreen({ onNext }) {
    const [showOverlay, setShowOverlay] = useState(false)

    const romanticMessage = `My Dearest Cutiepiee,

Every day with you feels like a beautiful dream that I never want to wake up from. You've brought so much joy, laughter, and warmth into my life that I can't imagine a world without you in it.

From the moment we first met, I knew there was something special about you. Your smile lights up my darkest days, your laugh is my favorite sound in the world, and your love has made me a better person.

Thank you for being my partner, my best friend, and my greatest love. Thank you for all the little moments that make up our big love story - the morning coffees, the late-night conversations, the silly jokes, and the quiet moments where we just exist together in perfect harmony.

I promise to love you through all of life's adventures, to support your dreams, to laugh with you, cry with you, and grow old with you. You are my today, my tomorrow, and my always.

Happy Anniversary, my beautiful soul. Here's to many more years of love, laughter, and endless happiness together.

With all my love and devotion,
Your Forever Person 💕`

    const handleCardClick = () => {
        setShowOverlay(true)
    }

    const closeOverlay = () => {
        setShowOverlay(false)
    }

    return (
        <ScreenContainer>
            <div className="w-full max-w-4xl mx-auto text-center relative">

                {/* Title */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 text-balance leading-tight"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY
                        }}
                    >
                        A Special Message For You
                    </motion.h1>
                </motion.div>

                {/* Message Card */}
                <motion.div
                    className="relative group mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        onClick={handleCardClick}
                        className="w-80 h-48 mx-auto bg-gradient-to-br from-pink-900/40 via-purple-900/40 to-pink-800/40 backdrop-blur-lg rounded-2xl border-2 border-pink-400/50 shadow-2xl relative overflow-hidden cursor-pointer"
                    >

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        />

                        <div className="flex flex-col items-center justify-center h-full p-6">

                            <motion.div
                                className="text-6xl mb-4"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY
                                }}
                            >
                                💌
                            </motion.div>

                            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                For You, My Cutiepiee
                            </h3>

                            <p className="text-purple-300 text-sm">
                                Click to read my message
                            </p>

                        </div>
                    </motion.div>
                </motion.div>

                {/* Letter Overlay */}
                <AnimatePresence>
                    {showOverlay && (
                        <motion.div
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: .5 }}
                            exit={{ opacity: 0 }}
                            onClick={closeOverlay}
                        >

                            <motion.div
                                className="w-full max-w-2xl bg-gradient-to-b from-purple-950/50 via-black/90 to-pink-950/50 rounded-2xl shadow-2xl border-2 border-pink-400/40 p-8 relative"
                                initial={{
                                    scale: 0.8,
                                    opacity: 0,
                                    y: 50
                                }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    scale: 0.8,
                                    opacity: 0,
                                    y: 50
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >

                                {/* Close */}
                                <button
                                    onClick={closeOverlay}
                                    className="absolute top-4 right-4 text-pink-400 hover:text-pink-300 text-2xl"
                                >
                                    ×
                                </button>

                                {/* Heading */}
                                <div className="text-center mb-6">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                        Happy Anniversary!
                                    </h3>

                                    <p className="text-purple-300">
                                        This is just for you ♥
                                    </p>
                                </div>

                                {/* Letter */}
                                <div
                                    className="h-80 overflow-y-auto pr-4 mb-6"
                                    style={{
                                        scrollbarWidth: "thin",
                                        scrollbarColor:
                                            "rgba(236, 72, 153, 0.5) rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <div className="text-sm text-pink-100 leading-relaxed text-left whitespace-pre-line">
                                        {romanticMessage}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mb-5" />

                                {/* Quiz Button Area */}
                                <div className="relative flex justify-center">

                                    {/* Butterfly 1 */}
                                    <motion.div
                                        className="absolute left-1/4 -top-8 text-2xl pointer-events-none"
                                        animate={{
                                            x: [-10, -30, -10],
                                            y: [10, -15, 10],
                                            rotate: [-10, 10, -10],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        🦋
                                    </motion.div>

                                    {/* Butterfly 2 */}
                                    <motion.div
                                        className="absolute right-1/4 -top-10 text-2xl pointer-events-none"
                                        animate={{
                                            x: [10, 30, 10],
                                            y: [5, -20, 5],
                                            rotate: [10, -10, 10],
                                        }}
                                        transition={{
                                            duration: 3.5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        🦋
                                    </motion.div>

                                    {/* Butterfly 3 */}
                                    <motion.div
                                        className="absolute left-1/2 -top-12 text-xl pointer-events-none"
                                        animate={{
                                            x: [-5, 15, -5],
                                            y: [5, -25, 5],
                                        }}
                                        transition={{
                                            duration: 2.7,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        🦋
                                    </motion.div>

                                    {/* Quiz Button */}
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            setShowOverlay(false)
                                            setTimeout(() => {
                                                onNext?.()
                                            }, 250)
                                        }}
                                        whileHover={{
                                            scale: 1.06,
                                            boxShadow: "0 0 30px rgba(236,72,153,0.45)"
                                        }}
                                        whileTap={{
                                            scale: 0.94
                                        }}
                                        className="relative z-10 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] animate-pulse text-white font-bold text-lg shadow-xl border border-pink-300/30"
                                    >
                                        Take the Quiz →
                                    </motion.button>

                                </div>

                                <p className="text-white/35 text-xs mt-4">
                                    A little surprise awaits you ✨
                                </p>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </ScreenContainer>
    )
}
