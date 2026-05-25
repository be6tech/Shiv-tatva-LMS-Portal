/* eslint-disable */
// All 7 official brochure programs — merged into CURRICULA */
import { formatTotalDuration, parseLesson } from '../utils/curriculum.js';

  function week(w, topic, sub, lessons) {
    const subtopics = (lessons || [['📹', 'ti-video', topic, 'Video · 40 min']]).map(parseLesson);
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
  function month(num, title, desc, weekList, skills, skillsOrange) {
    const weeks = weekList.map((w, i) => week(i + 1, w[0], w[1], w[2]));
    const lessonCount = weeks.reduce((n, wk) => n + wk.subtopics.length, 0);
    const monthDuration = formatTotalDuration(weeks.flatMap(wk => wk.subtopics));
    return {
      num, title, desc,
      tag: `${weeks.length} Weeks · ${lessonCount} Subtopics · ${monthDuration}`,
      weeks,
      skills: skills || [title],
      skillsOrange: skillsOrange || [0]
    };
  }

  export const CURRICULA =  {
    java: {
      id: 'java', emoji: '☕', thumb: 'cc-java', cat: 'Full Stack',
      title: 'Java Full Stack Development', titleEm: '',
      heroDesc: 'Core Java, Spring Boot, React, databases, and cloud deployment — per the official Java Full Stack brochure.',
      duration: '6 Months', videos: '200+', projects: '10+', reviews: '4.9 (1,240 reviews)',
      stats: [['6', 'Months Duration'], ['200+', 'Video Lessons'], ['10+', 'Live Projects'], ['24/7', 'Mentor Support'], ['95%', 'Placement Rate']],
      pills: ['☕ Core Java', '🌱 Spring Boot', '⚛️ React', '🗄️ MySQL', '☁️ AWS', '🔐 JWT', '🐳 Docker', '📦 Microservices'],
      includes: ['6 Months Live Training', '200+ Video Lessons', '10+ Projects', 'Spring Boot + React', 'AWS Deployment', 'Doubt Sessions', 'Resume & LinkedIn', 'Placement Materials', 'Certificate', 'Lifetime Recordings'],
      months: [
        month(1, 'Java Programming Fundamentals', 'Core Java, OOP, collections, and problem solving.', [
          ['Java Basics', 'Setup, syntax, control flow', [['📹', 'ti-video', 'JDK Setup & First Program', 'Video · 45 min'], ['💻', 'ti-code', 'Variables, Loops & Operators', 'Video · 38 min']]],
          ['OOP in Java', 'Classes, inheritance, interfaces', [['💻', 'ti-code', 'OOP Deep Dive', 'Video · 50 min'], ['📝', 'ti-quiz', 'OOP Quiz', 'Quiz']]],
          ['Collections & Exceptions', 'Lists, maps, error handling', [['💻', 'ti-code', 'Collections Framework', 'Video · 42 min']]],
          ['DSA Practice', 'Arrays, strings, patterns', [['🧪', 'ti-lab', 'Lab: DSA Problem Set', 'Lab']]]
        ], ['Core Java', 'OOP', 'Collections'], [0, 1]),
        month(2, 'Advanced Java & Databases', 'JDBC, MySQL, Hibernate, and multithreading.', [
          ['JDBC & MySQL', 'CRUD, joins, indexing', [['📹', 'ti-video', 'Database Design & JDBC', 'Video · 48 min']]],
          ['Hibernate & JPA', 'ORM mapping', [['💻', 'ti-code', 'Hibernate Entities & Repositories', 'Video · 44 min']]],
          ['Multithreading', 'Threads, executors', [['💻', 'ti-code', 'Concurrency in Java', 'Video · 40 min']]],
          ['DB Project', 'Backend data layer', [['🏗️', 'ti-project', 'Project: Student Management API', 'Project']]]
        ], ['MySQL', 'Hibernate', 'JPA'], [0, 2]),
        month(3, 'Spring Boot Backend', 'REST APIs, security, and Spring Data.', [
          ['Spring Boot Core', 'Controllers, services', [['📹', 'ti-video', 'Spring Boot Project Setup', 'Video · 35 min']]],
          ['REST & JPA', 'APIs and persistence', [['💻', 'ti-code', 'Building REST APIs', 'Video · 50 min']]],
          ['Spring Security', 'JWT authentication', [['💻', 'ti-code', 'JWT Auth with Spring Security', 'Video · 55 min']]],
          ['API Project', 'Production-style API', [['🏗️', 'ti-project', 'Project: E-Commerce Backend', 'Project']]]
        ], ['Spring Boot', 'REST', 'JWT'], [0, 3]),
        month(4, 'React Frontend', 'Hooks, routing, state, and API integration.', [
          ['React Fundamentals', 'Components & hooks', [['📹', 'ti-video', 'React Setup & JSX', 'Video · 42 min']]],
          ['Routing & State', 'Router, Context, Redux intro', [['💻', 'ti-code', 'React Router & State', 'Video · 48 min']]],
          ['API Integration', 'Axios, auth flow', [['💻', 'ti-code', 'Connect React to Spring Boot', 'Video · 55 min']]],
          ['UI Project', 'Dashboard & forms', [['🏗️', 'ti-project', 'Project: Admin Dashboard UI', 'Project']]]
        ], ['React', 'Redux', 'API Integration'], [0, 3]),
        month(5, 'Full Stack & Microservices', 'Integration, Docker, microservices basics.', [
          ['Full Stack Integration', 'End-to-end flows', [['📹', 'ti-video', 'CORS & Full Stack Auth Flow', 'Video · 45 min']]],
          ['Microservices', 'Service design', [['💻', 'ti-code', 'Microservices with Spring Cloud', 'Video · 50 min']]],
          ['Docker', 'Containerize apps', [['🧪', 'ti-lab', 'Lab: Docker Compose Stack', 'Lab']]],
          ['Capstone Build', 'Integrated product', [['🏗️', 'ti-project', 'Project: Full Stack E-Commerce', 'Project']]]
        ], ['Microservices', 'Docker', 'Integration'], [1, 2]),
        month(6, 'Cloud Deploy & Placement', 'AWS, CI/CD, interviews, and certification.', [
          ['AWS Deployment', 'EC2, S3, RDS', [['📹', 'ti-video', 'Deploy Spring Boot on AWS', 'Video · 48 min']]],
          ['CI/CD', 'GitHub Actions', [['💻', 'ti-code', 'Automated Deploy Pipeline', 'Video · 44 min']]],
          ['Placement Prep', 'DSA, system design', [['📹', 'ti-video', 'Java Interview Masterclass', 'Video · 90 min']]],
          ['Career Week', 'Resume, LinkedIn, mocks', [['📄', 'ti-project', 'Resume & LinkedIn Workshop', 'Session'], ['📚', 'ti-lab', 'Placement Material Kit', 'Resources'], ['📝', 'ti-quiz', 'Mock Interview', 'Live Session']]]
        ], ['AWS', 'CI/CD', 'Placement'], [0, 3])
      ]
    },
    python: {
      id: 'python', emoji: '🐍', thumb: 'cc-python', cat: 'Full Stack',
      title: 'Python Full Stack Development', titleEm: '',
      heroDesc: 'Python, Django/Flask, databases, and frontend integration — per the Python Full Stack brochure.',
      duration: '6 Months', videos: '160+', projects: '8+', reviews: '4.8 (980 reviews)',
      stats: [['6', 'Months Duration'], ['160+', 'Video Lessons'], ['8+', 'Live Projects'], ['24/7', 'Mentor Support'], ['94%', 'Placement Rate']],
      pills: ['🐍 Python', '🎯 Django', '⚡ Flask', '🗄️ PostgreSQL', '⚛️ React', '☁️ Deploy', '🔐 Auth', '📦 APIs'],
      includes: ['6 Months Live Training', '160+ Video Lessons', '8+ Projects', 'Django + Flask', 'Placement Materials', 'Certificate', 'Lifetime Recordings'],
      months: [
        month(1, 'Python Fundamentals', 'Syntax, OOP, modules, and file handling.', [
          ['Python Basics', 'Types, loops, functions', [['📹', 'ti-video', 'Python Environment & Basics', 'Video · 40 min']]],
          ['OOP & Modules', 'Classes, packages', [['💻', 'ti-code', 'OOP in Python', 'Video · 42 min']]],
          ['File I/O & APIs', 'JSON, requests', [['💻', 'ti-code', 'Working with Files & APIs', 'Video · 38 min']]],
          ['Python Labs', 'Scripting practice', [['🧪', 'ti-lab', 'Lab: Automation Scripts', 'Lab']]]
        ], ['Python', 'OOP', 'APIs'], [0, 1]),
        month(2, 'Django Backend', 'Models, views, REST with Django.', [
          ['Django Setup', 'MTV pattern', [['📹', 'ti-video', 'Django Project Architecture', 'Video · 45 min']]],
          ['Models & ORM', 'PostgreSQL integration', [['💻', 'ti-code', 'Django ORM & Migrations', 'Video · 48 min']]],
          ['Django REST', 'Serializers, viewsets', [['💻', 'ti-code', 'DRF APIs', 'Video · 50 min']]],
          ['Backend Project', 'CRUD API', [['🏗️', 'ti-project', 'Project: Blog API', 'Project']]]
        ], ['Django', 'PostgreSQL', 'DRF'], [0, 2]),
        month(3, 'Flask & Frontend', 'Flask APIs and React integration.', [
          ['Flask APIs', 'Blueprints, JWT', [['📹', 'ti-video', 'Flask REST APIs', 'Video · 42 min']]],
          ['React Basics', 'Components & hooks', [['💻', 'ti-code', 'React for Python Developers', 'Video · 44 min']]],
          ['Full Stack Connect', 'Auth & deployment prep', [['🧪', 'ti-lab', 'Lab: Flask + React App', 'Lab']]],
          ['Integration Project', 'Product prototype', [['🏗️', 'ti-project', 'Project: SaaS Dashboard', 'Project']]]
        ], ['Flask', 'React', 'Integration'], [1, 3]),
        month(4, 'Advanced & DevOps', 'Testing, caching, Docker, AWS.', [
          ['Testing', 'pytest, coverage', [['📹', 'ti-video', 'Testing Python Applications', 'Video · 38 min']]],
          ['Docker & CI/CD', 'Pipelines', [['💻', 'ti-code', 'Dockerize Django App', 'Video · 42 min']]],
          ['AWS Deploy', 'Cloud hosting', [['🧪', 'ti-lab', 'Lab: Deploy to AWS', 'Lab']]],
          ['Capstone', 'Full product', [['🏗️', 'ti-project', 'Capstone: Full Stack Product', 'Project']]]
        ], ['Docker', 'AWS', 'Testing'], [0, 2]),
        month(5, 'Industry Projects', 'Real-world APIs, auth, and performance tuning.', [
          ['API Design', 'REST best practices', [['📹', 'ti-video', 'Production API Patterns', 'Video · 44 min']]],
          ['Auth & Security', 'JWT, OAuth basics', [['💻', 'ti-code', 'Secure Python APIs', 'Video · 42 min']]],
          ['Performance', 'Caching, async', [['🧪', 'ti-lab', 'Lab: Redis Caching', 'Lab']]],
          ['Team Project', 'Sprint delivery', [['🏗️', 'ti-project', 'Project: Team SaaS Feature', 'Project']]]
        ], ['APIs', 'Security', 'Performance'], [0, 2]),
        month(6, 'Placement & Certification', 'Interview prep and career support.', [
          ['DSA for Python', 'Interview patterns', [['📹', 'ti-video', 'Python Interview Masterclass', 'Video · 90 min']]],
          ['System Design', 'API design basics', [['💻', 'ti-code', 'Backend System Design', 'Video · 50 min']]],
          ['Mocks', 'Technical + HR', [['📝', 'ti-quiz', 'Mock Interview', 'Live Session']]],
          ['Career Week', 'Resume & materials', [['📄', 'ti-project', 'Resume Workshop', 'Session'], ['📚', 'ti-lab', 'Placement Material Kit', 'Resources']]]
        ], ['Interview Prep', 'Placement', 'Career'], [0, 3])
      ]
    },
    cloud: {
      id: 'cloud', emoji: '☁️', thumb: 'cc-cloud', cat: 'Cloud Computing',
      title: 'Cloud Computing', titleEm: '',
      heroDesc: 'AWS, Azure, networking, storage, and cloud architecture — curriculum aligned with the official Cloud Computing brochure.',
      duration: '6 Months', videos: '120+', projects: '6+', reviews: '4.9 (760 reviews)',
      stats: [['6', 'Months Duration'], ['120+', 'Video Lessons'], ['6+', 'Cloud Labs'], ['24/7', 'Mentor Support'], ['93%', 'Placement Rate']],
      pills: ['☁️ AWS', '🔷 Azure', '🔐 IAM', '🌐 VPC', '💾 Storage', '⚡ Serverless', '🐳 Containers', '📜 Cert Prep'],
      includes: ['6 Months Live Training', '120+ Video Lessons', '6+ Cloud Labs', 'Certification Prep', 'Doubt Sessions', 'Resume & LinkedIn Support', 'Placement Materials', 'Industry Certificate'],
      months: [
        month(1, 'Cloud Foundations', 'Cloud models, shared responsibility, and core service categories.', [
          ['Cloud Concepts & Models', 'IaaS, PaaS, SaaS', [['📹', 'ti-video', 'Introduction to Cloud Computing', 'Video · 45 min'], ['💻', 'ti-code', 'Cloud Service Models', 'Video · 35 min']]],
          ['Accounts & IAM', 'Users, roles, policies', [['💻', 'ti-code', 'IAM Users, Roles & Policies', 'Video · 42 min'], ['🧪', 'ti-lab', 'Lab: Secure Cloud Account Setup', 'Lab']]],
          ['Compute Basics', 'VMs, scaling, load balancing', [['💻', 'ti-code', 'Virtual Machines & Auto Scaling', 'Video · 48 min']]],
          ['Storage & Databases', 'Object, block, managed DB', [['💻', 'ti-code', 'S3, EBS & RDS Overview', 'Video · 44 min'], ['📝', 'ti-quiz', 'Cloud Fundamentals Quiz', 'Quiz']]]
        ], ['Cloud Basics', 'IAM', 'Compute', 'Storage'], [0, 1]),
        month(2, 'Networking & Security', 'VPCs, firewalls, encryption, and monitoring.', [
          ['VPC & Networking', 'Subnets, routing, gateways', [['📹', 'ti-video', 'VPC Architecture Deep Dive', 'Video · 50 min']]],
          ['Security Best Practices', 'Encryption, KMS, secrets', [['💻', 'ti-code', 'Security Groups & NACLs', 'Video · 40 min']]],
          ['Monitoring & Logging', 'CloudWatch, alerts', [['🧪', 'ti-lab', 'Lab: Monitoring Dashboard', 'Lab']]],
          ['Mini Project', 'Secure 3-tier architecture', [['🏗️', 'ti-project', 'Project: VPC Web App Deploy', 'Project']]]
        ], ['VPC', 'Security', 'Monitoring'], [0, 3]),
        month(3, 'Serverless & DevOps', 'Lambda, containers, CI/CD on cloud.', [
          ['Serverless', 'Functions, API Gateway', [['📹', 'ti-video', 'Serverless Architecture', 'Video · 42 min']]],
          ['Containers', 'Docker & container services', [['💻', 'ti-code', 'ECS / Container Basics', 'Video · 46 min']]],
          ['CI/CD Pipelines', 'Automated deploy', [['💻', 'ti-code', 'GitHub Actions to Cloud', 'Video · 44 min']]],
          ['Cloud Lab Sprint', 'Multi-service integration', [['🧪', 'ti-lab', 'Lab: Serverless API', 'Lab']]]
        ], ['Serverless', 'Docker', 'CI/CD'], [1, 2]),
        month(4, 'Advanced Cloud & Multi-Cloud', 'Hybrid patterns, cost optimization, and resilience.', [
          ['Multi-Cloud Overview', 'AWS vs Azure positioning', [['📹', 'ti-video', 'Choosing Cloud Services', 'Video · 38 min']]],
          ['Architecture Review', 'Well-Architected Framework', [['💻', 'ti-code', 'Cost, Reliability & Performance', 'Video · 45 min']]],
          ['Disaster Recovery', 'Backup & failover', [['🧪', 'ti-lab', 'Lab: DR Scenario', 'Lab']]],
          ['Cloud Sprint', 'Multi-service build', [['🏗️', 'ti-project', 'Project: Resilient Cloud App', 'Project']]]
        ], ['Architecture', 'Multi-Cloud', 'DR'], [2, 3]),
        month(5, 'Certification Prep', 'Exam drills, mocks, and solution design.', [
          ['Certification Prep', 'Practice exams & tips', [['📝', 'ti-quiz', 'Cloud Certification Mock Test', 'Quiz']]],
          ['Solution Design', 'Case studies', [['💻', 'ti-code', 'Cloud Solution Design Workshop', 'Video · 50 min']]],
          ['Hands-on Review', 'Console mastery', [['🧪', 'ti-lab', 'Lab: Certification Lab Sprint', 'Lab']]],
          ['Peer Review', 'Architecture feedback', [['📹', 'ti-video', 'Cloud Interview Q&A', 'Video · 60 min']]]
        ], ['Cert Prep', 'Solution Design'], [0, 2]),
        month(6, 'Placement & Career', 'Resume, mocks, and cloud role readiness.', [
          ['Cloud Careers', 'Role paths & skills', [['📹', 'ti-video', 'Cloud Engineer Career Map', 'Video · 40 min']]],
          ['Portfolio', 'Lab evidence & GitHub', [['💻', 'ti-code', 'Building Your Cloud Portfolio', 'Video · 36 min']]],
          ['Mocks', 'Technical interviews', [['📝', 'ti-quiz', 'Mock Interview', 'Live Session']]],
          ['Career Week', 'Resume, mocks, placement kit', [['📄', 'ti-project', 'Resume & LinkedIn Workshop', 'Session'], ['📚', 'ti-lab', 'Placement Material Kit', 'Resources']]]
        ], ['Placement', 'Career', 'Portfolio'], [0, 3])
      ]
    },
    cyber: {
      id: 'cyber', emoji: '🛡️', thumb: 'cc-cyber', cat: 'Cyber Security',
      title: 'Cyber Security', titleEm: '',
      heroDesc: 'Network security, ethical hacking, SOC operations, and compliance — per the official Cyber Security brochure.',
      duration: '6 Months', videos: '110+', projects: '5+', reviews: '4.8 (540 reviews)',
      stats: [['6', 'Months Duration'], ['110+', 'Video Lessons'], ['5+', 'Security Labs'], ['24/7', 'Mentor Support'], ['91%', 'Placement Rate']],
      pills: ['🛡️ Security', '🌐 Networks', '🔍 Ethical Hacking', '📡 SOC', '🔐 Cryptography', '📋 Compliance', '🧪 Labs', '💼 Career'],
      includes: ['6 Months Live Training', '110+ Video Lessons', '5+ Security Labs', 'Certification Guidance', 'Doubt Sessions', 'Placement Support', 'Industry Certificate'],
      months: [
        month(1, 'Security Foundations', 'CIA triad, threats, and security policies.', [
          ['Intro to Cyber Security', 'Threat landscape', [['📹', 'ti-video', 'Cyber Security Career Path', 'Video · 40 min']]],
          ['Networking for Security', 'TCP/IP, ports, protocols', [['💻', 'ti-code', 'Network Protocols & Tools', 'Video · 48 min']]],
          ['Cryptography Basics', 'Hashing, encryption', [['💻', 'ti-code', 'Symmetric & Asymmetric Crypto', 'Video · 42 min']]],
          ['Security Policies', 'Access control models', [['📝', 'ti-quiz', 'Security Fundamentals Quiz', 'Quiz']]]
        ], ['Threats', 'Networking', 'Crypto'], [0, 2]),
        month(2, 'Ethical Hacking', 'Reconnaissance, scanning, and vulnerability assessment.', [
          ['Recon & Footprinting', 'OSINT basics', [['📹', 'ti-video', 'Ethical Hacking Methodology', 'Video · 45 min']]],
          ['Scanning & Enumeration', 'Nmap, service discovery', [['🧪', 'ti-lab', 'Lab: Network Scanning', 'Lab']]],
          ['Vulnerability Assessment', 'CVEs, scoring, reporting', [['💻', 'ti-code', 'Vulnerability Scanning Tools', 'Video · 44 min']]],
          ['Web App Security', 'OWASP Top 10 intro', [['🏗️', 'ti-project', 'Project: Vulnerability Report', 'Project']]]
        ], ['Ethical Hacking', 'OWASP', 'Scanning'], [0, 3]),
        month(3, 'SOC & Defense', 'SIEM, incident response, and hardening.', [
          ['Security Operations', 'SOC workflows', [['📹', 'ti-video', 'SOC Analyst Role Overview', 'Video · 42 min']]],
          ['SIEM & Logging', 'Alerts, correlation', [['💻', 'ti-code', 'Log Analysis & SIEM Basics', 'Video · 46 min']]],
          ['Incident Response', 'Playbooks, containment', [['🧪', 'ti-lab', 'Lab: Incident Simulation', 'Lab']]],
          ['System Hardening', 'OS & server hardening', [['💻', 'ti-code', 'Hardening Checklists', 'Video · 38 min']]]
        ], ['SOC', 'SIEM', 'Incident Response'], [1, 2]),
        month(4, 'Advanced Offense & Defense', 'Pen testing intro, malware basics, and blue team drills.', [
          ['Penetration Testing', 'Scope, rules of engagement', [['📹', 'ti-video', 'Pen Test Lifecycle', 'Video · 44 min']]],
          ['Malware Analysis Intro', 'Static & dynamic basics', [['💻', 'ti-code', 'Malware Analysis Overview', 'Video · 40 min']]],
          ['Red vs Blue', 'Attack/defense exercises', [['🧪', 'ti-lab', 'Lab: Red Team Scenario', 'Lab']]],
          ['Security Project', 'Threat modeling', [['🏗️', 'ti-project', 'Project: Threat Model Report', 'Project']]]
        ], ['Pen Testing', 'Malware', 'Blue Team'], [0, 3]),
        month(5, 'Compliance & Governance', 'Frameworks, policies, and audit readiness.', [
          ['Compliance', 'ISO, GDPR overview', [['💻', 'ti-code', 'Compliance Frameworks', 'Video · 36 min']]],
          ['Governance', 'Policies & risk', [['📹', 'ti-video', 'Security Governance', 'Video · 38 min']]],
          ['Audit Prep', 'Evidence & controls', [['🧪', 'ti-lab', 'Lab: Control Mapping', 'Lab']]],
          ['Capstone Build', 'Security program draft', [['🏗️', 'ti-project', 'Capstone: Security Assessment', 'Project']]]
        ], ['Compliance', 'Governance', 'Audit'], [1, 2]),
        month(6, 'Certification & Career', 'Certs, resume, mocks, and placement.', [
          ['Certification Paths', 'CEH, Security+ overview', [['📹', 'ti-video', 'Cyber Cert Roadmap', 'Video · 42 min']]],
          ['Interview Prep', 'SOC & analyst roles', [['💻', 'ti-code', 'Security Interview Scenarios', 'Video · 45 min']]],
          ['Mocks', 'Technical + HR', [['📝', 'ti-quiz', 'Mock Security Interview', 'Live Session']]],
          ['Career Week', 'Certs, resume, materials', [['📄', 'ti-project', 'Cyber Security Resume Workshop', 'Session'], ['📚', 'ti-lab', 'Placement Material Kit', 'Resources']]]
        ], ['Certification', 'Career', 'Placement'], [0, 3])
      ]
    },
    sap: {
      id: 'sap', emoji: '📊', thumb: 'cc-sap', cat: 'Enterprise ERP',
      title: 'SAP FICO & HANA', titleEm: '',
      heroDesc: 'SAP Financial Accounting, Controlling, and S/4HANA fundamentals — per the SAP FICO & HANA brochure.',
      duration: '6 Months', videos: '130+', projects: '4+', reviews: '4.7 (380 reviews)',
      stats: [['6', 'Months Duration'], ['130+', 'Video Lessons'], ['4+', 'SAP Projects'], ['24/7', 'Mentor Support'], ['90%', 'Placement Rate']],
      pills: ['📊 SAP FI', '💰 SAP CO', '🏢 S/4HANA', '📈 Reporting', '🔗 Integration', '🖥️ Fiori', '🗄️ HANA', '💼 ERP Career'],
      includes: ['6 Months Live Training', '130+ Video Lessons', 'SAP Sandbox Access', 'Implementation Project', 'Placement Prep', 'Certificate'],
      months: [
        month(1, 'SAP Basics & FI', 'SAP navigation, enterprise structure, and FI overview.', [
          ['SAP Overview', 'Modules, landscape', [['📹', 'ti-video', 'Introduction to SAP ERP', 'Video · 45 min']]],
          ['Enterprise Structure', 'Client, company code', [['💻', 'ti-code', 'SAP Organizational Units', 'Video · 40 min']]],
          ['General Ledger', 'GL accounts, postings', [['🧪', 'ti-lab', 'Lab: GL Posting Exercise', 'Lab']]],
          ['AP & AR', 'Vendor & customer accounting', [['📝', 'ti-quiz', 'SAP FI Basics Quiz', 'Quiz']]]
        ], ['SAP FI', 'GL', 'AP/AR'], [0, 1]),
        month(2, 'SAP CO & Integration', 'Cost centers, profit centers, and FI-CO integration.', [
          ['Controlling Module', 'CO organizational structure', [['📹', 'ti-video', 'SAP CO Overview', 'Video · 42 min']]],
          ['Cost Centers', 'Planning & allocation', [['💻', 'ti-code', 'Cost Center Accounting', 'Video · 44 min']]],
          ['Profitability Analysis', 'PA segments', [['🧪', 'ti-lab', 'Lab: CO Allocation Run', 'Lab']]],
          ['FI-CO Integration', 'Real-time integration', [['💻', 'ti-code', 'Integration Scenarios', 'Video · 38 min']]]
        ], ['SAP CO', 'Integration'], [0, 3]),
        month(3, 'Asset Accounting & Reporting', 'Fixed assets, depreciation, and financial reports.', [
          ['Asset Accounting', 'Asset lifecycle', [['📹', 'ti-video', 'Asset Management in SAP', 'Video · 40 min']]],
          ['Period-End Closing', 'Month-end activities', [['💻', 'ti-code', 'Closing Procedures', 'Video · 42 min']]],
          ['Financial Reporting', 'Trial balance, P&L', [['🧪', 'ti-lab', 'Lab: Financial Statement Run', 'Lab']]],
          ['Case Study', 'End-to-end FI cycle', [['🏗️', 'ti-project', 'Case Study: FI Month Close', 'Project']]]
        ], ['Assets', 'Reporting', 'Closing'], [1, 2]),
        month(4, 'S/4HANA & Fiori', 'S/4 differences, Fiori apps, and HANA overview.', [
          ['S/4HANA Overview', 'Migration & simplification', [['📹', 'ti-video', 'S/4HANA for Finance', 'Video · 45 min']]],
          ['Fiori UX', 'Launchpad & apps', [['💻', 'ti-code', 'Fiori App Navigation', 'Video · 36 min']]],
          ['SAP HANA Basics', 'In-memory concept', [['💻', 'ti-code', 'HANA Architecture Intro', 'Video · 40 min']]],
          ['Reporting in S/4', 'Embedded analytics', [['🧪', 'ti-lab', 'Lab: Fiori Dashboard', 'Lab']]]
        ], ['S/4HANA', 'Fiori', 'HANA'], [0, 2]),
        month(5, 'Implementation & Integration', 'Blueprint, config project, and integrations.', [
          ['Implementation Methodology', 'ASAP / activate overview', [['📹', 'ti-video', 'SAP Project Lifecycle', 'Video · 42 min']]],
          ['Configuration Project', 'Customizing FI/CO', [['🏗️', 'ti-project', 'Project: FI/CO Configuration', 'Project']]],
          ['Integration', 'IDoc & interfaces intro', [['💻', 'ti-code', 'SAP Integration Basics', 'Video · 40 min']]],
          ['Consulting Skills', 'Client workshops', [['🧪', 'ti-lab', 'Lab: Requirements Workshop', 'Lab']]]
        ], ['Implementation', 'Integration', 'Consulting'], [0, 3]),
        month(6, 'Career & Placement', 'SAP consultant interviews and placement.', [
          ['Interview Prep', 'SAP consultant interviews', [['📄', 'ti-project', 'SAP Resume & LinkedIn', 'Session']]],
          ['Case Interviews', 'FI/CO scenarios', [['📹', 'ti-video', 'SAP Consultant Interview Masterclass', 'Video · 75 min']]],
          ['Mocks', 'Technical + functional', [['📝', 'ti-quiz', 'Mock SAP Interview', 'Live Session']]],
          ['Placement Week', 'Materials & referrals', [['📚', 'ti-lab', 'Placement Material Kit', 'Resources']]]
        ], ['Career', 'Placement', 'SAP Consulting'], [0, 3])
      ]
    },
    salesforce: {
      id: 'salesforce', emoji: '⚡', thumb: 'cc-salesforce', cat: 'CRM',
      title: 'Salesforce', titleEm: '',
      heroDesc: 'Salesforce Admin, automation, Apex, and Lightning — per the official Salesforce brochure.',
      duration: '6 Months', videos: '90+', projects: '5+', reviews: '4.8 (460 reviews)',
      stats: [['6', 'Months Duration'], ['90+', 'Video Lessons'], ['5+', 'CRM Projects'], ['24/7', 'Mentor Support'], ['92%', 'Placement Rate']],
      pills: ['⚡ Salesforce', '👤 Admin', '🔄 Flows', '📊 Reports', '💻 Apex', '⚡ Lightning', '🔗 Integration', '📜 Cert'],
      includes: ['6 Months Live Training', '90+ Video Lessons', '5+ CRM Projects', 'Certification Prep', 'Placement Support', 'Certificate'],
      months: [
        month(1, 'Salesforce Fundamentals', 'CRM concepts, objects, and security model.', [
          ['CRM & Salesforce', 'Cloud CRM overview', [['📹', 'ti-video', 'Introduction to Salesforce', 'Video · 40 min']]],
          ['Data Model', 'Objects, fields, relationships', [['💻', 'ti-code', 'Standard & Custom Objects', 'Video · 44 min']]],
          ['Security Model', 'Profiles, roles, sharing', [['🧪', 'ti-lab', 'Lab: Org Setup Exercise', 'Lab']]],
          ['Admin Basics Quiz', 'Navigation & setup', [['📝', 'ti-quiz', 'Salesforce Admin Quiz', 'Quiz']]]
        ], ['CRM', 'Objects', 'Security'], [0, 1]),
        month(2, 'Automation & Analytics', 'Flows, validation, reports, and dashboards.', [
          ['Process Automation', 'Flows & Process Builder', [['📹', 'ti-video', 'Automation in Salesforce', 'Video · 45 min']]],
          ['Validation & Rules', 'Business logic', [['💻', 'ti-code', 'Validation Rules & Formulas', 'Video · 38 min']]],
          ['Reports & Dashboards', 'Analytics for business', [['🧪', 'ti-lab', 'Lab: Executive Dashboard', 'Lab']]],
          ['Mini Project', 'Sales pipeline app', [['🏗️', 'ti-project', 'Project: Sales CRM Workflow', 'Project']]]
        ], ['Flows', 'Reports', 'Automation'], [0, 3]),
        month(3, 'Developer Track', 'Apex, LWC, and integration fundamentals.', [
          ['Apex Programming', 'Triggers, classes', [['📹', 'ti-video', 'Apex for Developers', 'Video · 48 min']]],
          ['Lightning Web Components', 'LWC basics', [['💻', 'ti-code', 'Build Your First LWC', 'Video · 44 min']]],
          ['Integration', 'REST API & connected apps', [['🧪', 'ti-lab', 'Lab: External API Integration', 'Lab']]],
          ['Developer Project', 'Custom app feature', [['🏗️', 'ti-project', 'Project: LWC + Apex App', 'Project']]]
        ], ['Apex', 'LWC', 'Integration'], [1, 2]),
        month(4, 'Advanced CRM & Data', 'Data modeling, bulk APIs, and governance.', [
          ['Data Modeling', 'Relationships at scale', [['📹', 'ti-video', 'Enterprise CRM Data Design', 'Video · 40 min']]],
          ['Bulk & APIs', 'Bulk API, streaming', [['💻', 'ti-code', 'Bulk Data Operations', 'Video · 38 min']]],
          ['Governance', 'Release & change mgmt', [['🧪', 'ti-lab', 'Lab: Sandbox Promotion', 'Lab']]],
          ['CRM Sprint', 'End-to-end workflow', [['🏗️', 'ti-project', 'Project: Enterprise CRM Rollout', 'Project']]]
        ], ['Data', 'APIs', 'Governance'], [0, 2]),
        month(5, 'Certification Prep', 'Admin/Developer cert paths and mocks.', [
          ['Cert Paths', 'Admin vs Developer certs', [['📹', 'ti-video', 'Salesforce Certification Guide', 'Video · 42 min']]],
          ['Exam Strategy', 'Focus areas & timing', [['💻', 'ti-code', 'Certification Study Plan', 'Video · 36 min']]],
          ['Practice Exams', 'Question drills', [['📝', 'ti-quiz', 'Salesforce Practice Quiz', 'Quiz']]],
          ['Trailhead Sprint', 'Badge completion', [['🧪', 'ti-lab', 'Lab: Superbadge Prep', 'Lab']]]
        ], ['Cert Prep', 'Trailhead'], [0, 3]),
        month(6, 'Placement & Career', 'Resume, mocks, and CRM role readiness.', [
          ['CRM Careers', 'Admin, BA, developer roles', [['📹', 'ti-video', 'Salesforce Career Paths', 'Video · 38 min']]],
          ['Portfolio', 'Projects & Trailhead', [['💻', 'ti-code', 'Showcasing CRM Skills', 'Video · 34 min']]],
          ['Mocks', 'Technical + functional', [['📝', 'ti-quiz', 'Mock CRM Interview', 'Live Session']]],
          ['Career Week', 'Resume & placement kit', [['📄', 'ti-project', 'Salesforce Resume Workshop', 'Session'], ['📚', 'ti-lab', 'Placement Material Kit', 'Resources']]]
        ], ['Placement', 'Career'], [0, 3])
      ]
    },
    ai: {
      id: 'ai', emoji: '🤖', thumb: 'cc-ai', cat: 'AI & Machine Learning',
      title: 'AI & Machine Learning', titleEm: '',
      heroDesc: 'Machine learning, deep learning, NLP, and MLOps — curriculum aligned with the official AI & ML brochure.',
      duration: '6 Months', videos: '150+', projects: '7+', reviews: '4.9 (720 reviews)',
      stats: [['6', 'Months Duration'], ['150+', 'Video Lessons'], ['7+', 'AI Projects'], ['24/7', 'Mentor Support'], ['94%', 'Placement Rate']],
      pills: ['🤖 ML', '🧠 Deep Learning', '📝 NLP', '👁️ Vision', '🔥 PyTorch', '☁️ MLOps'],
      includes: ['6 Months Training', '150+ Video Lessons', '7+ AI Projects', 'TensorFlow & PyTorch', 'MLOps Basics', 'Placement Materials', 'Certificate', 'GPU Lab Access'],
      months: [
        month(1, 'ML Foundations', 'Supervised learning and scikit-learn pipelines.', [
          ['ML Math & Python', 'NumPy, pandas review', [['📹', 'ti-video', 'Math for Machine Learning', 'Video · 50 min']]],
          ['Supervised Learning', 'Regression & classification', [['💻', 'ti-code', 'Scikit-learn Pipelines', 'Video · 48 min']]],
          ['Model Evaluation', 'Metrics & tuning', [['🧪', 'ti-lab', 'Lab: Prediction Project', 'Lab']]],
          ['ML Project 1', 'Tabular data project', [['🏗️', 'ti-project', 'Kaggle-Style ML Project', 'Project']]]
        ], ['Scikit-learn', 'ML', 'Evaluation'], [0, 3]),
        month(2, 'Deep Learning', 'Neural networks, TensorFlow, and PyTorch.', [
          ['Neural Networks', 'Backprop & activations', [['📹', 'ti-video', 'Deep Learning Intuition', 'Video · 55 min']]],
          ['TensorFlow & Keras', 'CNN image models', [['💻', 'ti-code', 'Image Classification with CNNs', 'Video · 50 min']]],
          ['PyTorch', 'Training loops', [['💻', 'ti-code', 'PyTorch Training Loop', 'Video · 46 min']]],
          ['DL Project', 'Custom dataset model', [['🏗️', 'ti-project', 'Image Recognition App', 'Project']]]
        ], ['TensorFlow', 'PyTorch', 'CNNs'], [1, 2]),
        month(3, 'NLP', 'Text processing, transformers, and RAG.', [
          ['Text Processing', 'Tokenization, embeddings', [['📹', 'ti-video', 'NLP Pipeline Overview', 'Video · 44 min']]],
          ['Transformers', 'Hugging Face basics', [['💻', 'ti-code', 'Fine-tuning Pretrained Models', 'Video · 52 min']]],
          ['Chatbots & RAG', 'LLM applications', [['🧪', 'ti-lab', 'Lab: Sentiment Analyzer', 'Lab']]],
          ['NLP Project', 'Document Q&A', [['🏗️', 'ti-project', 'NLP Capstone: Smart Search', 'Project']]]
        ], ['NLP', 'Transformers', 'RAG'], [1, 3]),
        month(4, 'Computer Vision', 'OpenCV, detection, and deployment.', [
          ['CV Fundamentals', 'Image processing', [['📹', 'ti-video', 'OpenCV & Image Processing', 'Video · 42 min']]],
          ['Object Detection', 'YOLO intro', [['💻', 'ti-code', 'Object Detection Pipeline', 'Video · 50 min']]],
          ['Vision Project', 'Real-time detector', [['🏗️', 'ti-project', 'Vision App: Object Detector', 'Project']]],
          ['Model Optimization', 'ONNX export', [['💻', 'ti-code', 'Optimizing Models for Deploy', 'Video · 38 min']]]
        ], ['Computer Vision', 'YOLO', 'Deploy'], [2, 3]),
        month(5, 'MLOps & Production', 'Serving models, monitoring, and pipelines.', [
          ['MLOps Basics', 'MLflow, FastAPI', [['📹', 'ti-video', 'MLOps Pipeline Overview', 'Video · 45 min']]],
          ['Cloud ML Deploy', 'Production serving', [['🧪', 'ti-lab', 'Lab: Deploy Model with FastAPI', 'Lab']]],
          ['Monitoring', 'Drift & metrics', [['💻', 'ti-code', 'Model Monitoring Basics', 'Video · 40 min']]],
          ['Pipeline Project', 'CI for ML', [['🏗️', 'ti-project', 'Project: ML CI/CD Pipeline', 'Project']]]
        ], ['MLOps', 'Deploy', 'Monitoring'], [0, 3]),
        month(6, 'Capstone & Career', 'End-to-end AI product and interview prep.', [
          ['AI Capstone', 'End-to-end AI product', [['🏗️', 'ti-project', 'Capstone: Production AI System', 'Project']]],
          ['Portfolio', 'GitHub & demos', [['💻', 'ti-code', 'AI Portfolio Best Practices', 'Video · 38 min']]],
          ['Interview Prep', 'ML system design', [['📹', 'ti-video', 'AI Engineer Interview Masterclass', 'Video · 90 min']]],
          ['Career Week', 'Mocks & placement kit', [['📝', 'ti-quiz', 'Mock Technical Interview', 'Live Session'], ['📚', 'ti-lab', 'Placement Material Kit', 'Resources']]]
        ], ['Capstone', 'Career', 'Interview Prep'], [0, 3])
      ]
    }
  };
