/* Certification programs — same 7 tracks as full courses · ₹1,500 per program */
import { formatTotalDuration, parseLesson } from '../utils/curriculum.js';

export const CERT_PROGRAM_FEE = '₹1,500';

function week(w, topic, sub, lessons) {
    const subtopics = (lessons || [['📹', 'ti-video', topic, 'Live · 40 min']]).map(parseLesson);
    return {
      w,
      topic,
      sub,
      title: topic,
      subtitle: sub,
      subtopics,
      topics: lessons,
      duration: formatTotalDuration(subtopics)
    };
  }
function phase(num, title, desc, weekList, skills, skillsOrange) {
    const weeks = weekList.map((w, i) => week(i + 1, w[0], w[1], w[2]));
    const lessonCount = weeks.reduce((n, wk) => n + wk.subtopics.length, 0);
    const phaseDuration = formatTotalDuration(weeks.flatMap(wk => wk.subtopics));
    return {
      num, title, desc,
      tag: `${weeks.length} Weeks · ${lessonCount} Subtopics · ${phaseDuration}`,
      weeks,
      skills: skills || [title],
      skillsOrange: skillsOrange || [0]
    };
  }
function certBase(opts) {
    return {
      price: CERT_PROGRAM_FEE,
      oldPrice: '',
      discount: '',
      phaseLabel: 'Phase',
      brochure: opts.brochure || '',
      ...opts
    };
  }

