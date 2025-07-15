const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Genkit imports
const { genkit } = require('@genkit-ai/core');
const { googleAI } = require('@genkit-ai/googleai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Genkit
const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash', // or gemini-1.5-pro for more complex queries
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Building Code context for AI
const BUILDING_CODE_CONTEXT = `
You are an expert AI assistant for the Building Code of Australia (BCA) 2022, Volumes 1 & 2. 
You help users understand building codes, regulations, and compliance requirements.

Key areas you should be knowledgeable about:
- Fire safety requirements and egress provisions
- Accessibility standards and design requirements
- Structural provisions and load requirements
- Energy efficiency and thermal performance
- Residential building requirements (Class 1 & 2)
- Commercial building requirements (Class 3-9)
- Health and amenity provisions
- Building classifications and their requirements

Always provide accurate, helpful information and reference specific clauses where applicable.
If you're unsure about specific clause details, recommend consulting the official BCA documentation.
Use a professional but conversational tone suitable for building professionals and property owners.
`;

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create prompt with Building Code context
    const prompt = `${BUILDING_CODE_CONTEXT}

User Question: ${message}

Please provide a comprehensive, accurate response about the Building Code of Australia 2022:`;

    // Generate response using Genkit
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: prompt,
      config: {
        temperature: 0.3, // Lower temperature for more factual responses
        maxOutputTokens: 2048,
      }
    });

    res.json({ 
      response: response.text(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      message: 'Please try again later.'
    });
  }
});

// Search endpoint
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Simulated search results (replace with actual search implementation)
    const searchResults = simulateSearch(query);
    
    res.json({
      results: searchResults,
      query: query,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Search failed',
      message: 'Please try again later.'
    });
  }
});

// Simulate search functionality
function simulateSearch(query) {
  const buildingCodeData = [
    {
      clause: "3.7.1",
      title: "Fire Safety - General Requirements",
      content: "Buildings must be designed and constructed to provide occupants with a reasonable degree of safety from injury or illness caused by fire. This includes provisions for detection, suppression, and safe egress.",
      volume: "Volume 1",
      section: "Section 3 - Fire Resistance and Stability"
    },
    {
      clause: "3.7.2",
      title: "Fire Detection and Alarm Systems",
      content: "Automatic fire detection and alarm systems must be installed in accordance with AS 1670.1. Systems must provide early warning to occupants and connect to fire services where required.",
      volume: "Volume 1",
      section: "Section 3 - Fire Resistance and Stability"
    },
    {
      clause: "2.4.1",
      title: "Accessibility - General Access Requirements",
      content: "Buildings must provide equitable and dignified access for people with disabilities. Access must be provided from the boundary to and within the building, including to facilities and services.",
      volume: "Volume 1",
      section: "Section 2 - Access and Egress"
    },
    {
      clause: "1.5.1",
      title: "Structural Adequacy",
      content: "Buildings and structures must be designed to withstand the loads and forces they may reasonably be expected to experience during construction and use, without loss of amenity.",
      volume: "Volume 1",
      section: "Section 1 - Structural Provisions"
    },
    {
      clause: "4.2.1",
      title: "Energy Efficiency - Thermal Performance",
      content: "Building thermal envelope must meet energy efficiency requirements to reduce greenhouse gas emissions and provide thermal comfort for occupants.",
      volume: "Volume 2",
      section: "Section 4 - Health and Amenity"
    }
  ];

  const lowerQuery = query.toLowerCase();
  return buildingCodeData.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.content.toLowerCase().includes(lowerQuery) ||
    item.clause.toLowerCase().includes(lowerQuery)
  ).slice(0, 10);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on our end.'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested resource was not found.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Building Code AI Assistant server running on port ${PORT}`);
  console.log(`Frontend available at: http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/chat - AI chat responses`);
  console.log(`  POST /api/search - Search building code`);
  console.log(`  GET /api/health - Health check`);
});

module.exports = app;