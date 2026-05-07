// Shared types for the AI Engineering Curriculum Platform

export interface User {
  id: string;
  email: string;
  name?: string;
  oauthProvider?: 'google' | 'github';
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  codeTheme: string;
  notifications: {
    email: boolean;
    inApp: boolean;
  };
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  weeks?: Week[];
  chapters?: Chapter[];
  milestones?: Milestone[];
}

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  isProject: boolean;
  projectType?: 'mini-project' | 'flagship-project' | 'capstone' | 'custom';
}

export interface Week {
  id: string;
  moduleId: string;
  weekNumber: number;
  title?: string;
  days?: DailyContent[];
}

export interface DailyContent {
  id: string;
  weekId: string;
  dayNumber: number;
  topic: string;
  hours: number;
  type: 'regular' | 'mini-project' | 'flagship-project' | 'catch-up';
  chapters?: Chapter[];
}

export interface Milestone {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  criteria: MilestoneCriteria;
  icon?: string;
}

export interface MilestoneCriteria {
  type: 'module-completion' | 'checkpoint-pass' | 'custom';
  moduleOrder?: number;
  checkpointId?: string;
}

export interface Progress {
  userId: string;
  chapterId: string;
  completed: boolean;
  completedAt?: Date;
}

export interface ProjectSubmission {
  id: string;
  userId: string;
  chapterId: string;
  githubUrl?: string;
  demoUrl?: string;
  screenshots: string[];
  description?: string;
  status: 'not-submitted' | 'pending-review' | 'reviewed' | 'revision-requested' | 'approved';
  score?: number;
  revisionNumber: number;
}

export interface ProjectReview {
  id: string;
  submissionId: string;
  reviewerId: string;
  rubricScores: RubricScores;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  recommendation: 'approve' | 'revision-required' | 'needs-work';
  generalFeedback?: string;
}

export interface RubricScores {
  codeQuality: number;
  documentation: number;
  testing: number;
  deployment: number;
}

export interface CodeComment {
  id: string;
  reviewId: string;
  userId: string;
  file: string;
  lineNumber: number;
  content: string;
  severity: 'info' | 'suggestion' | 'issue' | 'critical';
  resolved: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}