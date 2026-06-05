"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from "lucide-react";
import Link from "next/link";

const quizData = [
  {
    id: 1,
    question: "¿Cuál es el saludo principal en idioma Miskitu?",
    options: ["Naksa", "Hola", "Buenos días", "Tingni"],
    correctAnswer: 0,
    feedback: "'Naksa' es el saludo tradicional Miskitu equivalente a 'Hola' o '¿Cómo estás?'."
  },
  {
    id: 2,
    question: "¿En qué región de Nicaragua se concentran principalmente las comunidades Miskitu?",
    options: ["Pacífico", "Centro", "Caribe Norte (RACCN)", "Caribe Sur (RACCS)"],
    correctAnswer: 2,
    feedback: "La mayoría de la población Miskitu habita en la Región Autónoma de la Costa Caribe Norte (RACCN)."
  },
  {
    id: 3,
    question: "¿Qué significa 'Yapti' en Miskitu?",
    options: ["Tierra", "Madre", "Agua", "Cielo"],
    correctAnswer: 1,
    feedback: "'Yapti' significa Madre. Yapti Tasba significa 'Madre Tierra'."
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const percentage = Math.round((score / quizData.length) * 100);

  const getRecommendation = () => {
    if (percentage === 100) return "¡Excelente! Has dominado el material. Puedes continuar al Módulo 2.";
    if (percentage >= 66) return "¡Muy bien! Tienes un buen dominio. Puedes repasar la Lección 2 para alcanzar la perfección.";
    return "Te sugerimos repasar la Lección 1 y 2 antes de continuar.";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      {!showResults ? (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Pregunta {currentQuestion + 1} de {quizData.length}
            </span>
            <span className="text-sm font-medium text-slate-500">
              Evaluación de Módulo
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
            {quizData[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {quizData[currentQuestion].options.map((option, index) => {
              const isCorrect = index === quizData[currentQuestion].correctAnswer;
              const isSelected = selectedAnswer === index;
              
              let buttonStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300";
              let icon = null;

              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = "bg-emerald-50 border-emerald-200 text-emerald-800 ring-2 ring-emerald-500 ring-offset-2";
                  icon = <CheckCircle2 className="w-6 h-6 text-emerald-600 ml-auto" />;
                } else if (isSelected && !isCorrect) {
                  buttonStyle = "bg-red-50 border-red-200 text-red-800 ring-2 ring-red-500 ring-offset-2";
                  icon = <XCircle className="w-6 h-6 text-red-600 ml-auto" />;
                } else {
                  buttonStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                }
              } else if (isSelected) {
                buttonStyle = "bg-primary/5 border-primary text-primary ring-2 ring-primary ring-offset-2";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={isAnswered}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-medium text-lg transition-all flex items-center ${buttonStyle}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm ${isAnswered && (isCorrect || isSelected) ? 'bg-white' : 'bg-white border-2 border-slate-200'}`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {icon}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-8 overflow-hidden"
              >
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-800 mb-8">
                  <p className="font-semibold mb-1">Retroalimentación:</p>
                  <p>{quizData[currentQuestion].feedback}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/20"
                  >
                    {currentQuestion === quizData.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          
          <div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-inner">
            <Award className="w-12 h-12 text-amber-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2">¡Evaluación Completada!</h2>
          <p className="text-slate-500 mb-8">{getRecommendation()}</p>
          
          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-primary mb-1">{percentage}%</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Puntuación</p>
            </div>
            <div className="w-px h-16 bg-slate-200" />
            <div className="text-center">
              <p className="text-5xl font-extrabold text-slate-900 mb-1">{score}/{quizData.length}</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Correctas</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setIsAnswered(false);
                setScore(0);
                setShowResults(false);
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reintentar
            </button>
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              Volver al Inicio
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
