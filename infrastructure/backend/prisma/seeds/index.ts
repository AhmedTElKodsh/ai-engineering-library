import { PrismaClient } from '@prisma/client';
import { seedModules } from './modules.seed';
import { seedMilestones } from './milestones.seed';
import { seedModule0Content } from './module0-content.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database seeding...\n');
  
  try {
    // Seed modules first
    await seedModules();
    
    // Seed milestones
    await seedMilestones();
    
    // Seed module content
    await seedModule0Content();
    // TODO: Add other modules (1-6) content seeding
    
    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
