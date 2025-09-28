import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function SurveyForm({ questions, answers, setAnswers, onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onSubmit()
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border-4 border-green-800">
      <h2 className="text-2xl font-bold mb-4 text-green-800">{question.question}</h2>
      {question.type === 'radio' && (
        <RadioGroup
          onValueChange={(value) => handleAnswer(question.id, value)}
          value={answers[question.id] as string}
        >
          {question.options.map((option) => (
            <div key={option} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
      {question.type === 'checkbox' && (
        <div>
          {question.options.map((option) => (
            <div key={option} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={option}
                checked={(answers[question.id] as string[])?.includes(option)}
                onCheckedChange={(checked) => {
                  const currentAnswers = answers[question.id] as string[] || []
                  const newAnswers = checked
                    ? [...currentAnswers, option]
                    : currentAnswers.filter((a) => a !== option)
                  handleAnswer(question.id, newAnswers)
                }}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </div>
      )}
      <Button
        onClick={handleNext}
        className="mt-4 bg-green-800 hover:bg-green-700 text-white"
        disabled={!answers[question.id]}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
      </Button>
    </div>
  )
}

