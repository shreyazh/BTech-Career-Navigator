type Answer = string | string[];
type Answers = Record<string, Answer>;

interface CareerRecommendation {
  career: string;
  description: string;
  skills: string[];
  nextSteps: string[];
  timeEstimate: string;
  whyPursue: string;
}

export function analyzeResponses(answers: Answers): {
  interests: Record<string, number>;
  recommendations: CareerRecommendation[];
} {
  const interests: Record<string, number> = {
    'Software Development': 0,
    'Data Science': 0,
    'Cybersecurity': 0,
    'AI/Machine Learning': 0,
    'Cloud Computing': 0,
    'Quantum Computing': 0,
    'Bioinformatics/Health Tech': 0,
    'Blockchain/Web3': 0,
    'UI/UX Design': 0,
    'Game Development': 0,
    '3D Modeling and Animation': 0,
    'IoT/Robotics': 0,
  };

  // Analyze favorite subjects and exam scores
  const subjectScoreMap = {
    'Mathematics': ['Software Development', 'Data Science', 'AI/Machine Learning', 'Quantum Computing'],
    'Computer Science': ['Software Development', 'Data Science', 'AI/Machine Learning', 'Blockchain/Web3'],
    'Biology': ['Bioinformatics/Health Tech'],
    'Chemistry': ['Bioinformatics/Health Tech'],
    'Art/Design': ['UI/UX Design', 'Game Development', '3D Modeling and Animation'],
    'Physics': ['Quantum Computing', 'IoT/Robotics']
  };

  ['favSubject10th', 'favSubject12th', 'examScores'].forEach(key => {
    const subject = answers[key] as string;
    if (subjectScoreMap[subject]) {
      subjectScoreMap[subject].forEach(career => {
        interests[career] += key === 'examScores' ? 2 : 1;
      });
    }
  });

  // Analyze tech interests
  const techInterests = answers.techInterests as string[];
  const techInterestMap = {
    'Web Development': 'Software Development',
    'Mobile App Development': 'Software Development',
    'Data Science': 'Data Science',
    'Cybersecurity': 'Cybersecurity',
    'Artificial Intelligence': 'AI/Machine Learning',
    'Cloud Computing': 'Cloud Computing',
    'Quantum Computing': 'Quantum Computing',
    'Bioinformatics and Health Tech': 'Bioinformatics/Health Tech',
    'Blockchain/Web3': 'Blockchain/Web3',
    'UI/UX Design': 'UI/UX Design',
    'Game Development': 'Game Development',
    '3D Modeling and Animation': '3D Modeling and Animation',
    'Internet of Things (IoT)': 'IoT/Robotics',
    'Robotics': 'IoT/Robotics'
  };

  techInterests?.forEach(interest => {
    if (techInterestMap[interest]) {
      interests[techInterestMap[interest]] += 3;
    }
  });

  // Analyze emerging fields interest
  const emergingFields = answers.emergingFieldsInterest as string[];
  const emergingFieldsMap = {
    'Quantum Computing': 'Quantum Computing',
    'Blockchain/Web3': 'Blockchain/Web3',
    'Artificial Intelligence/Machine Learning': 'AI/Machine Learning',
    'AR/VR (Augmented/Virtual Reality)': ['Game Development', '3D Modeling and Animation'],
    'Cybersecurity (Quantum-safe systems)': 'Cybersecurity',
    'Green Technology': ['Bioinformatics/Health Tech', 'Software Development'],
    'Space Technology': ['Software Development', 'AI/Machine Learning'],
    'Bioinformatics and Health Tech': 'Bioinformatics/Health Tech',
    'Digital Twin Technology': ['AI/Machine Learning', 'IoT/Robotics'],
    'Edge Computing': ['Cloud Computing', 'AI/Machine Learning'],
    'Generative AI': 'AI/Machine Learning',
    'Metaverse': ['Game Development', 'UI/UX Design']
  };

  emergingFields?.forEach(field => {
    if (emergingFieldsMap[field]) {
      if (Array.isArray(emergingFieldsMap[field])) {
        emergingFieldsMap[field].forEach(career => interests[career] += 2);
      } else {
        interests[emergingFieldsMap[field]] += 2;
      }
    }
  });

  // Analyze extracurricular activities
  const extracurricular = answers.extracurricularActivities as string[];
  const extracurricularMap = {
    'Coding Competitions': ['Software Development', 'AI/Machine Learning'],
    'Entrepreneurship/Startup Initiatives': Object.keys(interests),
    'Design Competitions': ['UI/UX Design', 'Game Development', '3D Modeling and Animation']
  };

  extracurricular?.forEach(activity => {
    if (extracurricularMap[activity]) {
      if (Array.isArray(extracurricularMap[activity])) {
        extracurricularMap[activity].forEach(career => interests[career] += 2);
      } else {
        extracurricularMap[activity].forEach(career => interests[career] += 1);
      }
    }
  });

  // Analyze programming experience
  if (answers.programmingExperience === 'Advanced (worked on complex projects or in teams)') {
    Object.keys(interests).forEach(key => interests[key] += 1);
  }

  // Generate recommendations based on top interests
  const sortedInterests = Object.entries(interests).sort((a, b) => b[1] - a[1]);
  const threshold = sortedInterests[0][1] * 0.6; // 60% of the highest score
  const recommendations: CareerRecommendation[] = sortedInterests
    .filter(([, score]) => score >= threshold)
    .map(([career]) => {
      switch (career) {
        case 'Software Development':
          return {
            career: 'Software Development',
            description: 'Design, develop, and maintain software applications and systems.',
            skills: ['Programming languages (e.g., Java, Python, JavaScript)', 'Web technologies', 'Version control (e.g., Git)', 'Software architecture', 'Agile methodologies'],
            nextSteps: [
              'Master a programming language (e.g., Python, JavaScript) - 2-3 months',
              'Learn web development basics (HTML, CSS, JavaScript) - 1-2 months',
              'Study software design patterns and architecture - 2-3 months',
              'Build a portfolio of projects (e.g., web apps, mobile apps) - 3-4 months',
              'Contribute to open-source projects on GitHub - Ongoing',
              'Practice data structures and algorithms - 2-3 months',
              'Learn a backend framework (e.g., Node.js, Django) - 2-3 months',
              'Study databases and SQL - 1-2 months',
              'Familiarize yourself with cloud platforms (e.g., AWS, Azure) - 1-2 months'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: 'Software development is a high-demand field with diverse applications across industries. It offers opportunities for creativity, problem-solving, and continuous learning. With the rapid advancement of technology, software developers play a crucial role in shaping the digital future.'
          };
        case 'Data Science':
          return {
            career: 'Data Science',
            description: 'Analyze large datasets to extract insights and solve complex problems.',
            skills: ['Programming languages (e.g., Python, R)', 'Statistical analysis', 'Machine learning', 'Data visualization', 'Data mining'],
            nextSteps: [
              'Learn Python or R programming language - 2-3 months',
              'Study statistical methods and probability - 2-3 months',
              'Learn machine learning algorithms - 3-4 months',
              'Practice data visualization techniques - 1-2 months',
              'Work on data analysis projects - 3-4 months',
              'Learn data mining techniques - 2-3 months',
              'Explore cloud computing platforms for data analysis - 1-2 months'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: 'Data science is a rapidly growing field with applications across various industries. It offers opportunities to work with cutting-edge technologies and make a significant impact on businesses and society.'
          };
        case 'Cybersecurity':
          return {
            career: 'Cybersecurity',
            description: 'Protect computer systems and networks from cyber threats.',
            skills: ['Networking', 'Security protocols', 'Ethical hacking', 'Incident response', 'Security auditing'],
            nextSteps: [
              'Learn networking fundamentals - 2-3 months',
              'Study security protocols and cryptography - 2-3 months',
              'Practice ethical hacking techniques - 3-4 months',
              'Learn incident response procedures - 2-3 months',
              'Obtain relevant certifications (e.g., CompTIA Security+, CEH) - 6-12 months',
              'Gain experience through internships or volunteer work - Ongoing'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: 'Cybersecurity is a critical field with increasing demand due to the growing number of cyber threats. It offers opportunities to protect sensitive information and ensure the safety of computer systems.'
          };
        case 'AI/Machine Learning':
          return {
            career: 'AI/Machine Learning',
            description: 'Develop intelligent systems that can learn and adapt.',
            skills: ['Programming languages (e.g., Python)', 'Machine learning algorithms', 'Deep learning', 'Natural language processing', 'Computer vision'],
            nextSteps: [
              'Learn Python programming language - 2-3 months',
              'Study machine learning algorithms - 3-4 months',
              'Learn deep learning frameworks (e.g., TensorFlow, PyTorch) - 3-4 months',
              'Practice natural language processing and computer vision - 3-4 months',
              'Work on AI/ML projects - 3-4 months',
              'Explore cloud computing platforms for AI/ML - 1-2 months'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: 'AI/Machine learning is a rapidly evolving field with transformative potential across industries. It offers opportunities to work on cutting-edge technologies and solve complex problems.'
          };
        case 'Cloud Computing':
          return {
            career: 'Cloud Computing',
            description: 'Manage and maintain cloud-based infrastructure and applications.',
            skills: ['Cloud platforms (e.g., AWS, Azure, GCP)', 'Networking', 'Virtualization', 'Security', 'Automation'],
            nextSteps: [
              'Learn cloud computing fundamentals - 1-2 months',
              'Choose a cloud platform (e.g., AWS, Azure, GCP) and obtain certifications - 6-12 months',
              'Practice cloud-based infrastructure management - 3-4 months',
              'Learn automation tools (e.g., Terraform, Ansible) - 2-3 months',
              'Gain experience through internships or projects - Ongoing'
            ],
            timeEstimate: '6-12 months for entry-level proficiency, 1-2 years for mid-level expertise',
            whyPursue: 'Cloud computing is a rapidly growing field with high demand for skilled professionals. It offers opportunities to work with cutting-edge technologies and manage large-scale systems.'
          };
        case 'Quantum Computing':
          return {
            career: 'Quantum Computing',
            description: 'Develop and utilize quantum computers to solve complex problems.',
            skills: ['Linear algebra', 'Quantum mechanics', 'Quantum algorithms', 'Quantum programming languages', 'Quantum hardware'],
            nextSteps: [
              'Learn linear algebra and quantum mechanics - 6-12 months',
              'Study quantum algorithms and complexity theory - 3-4 months',
              'Learn quantum programming languages (e.g., Qiskit, Cirq) - 3-4 months',
              'Explore quantum hardware architectures - 2-3 months',
              'Work on quantum computing projects - Ongoing'
            ],
            timeEstimate: '18-24 months for entry-level proficiency, 3-5 years for mid-level expertise',
            whyPursue: 'Quantum computing is a rapidly emerging field with the potential to revolutionize various industries. It offers opportunities to work on cutting-edge technologies and solve previously unsolvable problems.'
          };
        case 'Bioinformatics/Health Tech':
          return {
            career: 'Bioinformatics/Health Tech',
            description: 'Apply computational techniques to biological data to improve healthcare.',
            skills: ['Programming languages (e.g., Python, R)', 'Bioinformatics tools', 'Genomics', 'Proteomics', 'Machine learning'],
            nextSteps: [
              'Learn Python or R programming language - 2-3 months',
              'Study bioinformatics tools and techniques - 3-4 months',
              'Learn genomics and proteomics - 3-4 months',
              'Explore machine learning applications in bioinformatics - 2-3 months',
              'Work on bioinformatics projects - Ongoing'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: 'Bioinformatics/Health tech is a rapidly growing field with significant potential to improve healthcare. It offers opportunities to work on cutting-edge technologies and make a positive impact on society.'
          };
        case 'Blockchain/Web3':
          return {
            career: 'Blockchain/Web3',
            description: 'Develop and implement blockchain-based applications and systems.',
            skills: ['Solidity', 'Ethereum', 'Smart contracts', 'Decentralized applications (dApps)', 'Cryptography'],
            nextSteps: [
              'Learn Solidity programming language - 2-3 months',
              'Study Ethereum blockchain technology - 2-3 months',
              'Develop smart contracts - 3-4 months',
              'Build decentralized applications (dApps) - 3-4 months',
              'Explore other blockchain platforms - Ongoing'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: 'Blockchain/Web3 is a rapidly evolving field with significant potential to disrupt various industries. It offers opportunities to work on cutting-edge technologies and build innovative applications.'
          };
        case 'UI/UX Design':
          return {
            career: 'UI/UX Design',
            description: 'Design user interfaces and user experiences for websites and applications.',
            skills: ['User research', 'Wireframing', 'Prototyping', 'Visual design', 'Interaction design'],
            nextSteps: [
              'Learn user research methods - 2-3 months',
              'Practice wireframing and prototyping - 2-3 months',
              'Develop visual design skills - 2-3 months',
              'Study interaction design principles - 2-3 months',
              'Build a portfolio of design projects - Ongoing'
            ],
            timeEstimate: '6-12 months for entry-level proficiency, 1-2 years for mid-level expertise',
            whyPursue: 'UI/UX design is a high-demand field with opportunities to create user-friendly and engaging interfaces. It offers opportunities to combine creativity and technical skills to improve user experiences.'
          };
        case 'Game Development':
          return {
            career: 'Game Development',
            description: 'Develop video games for various platforms.',
            skills: ['Game engines (e.g., Unity, Unreal Engine)', 'Programming languages (e.g., C#, C++)', 'Game design', 'Level design', '3D modeling'],
            nextSteps: [
              'Learn a game engine (e.g., Unity, Unreal Engine) - 3-4 months',
              'Learn a programming language (e.g., C#, C++) - 3-4 months',
              'Study game design principles - 2-3 months',
              'Practice level design - 2-3 months',
              'Learn 3D modeling and animation - 3-4 months',
              'Develop a game portfolio - Ongoing'
            ],
            timeEstimate: '18-24 months for entry-level proficiency, 3-5 years for mid-level expertise',
            whyPursue: 'Game development is a creative and challenging field with opportunities to work on exciting projects. It offers opportunities to combine creativity and technical skills to create engaging and immersive experiences.'
          };
        case '3D Modeling and Animation':
          return {
            career: '3D Modeling and Animation',
            description: 'Create 3D models and animations for various applications.',
            skills: ['3D modeling software (e.g., Blender, Maya)', 'Animation software (e.g., Blender, Maya)', 'Texturing', 'Lighting', 'Rendering'],
            nextSteps: [
              'Learn 3D modeling software - 3-4 months',
              'Learn animation software - 3-4 months',
              'Practice texturing, lighting, and rendering - 3-4 months',
              'Build a portfolio of 3D models and animations - Ongoing'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: '3D modeling and animation is a creative and in-demand field with applications across various industries. It offers opportunities to combine artistic talent and technical skills to create visually stunning content.'
          };
        case 'IoT/Robotics':
          return {
            career: 'IoT/Robotics',
            description: 'Develop and implement internet of things (IoT) devices and robotic systems.',
            skills: ['Embedded systems', 'Microcontrollers', 'Sensors', 'Actuators', 'Robotics programming'],
            nextSteps: [
              'Learn embedded systems programming - 3-4 months',
              'Work with microcontrollers (e.g., Arduino, ESP32) - 3-4 months',
              'Learn about sensors and actuators - 2-3 months',
              'Study robotics programming and control systems - 3-4 months',
              'Develop IoT and robotics projects - Ongoing'
            ],
            timeEstimate: '12-18 months for entry-level proficiency, 2-3 years for mid-level expertise',
            whyPursue: 'IoT/Robotics is a rapidly growing field with significant potential to transform various industries. It offers opportunities to work on cutting-edge technologies and create innovative solutions.'
          };
      }
    });

  return { interests, recommendations };
}

