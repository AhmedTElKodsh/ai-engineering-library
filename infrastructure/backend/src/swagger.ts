import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Engineering Curriculum Platform API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for the AI Engineering Curriculum Platform',
      contact: {
        name: 'API Support',
        email: 'support@aicurriculum.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://staging-api.aicurriculum.com',
        description: 'Staging server'
      },
      {
        url: 'https://api.aicurriculum.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Module: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            order: { type: 'integer' },
            duration_weeks: { type: 'integer' },
            entry_point: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] }
          }
        },
        Chapter: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            module_id: { type: 'string' },
            title: { type: 'string' },
            slug: { type: 'string' },
            content: { type: 'string' },
            order: { type: 'integer' },
            estimated_minutes: { type: 'integer' },
            is_checkpoint: { type: 'boolean' }
          }
        },
        Week: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            module_id: { type: 'string' },
            week_number: { type: 'integer' },
            title: { type: 'string' },
            description: { type: 'string' },
            estimated_hours: { type: 'integer' }
          }
        },
        DailyContent: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            week_id: { type: 'string' },
            day_number: { type: 'integer' },
            title: { type: 'string' },
            topic: { type: 'string' },
            estimated_hours: { type: 'integer' },
            type: { type: 'string', enum: ['lesson', 'mini-project', 'flagship-project'] },
            is_completed: { type: 'boolean' }
          }
        },
        Milestone: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            module_id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            icon: { type: 'string' },
            unlock_criteria: { type: 'object' },
            order: { type: 'integer' },
            is_unlocked: { type: 'boolean' },
            unlocked_at: { type: 'string', format: 'date-time' }
          }
        },
        Progress: {
          type: 'object',
          properties: {
            user_id: { type: 'string' },
            module_id: { type: 'string' },
            chapters_completed: { type: 'integer' },
            total_chapters: { type: 'integer' },
            percentage: { type: 'number' },
            last_accessed: { type: 'string', format: 'date-time' }
          }
        },
        ProjectSubmission: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            user_id: { type: 'string' },
            chapter_id: { type: 'string' },
            github_url: { type: 'string', format: 'uri' },
            demo_url: { type: 'string', format: 'uri' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['not-submitted', 'pending-review', 'reviewed', 'revision-requested', 'approved'] },
            submitted_at: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            statusCode: { type: 'integer' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'AI Curriculum API Docs'
  }));
  
  // JSON spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log('📚 API Documentation available at /api-docs');
}
