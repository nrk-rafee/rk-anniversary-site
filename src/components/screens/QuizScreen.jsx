"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const questions = [
    {
        question: "What comes after H?",
        options: ["K", "L", "i", "f"],
        correct: 2,
    },
    {
        question: "What comes after K?",
        options: ["M", "H", "O", "L"],
        correct: 3, // L is correct
    },
    {
        question: "What comes after X?",
        options: ["y", "Z", "W", "V"],
        correct: 0,
    },
    {
        question: "What does ILY mean?",
        options: [
            "i love you",
            "i like you",
            "i lost you",
            "i leave you",
        ],
        correct: 0,
    },
    {
        question: "Amader shomporko take tui kivhabe dekhis?",
        options: [
            "situation",
            "love",
            "bestfrnd",
            "just frndfrnd",
        ],
        opinion: true,
    },
]

export default function QuizScreen() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selected, setSelected] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const [answers, setAnswers] = useState([])

    const [showNotebook, setShowNotebook] = useState(false)
    const [feeling, setFeeling] = useState("")

    const [submitted, setSubmitted] = useState(false)

    const [whatsappSent, setWhatsappSent] = useState(false)

    const question = questions[currentQuestion]

    const handleAnswer = (index) => {
        if (selected !== null) return

        setSelected(index)

        // Q5 = opinion question
        if (question.opinion) {
            setAnswers((prev) => [
                ...prev,
                {
                    question: question.question,
                    answer: question.options[index],
                },
            ])

            setTimeout(() => {
                setShowNotebook(true)
            }, 700)

            return
        }

        const correct = index === question.correct

        setIsCorrect(correct)
        setShowResult(true)

        setAnswers((prev) => [
            ...prev,
            {
                question: question.question,
                answer: question.options[index],
                correct,
            },
        ])
    }

    const nextQuestion = () => {
        setSelected(null)
        setShowResult(false)
        setIsCorrect(false)

        setCurrentQuestion((prev) => prev + 1)
    }

    const handleSubmit = () => {
        if (!feeling.trim()) return

        setSubmitted(true)
    }

    const sendToWhatsApp = () => {
        const q5Answer =
            answers.find(
                (item) =>
                    item.question ===
                    "Amader shomporko take tui kivhabe dekhis?"
            )?.answer || "Not answered"

        const message = `💌 Anniversary Quiz Result

Q1: ${answers[0]?.answer || "Not answered"}

Q2: ${answers[1]?.answer || "Not answered"}

Q3: ${answers[2]?.answer || "Not answered"}

Q4: ${answers[3]?.answer || "Not answered"}

Q5: Amader shomporko take tui kivhabe dekhis?
Answer: ${q5Answer}

📝 Her/Your feeling:
${feeling}

💝 Sent from our anniversary website`

        const whatsappNumber = "8801820341700"

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=` +
            encodeURIComponent(message)

        window.open(whatsappURL, "_blank")

        setWhatsappSent(true)
    }

    return (
        <ScreenContainer>

            <div className="w-full max-w-2xl mx-auto px-4 py-8">

                <AnimatePresence mode="wait">

                    {/* ================= QUIZ ================= */}

                    {!showNotebook && !submitted && (
                        <motion.div
                            key={`question-${currentQuestion}`}
                            initial={{
                                opacity: 0,
                                x: 40,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: -40,
                            }}
                            transition={{
                                duration: 0.45,
                            }}
                            className="text-center"
                        >

                            {/* Butterfly */}
                            <motion.div
                                className="text-4xl mb-3"
                                animate={{
                                    y: [0, -8, 0],
                                    rotate: [-5, 5, -5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                }}
                            >
                                🦋
                            </motion.div>

                            {/* Progress */}
                            <p className="text-pink-300/70 text-sm mb-3">
                                Question {currentQuestion + 1} of{" "}
                                {questions.length}
                            </p>

                            <div className="w-full max-w-md mx-auto h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${
                                            ((currentQuestion + 1) /
                                                questions.length) *
                                            100
                                        }%`,
                                    }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {/* Question */}
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-8">
                                {question.question}
                            </h1>

                            {/* Options */}
                            <div className="space-y-4 max-w-md mx-auto">

                                {question.options.map((option, index) => {

                                    const isSelected =
                                        selected === index

                                    const isRightAnswer =
                                        !question.opinion &&
                                        index === question.correct

                                    let buttonStyle =
                                        "border-white/10 bg-white/5 hover:bg-white/10"

                                    if (showResult) {

                                        if (
                                            isSelected &&
                                            isCorrect
                                        ) {
                                            buttonStyle =
                                                "border-green-400 bg-green-500/20"
                                        }

                                        if (
                                            isSelected &&
                                            !isCorrect
                                        ) {
                                            buttonStyle =
                                                "border-red-400 bg-red-500/20"
                                        }

                                        if (
                                            !isCorrect &&
                                            isRightAnswer
                                        ) {
                                            buttonStyle =
                                                "border-green-400 bg-green-500/20"
                                        }
                                    }

                                    if (
                                        question.opinion &&
                                        isSelected
                                    ) {
                                        buttonStyle =
                                            "border-pink-400 bg-pink-500/20"
                                    }

                                    return (
                                        <motion.button
                                            key={option}
                                            type="button"
                                            onClick={() =>
                                                handleAnswer(index)
                                            }
                                            whileHover={
                                                selected === null
                                                    ? {
                                                          scale: 1.02,
                                                      }
                                                    : {}
                                            }
                                            whileTap={
                                                selected === null
                                                    ? {
                                                          scale: 0.97,
                                                      }
                                                    : {}
                                            }
                                            className={`w-full p-4 rounded-2xl border-2 text-white text-lg transition-all duration-300 ${buttonStyle}`}
                                        >

                                            <div className="flex items-center justify-between">

                                                <span>
                                                    {option}
                                                </span>

                                                {showResult &&
                                                    isSelected &&
                                                    isCorrect && (
                                                        <span>
                                                            ✅
                                                        </span>
                                                    )}

                                                {showResult &&
                                                    isSelected &&
                                                    !isCorrect && (
                                                        <span>
                                                            ❌
                                                        </span>
                                                    )}

                                                {showResult &&
                                                    !isCorrect &&
                                                    isRightAnswer && (
                                                        <span>
                                                            ✅
                                                        </span>
                                                    )}

                                                {question.opinion &&
                                                    isSelected && (
                                                        <span>
                                                            💗
                                                        </span>
                                                    )}

                                            </div>

                                        </motion.button>
                                    )
                                })}

                            </div>

                            {/* Result */}
                            <AnimatePresence>
                                {showResult && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="mt-6"
                                    >

                                        {isCorrect ? (
                                            <p className="text-green-400 font-semibold">
                                                Correct! 🥰✨
                                            </p>
                                        ) : (
                                            <p className="text-pink-300 font-semibold">
                                                Not quite! The correct answer is{" "}
                                                <span className="text-green-400">
                                                    {
                                                        question
                                                            .options[
                                                            question.correct
                                                        ]
                                                    }
                                                </span>{" "}
                                                💗
                                            </p>
                                        )}

                                        <motion.button
                                            type="button"
                                            onClick={nextQuestion}
                                            whileHover={{
                                                scale: 1.05,
                                            }}
                                            whileTap={{
                                                scale: 0.95,
                                            }}
                                            className="mt-5 px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                                        >
                                            Next →
                                        </motion.button>

                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    )}

                    {/* ================= NOTEBOOK ================= */}

                    {showNotebook && !submitted && (
                        <motion.div
                            key="notebook"
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            className="text-center"
                        >

                            {/* Butterflies */}
                            <div className="relative h-12 mb-2">

                                <motion.span
                                    className="absolute left-1/4 text-3xl"
                                    animate={{
                                        x: [-10, -30, -10],
                                        y: [5, -15, 5],
                                        rotate: [-10, 10, -10],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                    }}
                                >
                                    🦋
                                </motion.span>

                                <motion.span
                                    className="absolute right-1/4 text-3xl"
                                    animate={{
                                        x: [10, 30, 10],
                                        y: [5, -15, 5],
                                        rotate: [10, -10, 10],
                                    }}
                                    transition={{
                                        duration: 2.8,
                                        repeat: Number.POSITIVE_INFINITY,
                                    }}
                                >
                                    🦋
                                </motion.span>

                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
                                Let me know your feeling 🥹👉👈
                            </h1>

                            <p className="text-white/50 text-sm mb-6">
                                Write whatever you honestly feel 💗
                            </p>

                            {/* Notebook */}
                            <div className="relative max-w-lg mx-auto">

                                <div className="relative bg-[#fffdf5] rounded-xl shadow-2xl overflow-hidden">

                                    {/* Red margin */}
                                    <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300/70" />

                                    {/* Notebook lines */}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-40"
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #93c5fd 32px)",
                                        }}
                                    />

                                    <textarea
                                        value={feeling}
                                        onChange={(e) =>
                                            setFeeling(e.target.value)
                                        }
                                        placeholder="Write your feelings here..."
                                        className="relative z-10 w-full min-h-[280px] resize-none bg-transparent text-gray-800 text-base leading-8 pl-12 pr-6 py-5 outline-none"
                                    />

                                </div>

                            </div>

                            {/* Submit */}
                            <motion.button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!feeling.trim()}
                                whileHover={
                                    feeling.trim()
                                        ? {
                                              scale: 1.05,
                                          }
                                        : {}
                                }
                                whileTap={
                                    feeling.trim()
                                        ? {
                                              scale: 0.95,
                                          }
                                        : {}
                                }
                                className={`mt-7 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all ${
                                    feeling.trim()
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                        : "bg-white/10 text-white/30 cursor-not-allowed"
                                }`}
                            >
                                Submit 💌
                            </motion.button>

                        </motion.div>
                    )}

                    {/* ================= THANK YOU ================= */}

                    {submitted && (
                        <motion.div
                            key="thankyou"
                            initial={{
                                opacity: 0,
                                scale: 0.75,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                            className="min-h-[70vh] flex flex-col items-center justify-center text-center relative overflow-hidden"
                        >

                            {/* Flying butterflies */}
                            {[0, 1, 2, 3, 4, 5].map(
                                (item) => (
                                    <motion.div
                                        key={item}
                                        className="absolute text-2xl"
                                        initial={{
                                            x: 0,
                                            y: 100,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            x:
                                                (item % 2 === 0
                                                    ? -1
                                                    : 1) *
                                                (80 + item * 35),
                                            y:
                                                -180 -
                                                item * 30,
                                            opacity: [
                                                0,
                                                1,
                                                1,
                                                0,
                                            ],
                                            rotate: [
                                                0,
                                                20,
                                                -20,
                                                0,
                                            ],
                                        }}
                                        transition={{
                                            duration:
                                                3 +
                                                item * 0.2,
                                            delay:
                                                item * 0.15,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                        }}
                                    >
                                        🦋
                                    </motion.div>
                                )
                            )}

                            <motion.div
                                className="text-7xl mb-6"
                                animate={{
                                    scale: [1, 1.15, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                }}
                            >
                                💝
                            </motion.div>

                            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                                Thank you for your opinion 🥰💝
                            </h1>

                            <p className="text-white/70 max-w-md leading-relaxed">
                                Your words mean more than you know. 🥹
                            </p>

                            {/* WhatsApp Button */}
                            <motion.button
                                type="button"
                                onClick={sendToWhatsApp}
                                whileHover={{
                                    scale: 1.06,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-xl"
                            >
                                Send to WhatsApp 💚
                            </motion.button>

                            {whatsappSent && (
                                <motion.p
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className="mt-4 text-green-300 text-sm"
                                >
                                    WhatsApp opened with your message 💚
                                </motion.p>
                            )}

                            <motion.div
                                className="mt-7 text-3xl"
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                }}
                            >
                                🦋 💗 🦋
                            </motion.div>

                        </motion.div>
                    )}

                </AnimatePresence>

            </div>

        </ScreenContainer>
    )
}
