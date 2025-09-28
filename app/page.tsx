'use client'

import { useState } from 'react'
import { questions } from './questions.ts'
import { analyzeResponses } from './careerAnalysis.ts'
import SurveyForm from './components/SurveyForm'
import Results from './components/Results'

export default function Home() {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [results, setResults] = useState<any>(null)

  const handleSubmit = () => {
    const analysisResults = analyzeResponses(answers)
    setResults(analysisResults)
  }

  return (
    <div className="min-h-screen bg-yellow-100 text-black font-mono p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-green-800">Thoda Guide Kardo Bhai</h1>
        <p className="text-xl text-green-600">By Shreyash Srivastva</p>
      </header>
      {!results ? (
        <SurveyForm questions={questions} answers={answers} setAnswers={setAnswers} onSubmit={handleSubmit} />
      ) : (
        <Results results={results} />
      )}
    </div>
  )
}

