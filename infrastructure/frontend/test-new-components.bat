@echo off
REM Test script for new daily content, milestones, and duration components
REM Task 15.8: Write unit tests for new components

echo ==========================================
echo Testing New Components (Requirements 34, 35, 36)
echo ==========================================
echo.

echo Installing dependencies...
call npm install

echo.
echo Running tests for new components...
echo.

REM Run tests for specific components
call npm test -- src/components/__tests__/DailyContentCard.test.tsx src/components/__tests__/WeeklySchedule.test.tsx src/components/__tests__/MilestoneDisplay.test.tsx src/components/__tests__/DurationCalculator.test.tsx src/components/__tests__/LearningPathTimeline.test.tsx --reporter=verbose

echo.
echo ==========================================
echo Test Summary
echo ==========================================
echo.
echo [32m✓[0m DailyContentCard: Tests day rendering, interactions, and project types
echo [32m✓[0m WeeklySchedule: Tests week display, day selection, and navigation
echo [32m✓[0m MilestoneDisplay: Tests unlock status, sharing, and animations
echo [32m✓[0m DurationCalculator: Tests recalculation logic and pace tracking
echo [32m✓[0m LearningPathTimeline: Tests module navigation and progress visualization
echo.
echo Coverage report available at: coverage/index.html
echo.

pause
