#!/bin/bash

# Setup script for test environment
# This script sets up PostgreSQL and Redis for integration tests

set -e

echo "🚀 Setting up test environment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not installed${NC}"
    echo "Please install PostgreSQL: https://www.postgresql.org/download/"
    exit 1
fi

# Check if Redis is installed
if ! command -v redis-cli &> /dev/null; then
    echo -e "${RED}❌ Redis is not installed${NC}"
    echo "Please install Redis: https://redis.io/download"
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not running${NC}"
    echo "Please start PostgreSQL service"
    exit 1
fi

# Check if Redis is running
if ! redis-cli ping &> /dev/null; then
    echo -e "${RED}❌ Redis is not running${NC}"
    echo "Please start Redis service"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL is running${NC}"
echo -e "${GREEN}✅ Redis is running${NC}"

# Create test database if it doesn't exist
DB_NAME="ai_curriculum_test"
if psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo -e "${YELLOW}⚠️  Test database '$DB_NAME' already exists${NC}"
    read -p "Do you want to drop and recreate it? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Dropping existing database..."
        dropdb $DB_NAME
        echo "Creating test database..."
        createdb $DB_NAME
        echo -e "${GREEN}✅ Test database recreated${NC}"
    fi
else
    echo "Creating test database..."
    createdb $DB_NAME
    echo -e "${GREEN}✅ Test database created${NC}"
fi

# Create .env.test file if it doesn't exist
if [ ! -f .env.test ]; then
    echo "Creating .env.test file..."
    cat > .env.test << EOF
NODE_ENV=test
TEST_DATABASE_URL=postgresql://localhost:5432/$DB_NAME
TEST_REDIS_URL=redis://localhost:6379
JWT_SECRET=test-secret-key-$(openssl rand -hex 16)
EOF
    echo -e "${GREEN}✅ .env.test file created${NC}"
else
    echo -e "${YELLOW}⚠️  .env.test file already exists${NC}"
fi

# Run database migrations
echo "Running database migrations..."
export DATABASE_URL="postgresql://localhost:5432/$DB_NAME"
npm run prisma:generate
npm run prisma:migrate
echo -e "${GREEN}✅ Database migrations completed${NC}"

# Flush Redis test database
echo "Flushing Redis test database..."
redis-cli FLUSHDB
echo -e "${GREEN}✅ Redis flushed${NC}"

echo ""
echo -e "${GREEN}🎉 Test environment setup complete!${NC}"
echo ""
echo "You can now run tests with:"
echo "  npm test"
echo "  npm run test:integration"
echo "  npm run test:watch"
echo ""
