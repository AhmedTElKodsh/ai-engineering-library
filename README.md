# AI Engineering Curriculum Platform

A comprehensive, production-ready educational platform for learning AI Engineering with interactive content, project portfolios, and personalized learning paths.

## 🚀 Features

### Core Learning Experience
- **7 Curriculum Modules** (Module 0-6) covering Python to Production AI
- **30 Weeks of Content** organized into daily lessons
- **Daily Content Structure** with mini-projects (Day 5) and flagship projects (final week)
- **Interactive Learning Elements**: Code playgrounds, explorable explanations, scrollytelling
- **Visual Diagrams** with Mermaid.js integration

### Progress & Achievements
- **21 Success Milestones** across all modules with social sharing
- **Progress Tracking** with real-time updates
- **Duration Calculation** with personalized completion estimates (19-30 weeks)
- **Pace Tracking** with weekly hour commitments and adjustment recommendations
- **Checkpoint Assessments** with gap analysis

### Projects & Portfolio
- **Project Submission System** with GitHub integration
- **Rubric-Based Reviews** (code quality, documentation, testing, deployment)
- **Line-by-Line Code Comments** with severity levels
- **Revision Tracking** with feedback threads
- **Public Portfolio** with unique shareable URLs
- **Portfolio Exports** (PDF, HTML, JSON)

### Assessment & Personalization
- **Diagnostic Assessment** for entry point recommendations
- **5 Learning Paths** (beginner to advanced)
- **Adaptive Content** based on progress and performance
- **Custom Learning Pace** with flexible weekly hours

### Technical Features
- **Offline Access** with Progressive Web App (PWA)
- **Mobile Responsive** design
- **Code Execution** in secure Docker sandboxes
- **Search & Navigation** with ElasticSearch
- **Analytics Dashboard** for learners and instructors
- **WCAG 2.1 Level AA** accessibility compliance

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- AWS Account (for S3)

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/ai-curriculum-platform.git
cd ai-curriculum-platform

# Install dependencies
npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start infrastructure services
docker-compose up -d postgres redis elasticsearch

# Run database migrations
cd backend
npm run prisma:migrate
npm run prisma:seed

# Start backend
npm run dev

# In another terminal, start frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗️ Architecture

The platform uses a **microservices architecture** with the following components:

```
Frontend (React/TypeScript)
    ↓
API Gateway (Express)
    ↓
┌─────────────┬─────────────┬─────────────┐
│   User      │  Content    │  Progress   │
│   Service   │  Service    │  Service    │
├─────────────┼─────────────┼─────────────┤
│ Assessment  │  Code Exec  │  Analytics  │
│  Service    │  Service    │  Service    │
├─────────────┼─────────────┼─────────────┤
│ Portfolio   │  Review     │  Milestone  │
│  Service    │  Service    │  Service    │
└─────────────┴─────────────┴─────────────┘
    ↓
┌─────────────┬─────────────┬─────────────┐
│ PostgreSQL  │   Redis     │ElasticSearch│
└─────────────┴─────────────┴─────────────┘
    ↓
  AWS S3
```

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed documentation.

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **Mermaid.js** for diagrams
- **Vite** for build tooling

### Backend
- **Node.js 18+** with TypeScript
- **Express.js** for API
- **Prisma** for database ORM
- **JWT** for authentication
- **Docker** for code sandboxing
- **Winston** for logging

### Infrastructure
- **PostgreSQL 15+** (primary database)
- **Redis 7+** (caching & sessions)
- **ElasticSearch 8+** (search)
- **AWS S3** (object storage)
- **Kubernetes** (orchestration)
- **CloudFront** (CDN)

## 📦 Installation

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development

### Project Structure

```
ai-curriculum-platform/
├── backend/
│   ├── src/
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seeds/           # Seed data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   └── main.tsx         # Entry point
│   ├── public/
│   │   ├── service-worker.js
│   │   └── manifest.json
│   └── package.json
├── infrastructure/
│   └── kubernetes/          # K8s manifests
├── docs/                    # Documentation
└── package.json             # Root package.json
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

### Code Quality

```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

## 🚀 Deployment

### Docker Build

```bash
# Build backend
cd backend
docker build -t ai-curriculum-backend:latest .

# Build frontend
cd frontend
docker build -t ai-curriculum-frontend:latest .
```

### Kubernetes Deployment

```bash
# Create namespace
kubectl create namespace ai-curriculum-prod

# Apply configurations
kubectl apply -f infrastructure/kubernetes/

# Verify deployment
kubectl get pods -n ai-curriculum-prod
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## 📚 API Documentation

API documentation is available at `/api-docs` when running the backend server.

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh JWT token

#### Content
- `GET /api/v1/content/modules` - List all modules
- `GET /api/v1/content/chapters/:id` - Get chapter content
- `GET /api/v1/content/modules/:id/weeks` - Get weekly schedule

#### Progress
- `POST /api/v1/progress/chapters/:id/complete` - Mark chapter complete
- `GET /api/v1/progress/users/:id` - Get user progress
- `GET /api/v1/progress/users/:id/duration` - Get duration estimate

#### Portfolio
- `GET /api/v1/portfolio/users/:id` - Get user portfolio
- `POST /api/v1/portfolio/users/:id/generate-public` - Generate public URL
- `POST /api/v1/portfolio/users/:id/export` - Export portfolio

#### Projects
- `POST /api/v1/projects/submit` - Submit project
- `POST /api/v1/projects/submissions/:id/reviews` - Submit review
- `POST /api/v1/projects/submissions/:id/comments` - Add code comment

## 🧪 Testing

### Unit Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

### Performance Tests

```bash
npm run test:performance
```

## 📊 Monitoring

### Health Check

```bash
curl http://localhost:3000/health
```

### Metrics

Access Prometheus metrics at `/metrics`

### Logs

Logs are stored in `backend/logs/`:
- `combined.log` - All logs
- `error.log` - Error logs only

## 🔒 Security

- **Authentication**: JWT with 24-hour expiration
- **Authorization**: Role-based access control (RBAC)
- **Code Execution**: Docker sandboxes with resource limits
- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: 100 requests/minute per user

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

- iOS 14+
- Android 10+
- Progressive Web App (PWA) support

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Team

- **Product**: John (PM)
- **Architecture**: Winston (Architect)
- **Development**: Amelia (Dev Lead)
- **UX Design**: Sally (UX Designer)
- **QA**: Murat (Test Architect)
- **Documentation**: Paige (Tech Writer)

## 📞 Support

- **Email**: support@aicurriculum.com
- **Slack**: #ai-curriculum-support
- **Issues**: [GitHub Issues](https://github.com/your-org/ai-curriculum-platform/issues)

## 🗺️ Roadmap

### Q1 2024
- [x] Core platform MVP
- [x] 7 curriculum modules
- [x] Portfolio system
- [x] Review workflow

### Q2 2024
- [ ] Mobile native apps
- [ ] Real-time collaboration
- [ ] AI-powered hints
- [ ] Video content integration

### Q3 2024
- [ ] Community features (forums, Q&A)
- [ ] Gamification (points, badges)
- [ ] Advanced analytics
- [ ] Multi-language support

## 📈 Stats

- **7 Modules**: Python to Production AI
- **30 Weeks**: Comprehensive curriculum
- **21 Milestones**: Achievement tracking
- **5 Learning Paths**: Beginner to Advanced
- **10,000+ Users**: Concurrent capacity

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- All contributors and supporters

---

**Built with ❤️ by the AI Curriculum Team**
