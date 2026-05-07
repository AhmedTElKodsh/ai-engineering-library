const fs = require('fs');
const path = require('path');

const tasksFile = path.join(__dirname, '../.kiro/specs/ai-engineering-curriculum-implementation/tasks.md');
let content = fs.readFileSync(tasksFile, 'utf8');

// Mark completed sections with checkmarks
const completedSections = [
  '- [ ] 3. Backend Microservices - Core Services',
  '- [ ] 4. Backend Microservices - Daily Content, Milestones, and Duration Services',
  '- [ ] 5. Checkpoint - Backend services with new features validation',
  '- [ ] 6. Backend Microservices - Code Execution Service',
  '- [ ] 7. Backend Microservices - Analytics Service',
  '- [ ] 8. Checkpoint - Backend services validation',
  '- [ ] 9. Backend Microservices - Portfolio and Review Services',
  '- [ ] 10. Checkpoint - Backend services with portfolio and review validation',
  '- [ ] 11. Frontend Application - Core Infrastructure',
  '- [ ] 12. Frontend Application - Content Display',
  '- [ ] 13. Frontend Application - Interactive Learning Elements',
  '- [ ] 14. Checkpoint - Frontend core features validation',
  '- [ ] 15. Frontend Application - Daily Content, Milestones, and Duration Components',
  '- [ ] 16. Frontend Application - Assessment and Progress',
  '- [ ] 17. Frontend Application - Portfolio and Review Components',
  '- [ ] 18. Frontend Application - Search and Navigation',
  '- [ ] 19. Frontend Application - User Features',
  '- [ ] 20. Checkpoint - Frontend complete features validation'
];

// Mark completed tasks
const completedTasks = [
  '  - [ ] 3.1 Implement API Gateway with authentication middleware',
  '  - [ ] 3.2 Build User Service',
  '  - [ ] 3.3 Build Content Service',
  '  - [ ] 3.4 Build Progress Service',
  '  - [ ] 3.5 Build Assessment Service',
  '  - [ ] 4.1 Implement DailyContentService',
  '  - [ ] 4.2 Implement MilestoneService',
  '  - [ ] 4.3 Implement DurationCalculationService',
  '  - [ ] 6.1 Implement Code Execution Service API',
  '  - [ ] 6.2 Build Docker sandbox orchestration',
  '  - [ ] 6.3 Implement code execution with security controls',
  '  - [ ] 7.1 Implement Analytics Service API',
  '  - [ ] 7.2 Build analytics aggregation jobs',
  '  - [ ] 9.1 Implement ProjectPortfolioService',
  '  - [ ] 9.2 Implement ProjectReviewService',
  '  - [ ] 9.3 Build Portfolio API endpoints',
  '  - [ ] 9.4 Build Project Submission and Review API endpoints',
  '  - [ ] 11.1 Set up React application with TypeScript',
  '  - [ ] 11.2 Implement authentication and authorization',
  '  - [ ] 11.3 Build global navigation and layout components',
  '  - [ ] 11.4 Implement error boundary and error handling',
  '  - [ ] 12.1 Build ChapterViewer component',
  '  - [ ] 12.2 Implement DiagramRenderer component',
  '  - [ ] 12.3 Build CodeBlock component with syntax highlighting',
  '  - [ ] 12.4 Create TableOfContents component',
  '  - [ ] 13.1 Build ExplorableExplanation component',
  '  - [ ] 13.2 Implement ScrollytellingSection component',
  '  - [ ] 13.3 Build CodePlayground component',
  '  - [ ] 13.4 Add playground features (reset, solution, save)',
  '  - [ ] 15.1 Build DailyContentCard component',
  '  - [ ] 15.2 Build WeeklySchedule component',
  '  - [ ] 15.3 Build MilestoneDisplay component',
  '  - [ ] 15.4 Build MilestoneBadge component',
  '  - [ ] 15.5 Build DurationCalculator component',
  '  - [ ] 15.6 Build LearningPathTimeline component',
  '  - [ ] 15.7 Build CompletionEstimate component',
  '  - [ ] 16.1 Build DiagnosticAssessment component',
  '  - [ ] 16.2 Implement CheckpointGate component',
  '  - [ ] 16.3 Build QuestionSet component for chapter assessments',
  '  - [ ] 16.4 Create ProgressDashboard component',
  '  - [ ] 16.5 Implement ProgressIndicator and CheckpointBadge components',
  '  - [ ] 17.1 Build PortfolioDashboard component',
  '  - [ ] 17.2 Build ProjectCard component',
  '  - [ ] 17.3 Build PublicPortfolio component',
  '  - [ ] 17.4 Build PortfolioExportModal component',
  '  - [ ] 17.5 Build ProjectSubmissionForm component',
  '  - [ ] 17.6 Build SubmissionStatusBadge component',
  '  - [ ] 17.7 Build RevisionHistory component',
  '  - [ ] 17.8 Build ReviewInterface component',
  '  - [ ] 17.9 Build CodeReviewPanel component',
  '  - [ ] 17.10 Build ReviewFeedbackDisplay component',
  '  - [ ] 17.11 Build ReviewRubric component',
  '  - [ ] 17.12 Build FeedbackThread component',
  '  - [ ] 18.1 Implement global search functionality',
  '  - [ ] 18.2 Build hierarchical navigation menu',
  '  - [ ] 18.3 Implement sequential navigation (Previous/Next)',
  '  - [ ] 19.1 Build user profile and preferences pages',
  '  - [ ] 19.2 Implement certificate display and sharing',
  '  - [ ] 19.3 Build feedback and issue reporting'
];

// Replace sections
completedSections.forEach(section => {
  content = content.replace(section, section.replace('[ ]', '[x]'));
});

// Replace tasks
completedTasks.forEach(task => {
  content = content.replace(task, task.replace('[ ]', '[x]'));
});

fs.writeFileSync(tasksFile, content, 'utf8');
console.log('✅ Tasks updated successfully!');
