/* Official Shiv Tatva programs — see assets/brochures/ */
export const COURSES = {
  java: {
    id: 'java', emoji: '☕', thumb: 'cc-java', cat: 'Full Stack',
    name: 'Java Full Stack Development', heroTitle: 'Java Full Stack Engineer',
    duration: '6 Months', rating: '4.9', students: '1,240',
    brochure: 'assets/brochures/java-full-stack.pdf',
    desc: 'Core Java, Spring Boot, React, databases, and deployment — full stack as per our official Java brochure.',
    totalMonths: 6,
    tierMonths: { basic: 6, pro: 6, premium: 6 },
    tierModules: {
      basic: ['Core Java & OOP', 'SQL & JDBC Fundamentals'],
      pro: ['Core Java & OOP', 'MySQL & Hibernate', 'Spring Boot & REST APIs', 'React.js Essentials'],
      premium: ['Core Java & OOP', 'Spring Boot & Microservices', 'REST APIs & JWT Auth', 'React.js Frontend', 'MySQL & JPA', 'DevOps & Cloud Deploy']
    },
    tierIncludes: {
      basic: ['6 Months Live Training', 'Core Java Modules', 'SQL Basics', 'Recorded Sessions', 'Course Certificate', 'Community Support'],
      pro: ['6 Months Live Training', 'Everything in Basic', 'Spring Boot + React', '4 Assignments', 'Mock Interviews (2)'],
      premium: ['6 Months Full Curriculum', '10+ Live Projects', 'Cloud Deployment', '1-on-1 Mentorship', 'Lifetime Recordings']
    },
    outcomes: ['Enterprise Java full stack developer', 'Production-ready project portfolio', 'Placement-ready certification']
  },
  python: {
    id: 'python', emoji: '🐍', thumb: 'cc-python', cat: 'Full Stack',
    name: 'Python Full Stack Development', heroTitle: 'Python Full Stack Engineer',
    duration: '6 Months', rating: '4.8', students: '980',
    brochure: 'assets/brochures/python-full-stack.pdf',
    desc: 'Python, Django/Flask, databases, and frontend integration — aligned with our Python Full Stack brochure.',
    totalMonths: 6,
    tierMonths: { basic: 6, pro: 6, premium: 6 },
    tierModules: {
      basic: ['Python Fundamentals', 'PostgreSQL Basics'],
      pro: ['Python & OOP', 'Django REST Framework', 'Flask APIs & PostgreSQL'],
      premium: ['Python Fundamentals', 'Django & REST Framework', 'Flask APIs', 'PostgreSQL', 'React Integration', 'Cloud Deploy & Capstone']
    },
    tierIncludes: {
      basic: ['6 Months Training', 'Python Core Modules', 'Database Intro', 'Recordings', 'Certificate'],
      pro: ['6 Months Training', 'Basic + Django/Flask', '3 Projects', 'Mentor Q&A'],
      premium: ['6 Months Full Stack', 'All Modules', '8+ Projects', 'React Integration', 'Lifetime Access']
    },
    outcomes: ['Full stack Python developer', '8+ portfolio projects', 'Industry-ready certification']
  },
  cloud: {
    id: 'cloud', emoji: '☁️', thumb: 'cc-cloud', cat: 'Cloud Computing',
    name: 'Cloud Computing', heroTitle: 'Cloud Engineer',
    duration: '6 Months', rating: '4.9', students: '760',
    brochure: 'assets/brochures/cloud-computing.pdf',
    desc: 'AWS, Azure fundamentals, networking, storage, and cloud architecture — per Cloud Computing brochure.',
    totalMonths: 6,
    tierMonths: { basic: 6, pro: 6, premium: 6 },
    tierModules: {
      basic: ['Cloud Fundamentals', 'IAM & Virtual Machines'],
      pro: ['Cloud Fundamentals', 'AWS / Azure Core Services', 'VPC, Storage & Monitoring'],
      premium: ['Cloud Fundamentals', 'Compute & Networking', 'Storage & Security', 'Serverless & Containers', 'Multi-cloud & Certification Prep']
    },
    tierIncludes: {
      basic: ['6 Months Training', 'Cloud Console Labs', 'Concepts & Certificate'],
      pro: ['4 Months Training', 'Hands-on Labs', 'Practice Quizzes'],
      premium: ['6 Months Full Program', 'Certification Exam Prep', 'Mock Exams', 'Cloud Role Placement Prep']
    },
    outcomes: ['Design scalable cloud solutions', 'Cloud certification readiness', 'Cloud engineer job readiness']
  },
  ai: {
    id: 'ai', emoji: '🤖', thumb: 'cc-ai', cat: 'AI & ML',
    name: 'AI & Machine Learning', heroTitle: 'AI / ML Engineer',
    duration: '6 Months', rating: '4.9', students: '720',
    brochure: 'assets/brochures/ai-ml.pdf',
    desc: 'Machine learning, deep learning, NLP, and model deployment — per AI & ML brochure.',
    totalMonths: 6,
    tierMonths: { basic: 6, pro: 6, premium: 6 },
    tierModules: {
      basic: ['ML Foundations', 'Python for ML'],
      pro: ['ML Foundations', 'Deep Learning', 'TensorFlow Basics'],
      premium: ['ML Foundations', 'Deep Learning', 'TensorFlow & PyTorch', 'NLP', 'Computer Vision', 'MLOps Basics']
    },
    tierIncludes: {
      basic: ['6 Months Training', 'ML Labs', 'Certificate'],
      pro: ['6 Months Training', 'Deep Learning Projects', 'GPU Lab Access'],
      premium: ['6 Months Full Program', '7+ AI Projects', 'MLOps & Deploy', 'Capstone', 'AI Role Placement']
    },
    outcomes: ['Build and deploy ML models', 'AI engineer career path', 'Capstone project experience']
  },
  cyber: {
    id: 'cyber', emoji: '🛡️', thumb: 'cc-cyber', cat: 'Cyber Security',
    name: 'Cyber Security', heroTitle: 'Cyber Security Analyst',
    duration: '6 Months', rating: '4.8', students: '540',
    brochure: 'assets/brochures/cyber-security.pdf',
    desc: 'Ethical hacking, network security, SOC basics, and security tools — per Cyber Security brochure.',
    totalMonths: 6,
    tierMonths: { basic: 6, pro: 6, premium: 6 },
    tierModules: {
      basic: ['Security Fundamentals', 'Networking for Security'],
      pro: ['Security Fundamentals', 'Ethical Hacking Intro', 'Vulnerability Assessment'],
      premium: ['Security Fundamentals', 'Ethical Hacking', 'SOC & SIEM', 'Penetration Testing', 'Compliance & Cert Prep']
    },
    tierIncludes: {
      basic: ['6 Months Training', 'Security Labs', 'Certificate'],
      pro: ['6 Months Training', 'Hands-on Security Labs', 'Mentor Q&A'],
      premium: ['6 Months Full Program', 'Capstone Security Project', 'Certification Guidance', 'Security Role Placement Prep']
    },
    outcomes: ['Security analyst skillset', 'Hands-on lab portfolio', 'Cyber security career readiness']
  },
  sap: {
    id: 'sap', emoji: '📊', thumb: 'cc-sap', cat: 'Enterprise ERP',
    name: 'SAP FICO & HANA', heroTitle: 'SAP FICO Consultant',
    duration: '6 Months', rating: '4.7', students: '380',
    brochure: 'assets/brochures/sap-fico-hana.pdf',
    desc: 'SAP FI/CO modules, S/4HANA basics, and real-time reporting — per SAP FICO & HANA brochure.',
    totalMonths: 6,
    tierMonths: { basic: 6, pro: 6, premium: 6 },
    tierModules: {
      basic: ['SAP Navigation & FI Basics', 'GL & AP/AR Overview'],
      pro: ['SAP FI/CO Core', 'Asset Accounting & Controlling', 'Integration Scenarios'],
      premium: ['SAP FI/CO Advanced', 'S/4HANA Overview', 'Fiori & Reporting', 'SAP HANA Basics', 'Implementation Project']
    },
    tierIncludes: {
      basic: ['6 Months Training', 'SAP Sandbox Access', 'Certificate'],
      pro: ['6 Months Training', 'FI/CO Case Studies', 'Mentor Support'],
      premium: ['6 Months Full Program', 'S/4HANA Labs', 'Implementation Project', 'SAP Career Placement Prep']
    },
    outcomes: ['SAP FICO consultant skills', 'S/4HANA awareness', 'ERP career readiness']
  },
  salesforce: {
    id: 'salesforce', emoji: '⚡', thumb: 'cc-salesforce', cat: 'CRM',
    name: 'Salesforce', heroTitle: 'Salesforce Developer',
    duration: '6 Months', rating: '4.8', students: '460',
    brochure: 'assets/brochures/salesforce.pdf',
    desc: 'Salesforce Admin, Apex, Lightning, and CRM workflows — per Salesforce brochure.',
    totalMonths: 6,
    tierMonths: { basic: 6, pro: 6, premium: 6 },
    tierModules: {
      basic: ['Salesforce Fundamentals', 'Objects & Security Model'],
      pro: ['Admin Essentials', 'Flows & Automation', 'Reports & Dashboards'],
      premium: ['Admin Advanced', 'Apex & Triggers', 'Lightning Web Components', 'Integration & Cert Prep']
    },
    tierIncludes: {
      basic: ['6 Months Training', 'Trailhead-style Labs', 'Certificate'],
      pro: ['6 Months Training', 'Admin + Automation Projects'],
      premium: ['6 Months Full Program', 'Developer Track', 'Certification Prep', 'CRM Role Placement Prep']
    },
    outcomes: ['Salesforce Admin/Developer skills', 'CRM implementation experience', 'Salesforce career readiness']
  }
};
