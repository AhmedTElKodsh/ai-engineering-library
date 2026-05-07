# Setup script for test environment (Windows PowerShell)
# This script sets up PostgreSQL and Redis for integration tests

Write-Host "🚀 Setting up test environment..." -ForegroundColor Cyan

# Check if PostgreSQL is installed
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-Host "❌ PostgreSQL is not installed" -ForegroundColor Red
    Write-Host "Please install PostgreSQL: https://www.postgresql.org/download/" -ForegroundColor Yellow
    exit 1
}

# Check if Redis is installed
$redisPath = Get-Command redis-cli -ErrorAction SilentlyContinue
if (-not $redisPath) {
    Write-Host "❌ Redis is not installed" -ForegroundColor Red
    Write-Host "Please install Redis: https://redis.io/download" -ForegroundColor Yellow
    Write-Host "For Windows, you can use: https://github.com/microsoftarchive/redis/releases" -ForegroundColor Yellow
    exit 1
}

# Check if PostgreSQL is running
try {
    $pgReady = & pg_isready 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "PostgreSQL not ready"
    }
    Write-Host "✅ PostgreSQL is running" -ForegroundColor Green
} catch {
    Write-Host "❌ PostgreSQL is not running" -ForegroundColor Red
    Write-Host "Please start PostgreSQL service" -ForegroundColor Yellow
    exit 1
}

# Check if Redis is running
try {
    $redisPing = & redis-cli ping 2>&1
    if ($redisPing -ne "PONG") {
        throw "Redis not responding"
    }
    Write-Host "✅ Redis is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Redis is not running" -ForegroundColor Red
    Write-Host "Please start Redis service" -ForegroundColor Yellow
    exit 1
}

# Create test database if it doesn't exist
$dbName = "ai_curriculum_test"
$dbExists = & psql -lqt | Select-String -Pattern $dbName

if ($dbExists) {
    Write-Host "⚠️  Test database '$dbName' already exists" -ForegroundColor Yellow
    $response = Read-Host "Do you want to drop and recreate it? (y/N)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host "Dropping existing database..." -ForegroundColor Yellow
        & dropdb $dbName
        Write-Host "Creating test database..." -ForegroundColor Cyan
        & createdb $dbName
        Write-Host "✅ Test database recreated" -ForegroundColor Green
    }
} else {
    Write-Host "Creating test database..." -ForegroundColor Cyan
    & createdb $dbName
    Write-Host "✅ Test database created" -ForegroundColor Green
}

# Create .env.test file if it doesn't exist
if (-not (Test-Path .env.test)) {
    Write-Host "Creating .env.test file..." -ForegroundColor Cyan
    
    # Generate random JWT secret
    $bytes = New-Object byte[] 16
    [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $jwtSecret = "test-secret-key-" + [System.BitConverter]::ToString($bytes).Replace("-", "").ToLower()
    
    $envContent = @"
NODE_ENV=test
TEST_DATABASE_URL=postgresql://localhost:5432/$dbName
TEST_REDIS_URL=redis://localhost:6379
JWT_SECRET=$jwtSecret
"@
    
    Set-Content -Path .env.test -Value $envContent
    Write-Host "✅ .env.test file created" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env.test file already exists" -ForegroundColor Yellow
}

# Run database migrations
Write-Host "Running database migrations..." -ForegroundColor Cyan
$env:DATABASE_URL = "postgresql://localhost:5432/$dbName"
npm run prisma:generate
npm run prisma:migrate
Write-Host "✅ Database migrations completed" -ForegroundColor Green

# Flush Redis test database
Write-Host "Flushing Redis test database..." -ForegroundColor Cyan
& redis-cli FLUSHDB
Write-Host "✅ Redis flushed" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Test environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now run tests with:" -ForegroundColor Cyan
Write-Host "  npm test" -ForegroundColor White
Write-Host "  npm run test:integration" -ForegroundColor White
Write-Host "  npm run test:watch" -ForegroundColor White
Write-Host ""
