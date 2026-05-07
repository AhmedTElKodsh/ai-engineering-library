# Architecture Documentation

## AI Engineering Curriculum Platform

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Microservices Architecture](#microservices-architecture)
5. [Data Flow](#data-flow)
6. [Database Schema](#database-schema)
7. [API Design](#api-design)
8. [Security Architecture](#security-architecture)
9. [Scalability and Performance](#scalability-and-performance)
10. [Deployment Architecture](#deployment-architecture)

## System Overview

The AI Engineering Curriculum Platform is a comprehensive educational system built on a microservices architecture. It provides:

- **7 Curriculum Modules** (Module 0-6) with 30 weeks of content
- **Daily Content Structure** with week-by-week, day-by-day organization
- **21 Achievement Milestones** with social sharing
- **Interactive Learning Elements** (code playgrounds, explorable explanations, scrollytelling)
- **Project Portfolio System** with public sharing and exports
- **Review and Feedback System** with rubric-based scoring
- **Progress Tracking** with duration calculation and pace tracking
- **Diagnostic Assessment** for personalized learning paths

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Web App    │  │  Mobile PWA  │  │  Offline     │         │
│  │  (React/TS)  │  │   (React)    │  │  Mode (SW)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         CDN Layer                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CloudFront CDN (Static Assets, Images, Videos)          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Express API Gateway                                      │  │
│  │  - Authentication (JWT)                                   │  │
│  │  - Rate Limiting                                          │  │
│  │  - Request Routing                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   User       │    │   Content    │    │   Progress   │
│   Service    │    │   Service    │    │   Service    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Assessment  │    │  Code Exec   │    │  Analytics   │
│   Service    │    │   Service    │    │   Service    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Portfolio   │    │   Review     │    │  Milestone   │
│   Service    │    │   Service    │    │   Service    │
└──────────────┘    └──────────────┘    └──────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PostgreSQL  │    │    Redis     │    │ ElasticSearch│
│  (Primary DB)│    │   (Cache)    │    │   (Search)   │
└──────────────┘    └──────────────┘    └──────────────┘
        │
        ▼
┌──────────────┐
│   AWS S3     │
│  (Storage)   │
└──────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **UI Components**: Custom components with Tailwind CSS
- **Code Editor**: Monaco Editor
- **Diagrams**: Mermaid.js
- **Build Tool**: Vite
- **PWA**: Service Workers for offline access

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **API Documentation**: Swagger/OpenAPI
- **Authentication**: JWT + OAuth 2.0 (Google, GitHub)
- **Validation**: Zod
- **ORM**: Prisma

### Databases
- **Primary Database**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Search**: ElasticSearch 8+
- **Object Storage**: AWS S3

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: Winston + ELK Stack
- **CDN**: CloudFront

## Microservices Architecture

### 1. User Service
**Responsibilities:**
- User registration and authentication
- Profile management
- User preferences
- OAuth integration

**Endpoints:**
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users/:userId/profile`
- `PUT /api/v1/users/:userId/profile`

### 2. Content Service
**Responsibilities:**
- Module and chapter management
- Week and daily content retrieval
- Milestone data
- Content versioning

**Endpoints:**
- `GET /api/v1/content/modules`
- `GET /api/v1/content/chapters/:chapterId`
- `GET /api/v1/content/modules/:moduleId/weeks`
- `GET /api/v1/content/modules/:moduleId/milestones`

### 3. Progress Service
**Responsibilities:**
- Chapter completion tracking
- Checkpoint gating
- Milestone achievement
- Duration calculation
- Portfolio entry creation

**Endpoints:**
- `POST /api/v1/progress/chapters/:chapterId/complete`
- `GET /api/v1/progress/users/:userId`
- `GET /api/v1/progress/users/:userId/milestones`
- `GET /api/v1/progress/users/:userId/duration`

### 4. Assessment Service
**Responsibilities:**
- Diagnostic assessment
- Checkpoint assessments
- Entry point recommendations
- Scoring and feedback

**Endpoints:**
- `POST /api/v1/assessments/diagnostic/start`
- `POST /api/v1/assessments/diagnostic/submit`
- `GET /api/v1/assessments/checkpoints/:checkpointId`

### 5. Code Execution Service
**Responsibilities:**
- Python code execution in sandboxes
- Docker container management
- Test case validation
- Security controls

**Endpoints:**
- `POST /api/v1/code/execute`
- `GET /api/v1/code/templates/:templateId`

### 6. Analytics Service
**Responsibilities:**
- Event tracking
- Metrics aggregation
- Dashboard data
- GDPR compliance

**Endpoints:**
- `POST /api/v1/analytics/events`
- `GET /api/v1/analytics/dashboard`
- `GET /api/v1/analytics/chapters/:chapterId/metrics`

### 7. Portfolio Service
**Responsibilities:**
- Project portfolio management
- Public portfolio generation
- Portfolio exports (PDF, HTML, JSON)
- GitHub integration

**Endpoints:**
- `GET /api/v1/portfolio/users/:userId`
- `POST /api/v1/portfolio/users/:userId/generate-public`
- `POST /api/v1/portfolio/users/:userId/export`

### 8. Review Service
**Responsibilities:**
- Project submission
- Rubric-based review
- Line-by-line code comments
- Feedback threads

**Endpoints:**
- `POST /api/v1/projects/submit`
- `POST /api/v1/projects/submissions/:submissionId/reviews`
- `POST /api/v1/projects/submissions/:submissionId/comments`

## Data Flow

### User Learning Journey

```
1. User Registration
   ↓
2. Diagnostic Assessment
   ↓
3. Entry Point Recommendation
   ↓
4. Module Selection
   ↓
5. Daily Content Navigation
   ↓
6. Chapter Completion
   ↓
7. Progress Tracking
   ↓
8. Milestone Unlocking
   ↓
9. Project Submission
   ↓
10. Review and Feedback
    ↓
11. Portfolio Building
    ↓
12. Certificate Generation
```

### Code Execution Flow

```
1. User writes code in playground
   ↓
2. Frontend sends code to Code Execution Service
   ↓
3. Service creates Docker container
   ↓
4. Code executes in isolated sandbox
   ↓
5. Results captured (stdout, stderr, test results)
   ↓
6. Container destroyed
   ↓
7. Results returned to frontend
   ↓
8. Frontend displays output
```

## Database Schema

### Core Tables

**users**
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- name (VARCHAR)
- password_hash (VARCHAR)
- created_at (TIMESTAMP)

**modules**
- id (VARCHAR, PK)
- title (VARCHAR)
- description (TEXT)
- order (INTEGER)
- duration_weeks (INTEGER)
- entry_point (ENUM)

**chapters**
- id (VARCHAR, PK)
- module_id (VARCHAR, FK)
- title (VARCHAR)
- slug (VARCHAR)
- content (TEXT)
- order (INTEGER)
- is_checkpoint (BOOLEAN)
- daily_content_id (VARCHAR, FK)

**weeks**
- id (VARCHAR, PK)
- module_id (VARCHAR, FK)
- week_number (INTEGER)
- title (VARCHAR)
- description (TEXT)
- estimated_hours (INTEGER)

**daily_content**
- id (VARCHAR, PK)
- week_id (VARCHAR, FK)
- day_number (INTEGER)
- title (VARCHAR)
- topic (VARCHAR)
- estimated_hours (INTEGER)
- type (ENUM: lesson, mini-project, flagship-project)

**milestones**
- id (VARCHAR, PK)
- module_id (VARCHAR, FK)
- title (VARCHAR)
- description (TEXT)
- icon (VARCHAR)
- unlock_criteria (JSONB)
- order (INTEGER)

**progress**
- id (UUID, PK)
- user_id (UUID, FK)
- chapter_id (VARCHAR, FK)
- completed_at (TIMESTAMP)
- time_spent_seconds (INTEGER)

**project_submissions**
- id (UUID, PK)
- user_id (UUID, FK)
- chapter_id (VARCHAR, FK)
- github_url (VARCHAR)
- demo_url (VARCHAR)
- description (TEXT)
- status (ENUM)
- submitted_at (TIMESTAMP)

**project_reviews**
- id (UUID, PK)
- submission_id (UUID, FK)
- reviewer_id (UUID, FK)
- code_quality_score (INTEGER)
- documentation_score (INTEGER)
- testing_score (INTEGER)
- deployment_score (INTEGER)
- overall_score (INTEGER)
- recommendation (ENUM)
- created_at (TIMESTAMP)

## API Design

### RESTful Principles
- Resource-based URLs
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes (200, 201, 400, 401, 404, 500)
- JSON request/response format

### Versioning
- URL versioning: `/api/v1/`
- Backward compatibility maintained

### Authentication
- JWT tokens in Authorization header
- Token expiration: 24 hours
- Refresh token mechanism

### Rate Limiting
- 100 requests per minute per user
- 1000 requests per hour per IP

## Security Architecture

### Authentication & Authorization
- JWT-based authentication
- OAuth 2.0 for social login
- Role-based access control (RBAC)
- MFA support

### Data Security
- Encryption at rest (AES-256)
- TLS 1.3 for data in transit
- PII anonymization
- GDPR compliance

### Code Execution Security
- Docker container isolation
- No internet access in sandboxes
- Resource limits (512MB RAM, 1 CPU, 30s timeout)
- Library allowlist
- Input sanitization

## Scalability and Performance

### Horizontal Scaling
- Kubernetes horizontal pod autoscaling
- Load balancing across pods
- Stateless services

### Caching Strategy
- Redis for session storage
- Content caching (1 hour TTL)
- CDN for static assets

### Database Optimization
- Connection pooling (20 connections)
- Query optimization with indexes
- Read replicas for analytics

### Performance Targets
- Page load: < 2 seconds
- API response: < 500ms
- Code execution: < 5 seconds
- Concurrent users: 10,000+

## Deployment Architecture

### Environments
- **Development**: Local Docker Compose
- **Staging**: Kubernetes cluster (staging namespace)
- **Production**: Kubernetes cluster (prod namespace)

### CI/CD Pipeline
1. Code push to GitHub
2. Automated tests run
3. Docker images built
4. Images pushed to registry
5. Kubernetes deployment updated
6. Health checks performed
7. Rollback if failures detected

### Blue-Green Deployment
- Two identical production environments
- Traffic switched after validation
- Instant rollback capability

## Decision Records

### ADR-001: Microservices Architecture
**Decision**: Use microservices instead of monolith
**Rationale**: Better scalability, independent deployment, technology flexibility
**Consequences**: Increased complexity, distributed system challenges

### ADR-002: PostgreSQL as Primary Database
**Decision**: Use PostgreSQL over MongoDB
**Rationale**: Strong ACID guarantees, complex queries, mature ecosystem
**Consequences**: Schema migrations required, less flexible for unstructured data

### ADR-003: React for Frontend
**Decision**: Use React over Vue or Angular
**Rationale**: Large ecosystem, TypeScript support, component reusability
**Consequences**: Learning curve, bundle size considerations

### ADR-004: Docker for Code Execution
**Decision**: Use Docker containers for code sandboxing
**Rationale**: Strong isolation, resource limits, mature technology
**Consequences**: Container overhead, orchestration complexity

## Future Enhancements

1. **Real-time Collaboration**: WebSocket-based pair programming
2. **AI-Powered Hints**: LLM-based code suggestions
3. **Video Content**: Integrated video lessons
4. **Mobile Apps**: Native iOS and Android apps
5. **Gamification**: Points, badges, leaderboards
6. **Community Features**: Forums, Q&A, peer reviews
7. **Advanced Analytics**: ML-based dropout prediction
8. **Multi-language Support**: Internationalization (i18n)

## References

- [API Documentation](/api-docs)
- [Deployment Guide](./DEPLOYMENT.md)
- [Developer Onboarding](./ONBOARDING.md)
- [Database Schema](./DATABASE_SCHEMA.md)
