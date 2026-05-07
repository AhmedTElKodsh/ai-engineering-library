# Deployment Guide

## AI Engineering Curriculum Platform

This guide covers deploying the AI Engineering Curriculum Platform to production using Kubernetes.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Infrastructure Services](#infrastructure-services)
7. [Monitoring and Logging](#monitoring-and-logging)
8. [Rollback Procedures](#rollback-procedures)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

- Kubernetes cluster (v1.24+)
- kubectl configured
- Docker installed
- PostgreSQL 15+
- Redis 7+
- ElasticSearch 8+
- AWS S3 bucket (or compatible object storage)
- Domain name and SSL certificates

## Environment Setup

### 1. Create Namespaces

```bash
kubectl create namespace ai-curriculum-dev
kubectl create namespace ai-curriculum-staging
kubectl create namespace ai-curriculum-prod
```

### 2. Configure Secrets

Create a `.env.production` file:

```env
# Database
DATABASE_URL=postgresql://user:password@postgres:5432/ai_curriculum
DATABASE_POOL_SIZE=20

# Redis
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=your-redis-password

# S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=ai-curriculum-content
AWS_REGION=us-east-1

# ElasticSearch
ELASTICSEARCH_URL=http://elasticsearch:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your-es-password

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRATION=24h

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Application
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://aicurriculum.com
```

Create Kubernetes secret:

```bash
kubectl create secret generic app-secrets \
  --from-env-file=.env.production \
  --namespace=ai-curriculum-prod
```

## Database Setup

### 1. Deploy PostgreSQL

```bash
kubectl apply -f infrastructure/kubernetes/postgres-deployment.yaml
```

### 2. Run Migrations

```bash
# Port forward to database
kubectl port-forward svc/postgres 5432:5432 -n ai-curriculum-prod

# Run migrations
cd backend
npm run migrate:prod

# Seed initial data
npm run seed:prod
```

## Backend Deployment

### 1. Build Docker Image

```bash
cd backend
docker build -t ai-curriculum-backend:v1.0.0 .
docker tag ai-curriculum-backend:v1.0.0 your-registry/ai-curriculum-backend:v1.0.0
docker push your-registry/ai-curriculum-backend:v1.0.0
```

### 2. Deploy to Kubernetes

```bash
kubectl apply -f infrastructure/kubernetes/backend-deployment.yaml
kubectl apply -f infrastructure/kubernetes/backend-service.yaml
```

### 3. Verify Deployment

```bash
kubectl get pods -n ai-curriculum-prod
kubectl logs -f deployment/backend -n ai-curriculum-prod
```

## Frontend Deployment

### 1. Build Docker Image

```bash
cd frontend
docker build -t ai-curriculum-frontend:v1.0.0 .
docker tag ai-curriculum-frontend:v1.0.0 your-registry/ai-curriculum-frontend:v1.0.0
docker push your-registry/ai-curriculum-frontend:v1.0.0
```

### 2. Deploy to Kubernetes

```bash
kubectl apply -f infrastructure/kubernetes/frontend-deployment.yaml
kubectl apply -f infrastructure/kubernetes/frontend-service.yaml
```

### 3. Configure Ingress

```bash
kubectl apply -f infrastructure/kubernetes/ingress.yaml
```

## Infrastructure Services

### Redis

```bash
kubectl apply -f infrastructure/kubernetes/redis-deployment.yaml
```

### ElasticSearch

```bash
kubectl apply -f infrastructure/kubernetes/elasticsearch-deployment.yaml
```

### Horizontal Pod Autoscaling

```bash
kubectl apply -f infrastructure/kubernetes/hpa.yaml
```

## Monitoring and Logging

### 1. Deploy Monitoring Stack

```bash
# Prometheus
kubectl apply -f infrastructure/kubernetes/prometheus-deployment.yaml

# Grafana
kubectl apply -f infrastructure/kubernetes/grafana-deployment.yaml
```

### 2. Access Dashboards

```bash
# Grafana
kubectl port-forward svc/grafana 3000:3000 -n ai-curriculum-prod

# Prometheus
kubectl port-forward svc/prometheus 9090:9090 -n ai-curriculum-prod
```

### 3. Configure Alerts

Edit `infrastructure/kubernetes/prometheus-alerts.yaml` and apply:

```bash
kubectl apply -f infrastructure/kubernetes/prometheus-alerts.yaml
```

## Rollback Procedures

### Rollback Deployment

```bash
# View deployment history
kubectl rollout history deployment/backend -n ai-curriculum-prod

# Rollback to previous version
kubectl rollout undo deployment/backend -n ai-curriculum-prod

# Rollback to specific revision
kubectl rollout undo deployment/backend --to-revision=2 -n ai-curriculum-prod
```

### Rollback Database Migration

```bash
# Connect to database
kubectl exec -it postgres-0 -n ai-curriculum-prod -- psql -U postgres ai_curriculum

# Run rollback migration
npm run migrate:rollback
```

## Blue-Green Deployment

### 1. Deploy New Version (Green)

```bash
# Update image tag in deployment
kubectl set image deployment/backend backend=your-registry/ai-curriculum-backend:v1.1.0 -n ai-curriculum-prod

# Wait for rollout
kubectl rollout status deployment/backend -n ai-curriculum-prod
```

### 2. Test Green Deployment

```bash
# Port forward to test
kubectl port-forward deployment/backend 3001:3000 -n ai-curriculum-prod

# Run smoke tests
npm run test:smoke -- --url=http://localhost:3001
```

### 3. Switch Traffic

```bash
# Update service selector to point to new version
kubectl patch service backend -p '{"spec":{"selector":{"version":"v1.1.0"}}}' -n ai-curriculum-prod
```

### 4. Rollback if Needed

```bash
# Switch back to blue
kubectl patch service backend -p '{"spec":{"selector":{"version":"v1.0.0"}}}' -n ai-curriculum-prod
```

## Troubleshooting

### Pod Not Starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n ai-curriculum-prod

# Check logs
kubectl logs <pod-name> -n ai-curriculum-prod

# Check events
kubectl get events -n ai-curriculum-prod --sort-by='.lastTimestamp'
```

### Database Connection Issues

```bash
# Test database connectivity
kubectl run -it --rm debug --image=postgres:15 --restart=Never -- psql -h postgres -U postgres

# Check database logs
kubectl logs postgres-0 -n ai-curriculum-prod
```

### High Memory Usage

```bash
# Check resource usage
kubectl top pods -n ai-curriculum-prod

# Increase memory limits
kubectl set resources deployment/backend --limits=memory=2Gi -n ai-curriculum-prod
```

### SSL Certificate Issues

```bash
# Check certificate
kubectl describe certificate ai-curriculum-tls -n ai-curriculum-prod

# Renew certificate
kubectl delete certificate ai-curriculum-tls -n ai-curriculum-prod
kubectl apply -f infrastructure/kubernetes/certificate.yaml
```

## Health Checks

### Backend Health

```bash
curl https://api.aicurriculum.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "services": {
    "database": "connected",
    "redis": "connected",
    "elasticsearch": "connected"
  }
}
```

### Frontend Health

```bash
curl https://aicurriculum.com/health
```

## Performance Optimization

### Enable CDN Caching

Configure CloudFront distribution:

```bash
aws cloudfront create-distribution \
  --origin-domain-name aicurriculum.com \
  --default-cache-behavior MinTTL=0,MaxTTL=31536000
```

### Database Query Optimization

```sql
-- Create indexes
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_chapters_module_id ON chapters(module_id);
CREATE INDEX idx_milestones_module_id ON milestones(module_id);
```

## Backup and Recovery

### Database Backup

```bash
# Create backup
kubectl exec postgres-0 -n ai-curriculum-prod -- pg_dump -U postgres ai_curriculum > backup.sql

# Restore backup
kubectl exec -i postgres-0 -n ai-curriculum-prod -- psql -U postgres ai_curriculum < backup.sql
```

### S3 Backup

```bash
# Sync S3 bucket
aws s3 sync s3://ai-curriculum-content s3://ai-curriculum-content-backup
```

## Security Checklist

- [ ] SSL/TLS certificates configured
- [ ] Secrets stored in Kubernetes secrets
- [ ] Network policies configured
- [ ] RBAC roles defined
- [ ] Pod security policies enabled
- [ ] Database encryption at rest
- [ ] Regular security updates
- [ ] Vulnerability scanning enabled

## Support

For deployment issues, contact:
- DevOps Team: devops@aicurriculum.com
- Slack: #ai-curriculum-deployments
- On-call: +1-555-0100