export const CERT_CURRICULA = {
    java: certBase({
      id: 'java', emoji: '☕', thumb: 'crt-java', issuer: 'Shiv Tatva', examCode: 'Java Full Stack Cert',
      cat: 'Full Stack Training',
      title: 'Java Full Stack', titleEm: 'Training',
      heroDesc: 'Exam-oriented certification prep for Java Full Stack — aligned with our Java brochure. One flat program fee of ₹1,500.',
      duration: '4 Weeks', videos: '24+', projects: '2 Mock Tests', reviews: '4.9 (420 reviews)',
      stats: [['₹1,500', 'Program Fee'], ['4', 'Weeks'], ['2', 'Mock Tests'], ['📄', 'Study Kit'], ['🏅', 'Shiv Tatva Cert']],
      pills: ['☕ Core Java', '🌱 Spring Boot', '⚛️ React', '📋 Mock Tests', '📄 Materials'],
      includes: ['₹1,500 program fee (all-inclusive prep)', 'Live doubt sessions', 'Official-style mock tests', 'PDF study material & question bank', 'Resume tip sheet', 'Shiv Tatva certification on passing'],
      brochure: 'assets/brochures/java-full-stack.pdf',
      months: [
        phase(1, 'Core Java & OOP', 'Syntax, OOP, collections, and exam-style coding drills.', [
          ['Java Fundamentals', 'Types, control flow, OOP', [['📹', 'ti-video', 'Java Exam Syllabus Overview', 'Live · 45 min'], ['💻', 'ti-code', 'OOP & Collections Drill', 'Live · 40 min']]],
          ['Practice & Quiz', 'Topic-wise tests', [['📝', 'ti-quiz', 'Domain 1 Practice Test', 'Quiz']]]
        ], ['Core Java', 'OOP', 'Collections'], [0, 1]),
        phase(2, 'Spring Boot & APIs', 'REST, JPA, security basics for certification.', [
          ['Spring Boot', 'REST & data layer', [['💻', 'ti-code', 'Spring Boot Exam Scenarios', 'Live · 48 min']]],
          ['Integration', 'Full stack concepts', [['🧪', 'ti-lab', 'Lab: API Integration Review', 'Lab']]]
        ], ['Spring Boot', 'REST', 'JPA'], [0, 2]),
        phase(3, 'React & Full Stack Review', 'Frontend concepts and end-to-end exam scenarios.', [
          ['React Essentials', 'Components & hooks', [['📹', 'ti-video', 'React for Java Cert', 'Live · 40 min']]],
          ['Full Stack', 'Auth & deployment review', [['💻', 'ti-code', 'Full Stack Exam Scenarios', 'Live · 42 min']]]
        ], ['React', 'Full Stack'], [0, 1]),
        phase(4, 'Mock Tests & Certification', 'Timed mocks, review, and Shiv Tatva certification.', [
          ['Mock Exams', 'Full-length simulations', [['📝', 'ti-quiz', 'Mock Test 1', 'Mock Exam'], ['📝', 'ti-quiz', 'Mock Test 2 + Review', 'Mock Exam']]],
          ['Certification', 'Final assessment', [['📹', 'ti-video', 'Final Certification Exam Briefing', 'Live · 30 min'], ['🏗️', 'ti-project', 'Shiv Tatva Certification Assessment', 'Exam']]]
        ], ['Mock Tests', 'Certification', 'Exam Ready'], [1, 2])
      ]
    }),
    python: certBase({
      id: 'python', emoji: '🐍', thumb: 'crt-python', issuer: 'Shiv Tatva', examCode: 'Python Full Stack Cert',
      cat: 'Full Stack Training',
      title: 'Python Full Stack', titleEm: 'Training',
      heroDesc: 'Certification prep for Python Full Stack — Django, Flask, and APIs. Program fee ₹1,500 only.',
      duration: '4 Weeks', videos: '22+', projects: '2 Mock Tests', reviews: '4.8 (310 reviews)',
      stats: [['₹1,500', 'Program Fee'], ['4', 'Weeks'], ['2', 'Mock Tests'], ['📄', 'Study Kit'], ['🏅', 'Shiv Tatva Cert']],
      pills: ['🐍 Python', '🎯 Django', '⚡ Flask', '📋 Mocks', '📄 PDFs'],
      includes: ['₹1,500 program fee', 'Live classes & doubt sessions', '2 mock certification tests', 'Python + framework question bank', 'Placement tip sheet', 'Shiv Tatva certificate'],
      brochure: 'assets/brochures/python-full-stack.pdf',
      months: [
        phase(1, 'Python & OOP', 'Python core and exam-style problems.', [
          ['Python Core', 'Syntax to OOP', [['📹', 'ti-video', 'Python Cert Syllabus', 'Live · 40 min']]],
          ['Drills', 'Practice sets', [['📝', 'ti-quiz', 'Python Basics Test', 'Quiz']]]
        ], ['Python', 'OOP'], [0]),
        phase(2, 'Django & Flask', 'Web frameworks for certification.', [
          ['Frameworks', 'DRF & Flask APIs', [['💻', 'ti-code', 'Django/Flask Exam Topics', 'Live · 44 min']]]
        ], ['Django', 'Flask'], [0, 1]),
        phase(3, 'Databases & APIs', 'PostgreSQL, REST design, and integration review.', [
          ['Databases', 'ORM & queries', [['📹', 'ti-video', 'Python DB Exam Topics', 'Live · 38 min']]],
          ['API Review', 'Auth & testing', [['🧪', 'ti-lab', 'Lab: API Integration Drill', 'Lab']]]
        ], ['PostgreSQL', 'APIs'], [0, 2]),
        phase(4, 'Mocks & Certification', 'Assessments and certificate.', [
          ['Mocks', 'Timed tests', [['📝', 'ti-quiz', 'Mock Test 1', 'Mock Exam'], ['📝', 'ti-quiz', 'Mock Test 2', 'Mock Exam']]],
          ['Final', 'Certification exam', [['🏗️', 'ti-project', 'Shiv Tatva Certification Assessment', 'Exam']]]
        ], ['Mocks', 'Certification'], [1, 2])
      ]
    }),
    cloud: certBase({
      id: 'cloud', emoji: '☁️', thumb: 'crt-cloud', issuer: 'Shiv Tatva', examCode: 'Cloud Computing Cert',
      cat: 'Cloud Training',
      title: 'Cloud Computing', titleEm: 'Training',
      heroDesc: 'Cloud certification prep — AWS/Azure concepts, labs, and mocks. ₹1,500 program fee.',
      duration: '4 Weeks', videos: '18+', projects: '2 Mock Tests', reviews: '4.9 (280 reviews)',
      stats: [['₹1,500', 'Program Fee'], ['4', 'Weeks'], ['2', 'Mock Tests'], ['☁️', 'Cloud Labs'], ['🏅', 'Shiv Tatva Cert']],
      pills: ['☁️ Cloud', '🔐 IAM', '🌐 VPC', '📋 Mocks'],
      includes: ['₹1,500 program fee', 'Cloud concept live classes', 'Hands-on lab walkthroughs', '2 mock tests', 'Cheat sheets PDF', 'Shiv Tatva certificate'],
      brochure: 'assets/brochures/cloud-computing.pdf',
      months: [
        phase(1, 'Cloud Foundations', 'Models, IAM, core services.', [
          ['Cloud Basics', 'IAM & compute intro', [['📹', 'ti-video', 'Cloud Cert Overview', 'Live · 42 min'], ['🧪', 'ti-lab', 'Lab: Console Basics', 'Lab']]]
        ], ['Cloud', 'IAM'], [0]),
        phase(2, 'Architecture & Security', 'VPC, storage, security for exams.', [
          ['Architecture', 'VPC & HA patterns', [['💻', 'ti-code', 'Exam Architecture Scenarios', 'Live · 40 min']]]
        ], ['VPC', 'Security'], [0, 1]),
        phase(3, 'Serverless & Operations', 'Lambda, containers, and monitoring for cert exams.', [
          ['Serverless', 'Functions & API Gateway', [['📹', 'ti-video', 'Serverless Exam Topics', 'Live · 40 min']]],
          ['Ops', 'Monitoring & cost', [['🧪', 'ti-lab', 'Lab: Cloud Ops Review', 'Lab']]]
        ], ['Serverless', 'Monitoring'], [1, 2]),
        phase(4, 'Mocks & Certification', 'Practice exams and certification.', [
          ['Mocks', 'Cloud mock tests', [['📝', 'ti-quiz', 'Mock Test 1', 'Mock Exam'], ['📝', 'ti-quiz', 'Mock Test 2', 'Mock Exam']]],
          ['Certification', 'Final exam', [['🏗️', 'ti-project', 'Shiv Tatva Certification Assessment', 'Exam']]]
        ], ['Mocks', 'Certification'], [1, 2])
      ]
    }),
    ai: certBase({
      id: 'ai', emoji: '🤖', thumb: 'crt-ai', issuer: 'Shiv Tatva', examCode: 'AI & ML Cert',
      cat: 'AI & ML Training',
      title: 'AI & Machine Learning', titleEm: 'Training',
      heroDesc: 'AI & ML certification prep — ML foundations, models, and assessment. ₹1,500 per program.',
      duration: '4 Weeks', videos: '20+', projects: '2 Mock Tests', reviews: '4.9 (195 reviews)',
      stats: [['₹1,500', 'Program Fee'], ['4', 'Weeks'], ['2', 'Mock Tests'], ['🤖', 'ML Labs'], ['🏅', 'Shiv Tatva Cert']],
      pills: ['🤖 ML', '🧠 DL', '📊 Metrics', '📋 Mocks'],
      includes: ['₹1,500 program fee', 'ML/DL concept sessions', 'Notebook-based labs', '2 mock tests', 'AI interview question PDF', 'Shiv Tatva certificate'],
      brochure: 'assets/brochures/ai-ml.pdf',
      months: [
        phase(1, 'ML Foundations', 'Supervised learning and evaluation.', [
          ['ML Basics', 'Algorithms & metrics', [['📹', 'ti-video', 'ML Cert Syllabus', 'Live · 45 min']]]
        ], ['ML', 'Scikit-learn'], [0]),
        phase(2, 'Deep Learning Intro', 'Neural nets and frameworks overview.', [
          ['Deep Learning', 'TensorFlow/Keras basics', [['💻', 'ti-code', 'DL Exam Topics', 'Live · 42 min']]]
        ], ['Deep Learning', 'TensorFlow'], [1]),
        phase(3, 'NLP & Model Evaluation', 'Text models and metrics for certification.', [
          ['NLP Basics', 'Embeddings & transformers intro', [['📹', 'ti-video', 'NLP Cert Topics', 'Live · 40 min']]],
          ['Evaluation', 'Metrics & tuning', [['📝', 'ti-quiz', 'ML Metrics Practice Quiz', 'Quiz']]]
        ], ['NLP', 'Evaluation'], [0, 2]),
        phase(4, 'Mocks & Certification', 'Tests and certificate.', [
          ['Mocks', 'AI/ML mock exams', [['📝', 'ti-quiz', 'Mock Test 1', 'Mock Exam'], ['📝', 'ti-quiz', 'Mock Test 2', 'Mock Exam']]],
          ['Certification', 'Final assessment', [['🏗️', 'ti-project', 'Shiv Tatva Certification Assessment', 'Exam']]]
        ], ['Mocks', 'Certification'], [1, 2])
      ]
    }),
    cyber: certBase({
      id: 'cyber', emoji: '🛡️', thumb: 'crt-cyber', issuer: 'Shiv Tatva', examCode: 'Cyber Security Cert',
      cat: 'Cyber Security Training',
      title: 'Cyber Security', titleEm: 'Training',
      heroDesc: 'Cyber security certification — networking, ethical hacking basics, and mocks. ₹1,500 program fee.',
      duration: '4 Weeks', videos: '18+', projects: '2 Mock Tests', reviews: '4.8 (165 reviews)',
      stats: [['₹1,500', 'Program Fee'], ['4', 'Weeks'], ['2', 'Mock Tests'], ['🛡️', 'Security Labs'], ['🏅', 'Shiv Tatva Cert']],
      pills: ['🛡️ Security', '🌐 Networks', '🔍 Ethical Hacking', '📋 Mocks'],
      includes: ['₹1,500 program fee', 'Security concept classes', 'Lab demonstrations', '2 mock tests', 'Security interview PDF', 'Shiv Tatva certificate'],
      brochure: 'assets/brochures/cyber-security.pdf',
      months: [
        phase(1, 'Security Foundations', 'Threats, networking, policies.', [
          ['Foundations', 'CIA triad & tools', [['📹', 'ti-video', 'Cyber Cert Overview', 'Live · 40 min']]]
        ], ['Security', 'Networking'], [0]),
        phase(2, 'Ethical Hacking & SOC', 'Scanning, vulnerabilities, SOC intro.', [
          ['Offensive Basics', 'Recon & assessment', [['🧪', 'ti-lab', 'Lab: Security Scanning', 'Lab']]]
        ], ['Ethical Hacking', 'SOC'], [0, 1]),
        phase(3, 'Defense & Compliance', 'Hardening, incident response, and frameworks.', [
          ['Defense', 'Hardening & IR', [['📹', 'ti-video', 'Blue Team Exam Topics', 'Live · 40 min']]],
          ['Compliance', 'ISO & policies overview', [['💻', 'ti-code', 'Compliance for Cert Exams', 'Live · 36 min']]]
        ], ['Defense', 'Compliance'], [0, 2]),
        phase(4, 'Mocks & Certification', 'Practice and final cert.', [
          ['Mocks', 'Security mock tests', [['📝', 'ti-quiz', 'Mock Test 1', 'Mock Exam'], ['📝', 'ti-quiz', 'Mock Test 2', 'Mock Exam']]],
          ['Certification', 'Final exam', [['🏗️', 'ti-project', 'Shiv Tatva Certification Assessment', 'Exam']]]
        ], ['Mocks', 'Certification'], [1, 2])
      ]
    }),
    sap: certBase({
      id: 'sap', emoji: '📊', thumb: 'crt-sap', issuer: 'Shiv Tatva', examCode: 'SAP FICO & HANA Cert',
      cat: 'ERP Training',
      title: 'SAP FICO & HANA', titleEm: 'Training',
      heroDesc: 'SAP FICO & HANA certification prep — FI/CO modules and S/4 overview. ₹1,500 only.',
      duration: '4 Weeks', videos: '20+', projects: '2 Mock Tests', reviews: '4.7 (140 reviews)',
      stats: [['₹1,500', 'Program Fee'], ['4', 'Weeks'], ['2', 'Mock Tests'], ['📊', 'SAP Scenarios'], ['🏅', 'Shiv Tatva Cert']],
      pills: ['📊 SAP FI', '💰 SAP CO', '🏢 S/4HANA', '📋 Mocks'],
      includes: ['₹1,500 program fee', 'SAP FI/CO live sessions', 'Configuration scenario practice', '2 mock tests', 'SAP interview PDF', 'Shiv Tatva certificate'],
      brochure: 'assets/brochures/sap-fico-hana.pdf',
      months: [
        phase(1, 'SAP FI Basics', 'GL, AP, AR fundamentals.', [
          ['FI Module', 'Posting & reports', [['📹', 'ti-video', 'SAP Cert Syllabus', 'Live · 42 min']]]
        ], ['SAP FI', 'GL'], [0]),
        phase(2, 'SAP CO & S/4', 'Controlling and HANA intro.', [
          ['CO & S/4', 'Cost centers & S/4', [['💻', 'ti-code', 'CO Integration Scenarios', 'Live · 40 min']]]
        ], ['SAP CO', 'S/4HANA'], [1]),
        phase(3, 'Reporting & Fiori', 'Financial reports and Fiori for certification.', [
          ['Reporting', 'Trial balance & P&L', [['📹', 'ti-video', 'SAP Reporting Exam Topics', 'Live · 38 min']]],
          ['Fiori', 'Launchpad & apps', [['🧪', 'ti-lab', 'Lab: Fiori Navigation', 'Lab']]]
        ], ['Reporting', 'Fiori'], [0, 2]),
        phase(4, 'Mocks & Certification', 'Tests and certificate.', [
          ['Mocks', 'SAP mock tests', [['📝', 'ti-quiz', 'Mock Test 1', 'Mock Exam'], ['📝', 'ti-quiz', 'Mock Test 2', 'Mock Exam']]],
          ['Certification', 'Final assessment', [['🏗️', 'ti-project', 'Shiv Tatva Certification Assessment', 'Exam']]]
        ], ['Mocks', 'Certification'], [1, 2])
      ]
    }),
    salesforce: certBase({
      id: 'salesforce', emoji: '⚡', thumb: 'crt-salesforce', issuer: 'Shiv Tatva', examCode: 'Salesforce Cert',
      cat: 'CRM Training',
      title: 'Salesforce', titleEm: 'Training',
      heroDesc: 'Salesforce certification prep — Admin, automation, and exam practice. ₹1,500 program fee.',
      duration: '4 Weeks', videos: '16+', projects: '2 Mock Tests', reviews: '4.8 (175 reviews)',
      stats: [['₹1,500', 'Program Fee'], ['4', 'Weeks'], ['2', 'Mock Tests'], ['⚡', 'CRM Labs'], ['🏅', 'Shiv Tatva Cert']],
      pills: ['⚡ Salesforce', '👤 Admin', '🔄 Flows', '📋 Mocks'],
      includes: ['₹1,500 program fee', 'Admin & automation sessions', 'Trailhead-style exercises', '2 mock tests', 'CRM career PDF', 'Shiv Tatva certificate'],
      brochure: 'assets/brochures/salesforce.pdf',
      months: [
        phase(1, 'Salesforce Fundamentals', 'Objects, security, navigation.', [
          ['Admin Basics', 'CRM data model', [['📹', 'ti-video', 'Salesforce Cert Overview', 'Live · 38 min']]]
        ], ['Admin', 'CRM'], [0]),
        phase(2, 'Automation & Reports', 'Flows, dashboards.', [
          ['Automation', 'Flows & validation', [['💻', 'ti-code', 'Automation Exam Topics', 'Live · 40 min']]]
        ], ['Flows', 'Reports'], [0, 1]),
        phase(3, 'Apex & Developer Basics', 'Triggers, Apex, and LWC overview for cert.', [
          ['Apex', 'Triggers & classes', [['📹', 'ti-video', 'Developer Cert Topics', 'Live · 42 min']]],
          ['LWC Intro', 'Lightning components', [['💻', 'ti-code', 'LWC Exam Overview', 'Live · 38 min']]]
        ], ['Apex', 'LWC'], [0, 2]),
        phase(4, 'Mocks & Certification', 'Practice and certification.', [
          ['Mocks', 'Salesforce mock tests', [['📝', 'ti-quiz', 'Mock Test 1', 'Mock Exam'], ['📝', 'ti-quiz', 'Mock Test 2', 'Mock Exam']]],
          ['Certification', 'Final exam', [['🏗️', 'ti-project', 'Shiv Tatva Certification Assessment', 'Exam']]]
        ], ['Mocks', 'Certification'], [1, 2])
      ]
    })
};
