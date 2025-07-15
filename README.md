# Building Code AI Assistant

An intelligent chatbot application designed to help users understand and interpret the **Building Code of Australia (BCA) 2022 Volumes 1 & 2**. This AI-powered assistant provides conversational explanations, code searches, and expert guidance on building regulations and compliance requirements.

## ✨ Features

### 🤖 AI Chatbot
- **Conversational Interface**: Natural language interaction for building code queries
- **Expert Knowledge**: Specialized understanding of BCA 2022 requirements
- **Contextual Responses**: Relevant answers based on building classifications and specific clauses
- **Real-time Processing**: Powered by Google's Gemini AI through Genkit

### 🔍 Code Search
- **Keyword Search**: Find specific clauses, requirements, or topics
- **Smart Filtering**: Search across titles, content, and clause numbers
- **Highlighted Results**: Visual emphasis on matching terms
- **Relevance Ranking**: Most relevant results displayed first

### 💻 User Interface
- **Clean Design**: Modern, professional interface with Inter font
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use chat and search functionality
- **Professional Iconography**: Clear, recognizable icons throughout

### 📚 Coverage Areas
- **Fire Safety**: Detection systems, egress requirements, fire resistance
- **Accessibility**: Design standards, access requirements, AS 1428 compliance
- **Structural Provisions**: Load requirements, foundation design, material standards
- **Energy Efficiency**: Thermal performance, insulation requirements
- **Residential Buildings**: Class 1 & 2 specific requirements
- **Commercial Buildings**: Class 3-9 provisions
- **Health & Amenity**: Ventilation, lighting, space requirements

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **Google AI API Key** (for Gemini integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/building-code-ai-assistant.git
   cd building-code-ai-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Google AI API key:
   ```env
   GOOGLE_GENAI_API_KEY=your_actual_api_key_here
   ```

4. **Get Google AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create or sign in to your Google account
   - Generate a new API key
   - Copy the key to your `.env` file

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   - Open your browser to `http://localhost:3000`
   - Start chatting with the Building Code AI Assistant!

## 📋 Usage Guide

### Chat Interface

1. **Ask Questions**: Type your building code questions in the chat input
2. **Use Natural Language**: Ask questions like:
   - "What are the fire safety requirements for residential buildings?"
   - "Explain clause 3.7.2"
   - "What accessibility standards apply to commercial buildings?"
   - "How do I calculate structural loads?"

3. **Get Detailed Responses**: The AI provides comprehensive explanations with:
   - Relevant code provisions
   - Practical applications
   - References to specific clauses
   - Additional resources

### Search Functionality

1. **Keyword Search**: Use the search bar to find specific topics
2. **Search Examples**:
   - "fire safety"
   - "accessibility"
   - "3.7.1" (specific clause)
   - "residential"
   - "structural"

3. **Review Results**: Browse through matched clauses with highlighted search terms
4. **Clear Results**: Use the clear button to reset your search

### Tips for Best Results

- **Be Specific**: Include building class, specific requirements, or clause numbers
- **Use Technical Terms**: Building code terminology yields more accurate results
- **Ask Follow-ups**: Continue conversations for deeper understanding
- **Combine Features**: Use both chat and search for comprehensive research

## 🛠️ Development

### Available Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Start Genkit development environment
npm run genkit

# Serve static files only (frontend-only mode)
npm run serve
```

### Frontend-Only Mode

For frontend-only development without AI integration:

```bash
npm run serve
```

This starts a simple HTTP server on port 8000. The chat will use simulated responses instead of real AI.

### Project Structure

```
building-code-ai-assistant/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # Frontend JavaScript logic
├── server.js           # Express server with Genkit integration
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .env               # Your environment configuration (create this)
└── README.md          # This file
```

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Genkit, Gemini AI
- **Styling**: Inter font, FontAwesome icons
- **Architecture**: RESTful API with static frontend

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_GENAI_API_KEY` | Google AI API key for Gemini | Yes | - |
| `PORT` | Server port number | No | 3000 |
| `NODE_ENV` | Environment mode | No | development |
| `CORS_ORIGIN` | CORS allowed origin | No | http://localhost:3000 |

### Customization

#### Adding New Building Code Data
1. Edit the `loadBuildingCodeData()` function in `script.js`
2. Add new entries with clause, title, content, volume, and section
3. Update the search algorithm if needed

#### Modifying AI Responses
1. Edit the `BUILDING_CODE_CONTEXT` in `server.js`
2. Adjust the prompt structure for different response styles
3. Modify temperature and other generation parameters

#### Styling Customization
1. Update CSS variables in `style.css`
2. Modify the color scheme, fonts, or layout
3. Add new responsive breakpoints as needed

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This AI assistant is designed to provide general guidance on the Building Code of Australia 2022. It should not be considered as a substitute for:

- Professional building advice
- Certified building consultant services
- Official BCA documentation
- Local council regulations
- Professional engineering assessments

Always consult with qualified building professionals and refer to the official BCA documentation for compliance verification and specific project requirements.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/building-code-ai-assistant/issues)
- **Documentation**: This README and inline code comments
- **Official BCA**: [Australian Building Codes Board](https://www.abcb.gov.au/)

## 🏗️ Building Code Resources

- [Australian Building Codes Board (ABCB)](https://www.abcb.gov.au/)
- [Building Code of Australia (BCA) 2022](https://www.abcb.gov.au/building-codes-board/current-building-codes)
- [AS 1428 Series - Access and Mobility](https://www.standards.org.au/)
- [AS/NZS 1170 Series - Structural Design Actions](https://www.standards.org.au/)

---

**Built with ❤️ for the Australian building and construction community**