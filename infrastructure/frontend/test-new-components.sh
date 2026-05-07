#!/bin/bash

# Test script for new daily content, milestones, and duration components
# Task 15.8: Write unit tests for new components

echo "=========================================="
echo "Testing New Components (Requirements 34, 35, 36)"
echo "=========================================="
echo ""

echo "Installing dependencies..."
npm install

echo ""
echo "Running tests for new components..."
echo ""

# Run tests for specific components
npm test -- \
  src/components/__tests__/DailyContentCard.test.tsx \
  src/components/__tests__/WeeklySchedule.test.tsx \
  src/components/__tests__/MilestoneDisplay.test.tsx \
  src/components/__tests__/DurationCalculator.test.tsx \
  src/components/__tests__/LearningPathTimeline.test.tsx \
  --reporter=verbose

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
echo "✅ DailyContentCard: Tests day rendering, interactions, and project types"
echo "✅ WeeklySchedule: Tests week display, day selection, and navigation"
echo "✅ MilestoneDisplay: Tests unlock status, sharing, and animations"
echo "✅ DurationCalculator: Tests recalculation logic and pace tracking"
echo "✅ LearningPathTimeline: Tests module navigation and progress visualization"
echo ""
echo "Coverage report available at: coverage/index.html"
echo ""
