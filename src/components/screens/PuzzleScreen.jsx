"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const IMAGE = "/images/puzzle.jpg"

const SOLVED = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function shufflePuzzle() {
  let shuffled = [...SOLVED]

  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
  } while (shuffled.every((value, index) => value === SOLVED[index]))

  return shuffled
}

export default function PuzzleScreen({ onComplete }) {
  const [started, setStarted] = useState(false)
  const [pieces, setPieces] = useState(SOLVED)
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState(false)
  const [swaps, setSwaps] = useState(0)

  const shuffledPieces = useMemo(() => shufflePuzzle(), [])

  useEffect(() => {
    setPieces(shuffledPieces)

    const timer = setTimeout(() => {
      setStarted(true)
    }, 1800)

    return () => clearTimeout(timer)
  }, [shuffledPieces])

  useEffect(() => {
    if (
      started &&
      pieces.every((piece, index) => piece === SOLVED[index])
    ) {
      setSolved(true)
    }
  }, [pieces, started])

  const handlePieceClick = (index) => {
    if (!started || solved) return

    if (selected === null) {
      setSelected(index)
      return
    }

    if (selected === index) {
      setSelected(null)
      return
    }

    const nextPieces = [...pieces]

    ;[nextPieces[selected], nextPieces[index]] = [
      nextPieces[index],
      nextPieces[selected],
    ]

    setPieces(nextPieces)
    setSelected(null)
    setSwaps((prev) => prev + 1)
  }

  const resetPuzzle = () => {
    setPieces(shufflePuzzle())
    setSelected(null)
    setSolved(false)
    setSwaps(0)
    setStarted(true)
  }

  return (
    <ScreenContainer>
      <motion.section
        className="min-h-screen flex items-center justify-center px-3 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-xl flex flex-col items-center text-center">

          <AnimatePresence mode="wait">

            {!started && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Fix the Picture 🧩
                </h1>

                <p className="text-white/70 mb-5">
                  Memorize this picture... 👀
                </p>

                <div className="relative w-full aspect-square overflow-hidden rounded-3xl shadow-2xl border border-white/20">
                  <img
                    src={IMAGE}
                    alt="Puzzle preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <motion.p
                  className="text-white/60 mt-5"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  Get ready... 🦋
                </motion.p>
              </motion.div>
            )}

            {started && !solved && (
              <motion.div
                key="puzzle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Fix the Picture 🧩
                </h1>

                <p className="text-white/70 mb-2">
                  Tap two pieces to swap them!
                </p>

                <p className="text-white/40 text-sm mb-5">
                  Swaps: {swaps}
                </p>

                {/* Bigger Puzzle */}
                <div className="w-full max-w-[520px] mx-auto aspect-square">
                  <div className="grid grid-cols-3 gap-2 w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 bg-black/30 p-2 shadow-2xl">
                    {pieces.map((piece, index) => {
                      const row = Math.floor(piece / 3)
                      const col = piece % 3

                      return (
                        <motion.button
                          key={`${piece}-${index}`}
                          type="button"
                          onClick={() => handlePieceClick(index)}
                          whileTap={{ scale: 0.94 }}
                          animate={{
                            scale: selected === index ? 0.94 : 1,
                          }}
                          className={`relative overflow-hidden rounded-lg border-2 ${
                            selected === index
                              ? "border-pink-400 ring-2 ring-pink-400/50"
                              : "border-white/10"
                          }`}
                          style={{
                            backgroundImage: `url(${IMAGE})`,
                            backgroundSize: "300% 300%",
                            backgroundPosition: `${col * 50}% ${row * 50}%`,
                          }}
                          aria-label={`Puzzle piece ${index + 1}`}
                        />
                      )
                    })}
                  </div>
                </div>

                <p className="text-white/40 text-xs mt-4">
                  Select one piece, then another piece to swap them.
                </p>
              </motion.div>
            )}

            {solved && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className="text-6xl mb-5"
                >
                  💖
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  You did it! ✨
                </h1>

                <p className="text-white/70 mb-2">
                  You fixed our little memory. 🥹
                </p>

                <p className="text-white/40 text-sm mb-7">
                  Completed in {swaps} swaps.
                </p>

                <div className="relative">

                  {/* Butterflies */}
                  <motion.span
                    className="absolute -left-5 -top-7 text-2xl"
                    animate={{
                      x: [-5, -18, -5],
                      y: [0, -12, 0],
                      rotate: [-8, 8, -8],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    🦋
                  </motion.span>

                  <motion.span
                    className="absolute -right-5 -top-6 text-2xl"
                    animate={{
                      x: [5, 18, 5],
                      y: [0, -14, 0],
                      rotate: [8, -8, 8],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                    }}
                  >
                    🦋
                  </motion.span>

                  <motion.button
                    type="button"
                    onClick={onComplete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-xl"
                  >
                    Read My Message ✉️
                  </motion.button>
                </div>

                <button
                  type="button"
                  onClick={resetPuzzle}
                  className="mt-5 text-white/40 hover:text-white/70 text-sm transition"
                >
                  Try Again ↻
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.section>
    </ScreenContainer>
  )
}
