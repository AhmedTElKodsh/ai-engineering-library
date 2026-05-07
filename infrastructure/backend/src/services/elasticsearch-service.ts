import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
});

export async function connectElasticSearch(): Promise<void> {
  try {
    const health = await esClient.cluster.health({});
    console.log('📡 ElasticSearch connected', health.status);
  } catch (error) {
    console.error('ElasticSearch connection failed', error);
  }
}

export async function createIndex(index: string, mappings: any): Promise<void> {
  const exists = await esClient.indices.exists({ index });
  if (!exists) {
    await esClient.indices.create({
      index,
      mappings,
      settings: {
        analysis: {
          analyzer: {
            code_analyzer: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['lowercase', 'stop'],
            },
          },
        },
      },
    });
  }
}

export async function indexDocument(index: string, id: string, document: any): Promise<void> {
  await esClient.index({
    index,
    id,
    body: document,
  });
}

export async function searchDocuments(index: string, query: any, from = 0, size = 10): Promise<any> {
  const result = await esClient.search({
    index,
    query,
    from,
    size,
  });
  return result.hits.hits;
}

export async function deleteDocument(index: string, id: string): Promise<void> {
  await esClient.delete({
    index,
    id,
  });
}

export async function updateDocument(index: string, id: string, doc: any): Promise<void> {
  await esClient.update({
    index,
    id,
    body: {
      doc,
    },
  });
}

// Initialize indices for curriculum content
export async function initializeElasticSearchIndices(): Promise<void> {
  // Chapters index
  await createIndex('chapters', {
    properties: {
      title: { type: 'text' },
      content: { type: 'text', analyzer: 'code_analyzer' },
      moduleId: { type: 'keyword' },
      chapterId: { type: 'keyword' },
    },
  });

  // Code examples index
  await createIndex('code_examples', {
    properties: {
      code: { type: 'text', analyzer: 'code_analyzer' },
      language: { type: 'keyword' },
      chapterId: { type: 'keyword' },
    },
  });

  // Glossary index
  await createIndex('glossary', {
    properties: {
      term: { type: 'text' },
      definition: { type: 'text' },
    },
  });
}

export default esClient;