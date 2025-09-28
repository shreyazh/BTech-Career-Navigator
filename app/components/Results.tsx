import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function Results({ results }) {
  const [selectedCareer, setSelectedCareer] = useState(results.recommendations[0])

  const totalScore = Object.values(results.interests).reduce((a: number, b: number) => a + b, 0)

  const roadmaps = {
    'Software Development': 'https://roadmap.sh/frontend',
    'Data Science': 'https://roadmap.sh/python',
    'Cybersecurity': 'https://roadmap.sh/cyber-security',
    'AI/Machine Learning': 'https://roadmap.sh/ai-data-scientist',
    'Cloud Computing': 'https://roadmap.sh/devops',
    'Quantum Computing': 'https://roadmap.sh/quantum-computing',
    'Bioinformatics/Health Tech': 'https://roadmap.sh/software-architect',
    'Blockchain/Web3': 'https://roadmap.sh/blockchain',
    'UI/UX Design': 'https://roadmap.sh/ux-design',
    'Game Development': 'https://roadmap.sh/game-developer',
    '3D Modeling and Animation': 'https://roadmap.sh/3d-graphics',
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-4 border-green-800">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Your Career Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-green-700">Interest Breakdown</h3>
          {Object.entries(results.interests).map(([career, score]) => (
            <div key={career} className="mb-2">
              <div className="flex justify-between mb-1">
                <span>{career}</span>
                <span>{((score as number) / totalScore * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(score as number) / totalScore * 100} className="h-2" />
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-green-700">Top Recommendations</h3>
          <div className="space-y-2">
            {results.recommendations.map((rec) => (
              <Button
                key={rec.career}
                onClick={() => setSelectedCareer(rec)}
                variant={selectedCareer.career === rec.career ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                {rec.career}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-green-700">{selectedCareer.career} Career Path</h3>
        <p className="mb-4">{selectedCareer.description}</p>
        <h4 className="text-xl font-bold mb-2 text-green-600">Key Skills:</h4>
        <ul className="list-disc list-inside mb-4">
          {selectedCareer.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h4 className="text-xl font-bold mb-2 text-green-600">Ye Karlo Parth, Kalyan Nishchit Hai:</h4>
        <ul className="list-disc list-inside mb-4">
          {selectedCareer.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <p className="mb-4"><strong>Estimated Time to Proficiency:</strong> {selectedCareer.timeEstimate}</p>
        <h4 className="text-xl font-bold mb-2 text-green-600">Kyu Karu Mai Ye:</h4>
        <p className="mb-4">{selectedCareer.whyPursue}</p>
        <a
          href={roadmaps[selectedCareer.career]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          View Detailed Roadmap
        </a>
      </div>
    </div>
  )
}

