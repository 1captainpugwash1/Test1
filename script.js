// Building Code AI Assistant - Main JavaScript File

class BuildingCodeAI {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');
        this.resultsContent = document.getElementById('resultsContent');
        this.clearResults = document.getElementById('clearResults');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        this.initializeEventListeners();
        this.initializeAutoResize();
        this.simulatedCodeData = this.loadBuildingCodeData();
    }

    initializeEventListeners() {
        // Chat functionality
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        this.messageInput.addEventListener('input', () => {
            this.updateSendButton();
        });

        // Search functionality
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });
        
        // Clear search results
        this.clearResults.addEventListener('click', () => this.clearSearchResults());
    }

    initializeAutoResize() {
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }

    updateSendButton() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendBtn.disabled = !hasText;
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.updateSendButton();

        // Show loading
        this.showLoading();

        try {
            // Simulate AI response (replace with actual Gemini/Genkit integration)
            const response = await this.getAIResponse(message);
            this.addMessage(response, 'bot');
        } catch (error) {
            this.addMessage('I apologize, but I encountered an error processing your request. Please try again.', 'bot');
        } finally {
            this.hideLoading();
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (typeof content === 'string') {
            contentDiv.innerHTML = this.formatMessage(content);
        } else {
            contentDiv.appendChild(content);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(text) {
        // Convert markdown-like formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/```(.*?)```/gs, '<code>$1</code>');
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showLoading() {
        this.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.loadingOverlay.style.display = 'none';
    }

    async getAIResponse(message) {
        // Simulate AI thinking delay
        await this.delay(1000 + Math.random() * 1000);
        
        // Simple response logic based on message content
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('fire safety') || lowerMessage.includes('fire')) {
            return this.getFireSafetyResponse();
        } else if (lowerMessage.includes('residential') || lowerMessage.includes('house')) {
            return this.getResidentialResponse();
        } else if (lowerMessage.includes('clause') || lowerMessage.match(/\d+\.\d+/)) {
            return this.getClauseResponse(message);
        } else if (lowerMessage.includes('accessibility') || lowerMessage.includes('disabled')) {
            return this.getAccessibilityResponse();
        } else if (lowerMessage.includes('structural') || lowerMessage.includes('structure')) {
            return this.getStructuralResponse();
        } else if (lowerMessage.includes('energy') || lowerMessage.includes('thermal')) {
            return this.getEnergyResponse();
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! I'm here to help you understand the Building Code of Australia 2022. You can ask me about specific clauses, fire safety requirements, accessibility standards, structural provisions, or search for particular topics. What would you like to know?";
        } else {
            return this.getGeneralResponse(message);
        }
    }

    getFireSafetyResponse() {
        return `**Fire Safety Requirements:**

The Building Code of Australia 2022 includes comprehensive fire safety provisions:

**Key Requirements:**
• **Fire-resistance levels** - Structural elements must meet specific fire-resistance ratings
• **Egress provisions** - Safe evacuation paths with appropriate widths and distances
• **Fire detection and alarm systems** - Smoke alarms and fire detection as required
• **Fire suppression systems** - Sprinkler systems for certain building classes

**For Residential Buildings (Class 1):**
• Smoke alarms required in bedrooms and hallways
• Fire-rated walls between attached dwellings
• Safe egress from upper floors
• Fire-resistant glazing where required

Would you like me to explain any specific fire safety aspect in more detail?`;
    }

    getResidentialResponse() {
        return `**Residential Building Requirements:**

The Building Code applies different standards based on building classification:

**Class 1 Buildings (Houses):**
• **Structural provisions** - Foundation, framing, and load-bearing requirements
• **Energy efficiency** - Insulation, glazing, and thermal performance
• **Accessibility** - Basic access provisions for new constructions
• **Fire safety** - Smoke alarms, egress, and fire-resistant construction
• **Health and amenity** - Natural light, ventilation, and room sizes

**Key Compliance Areas:**
• Building footprint and setbacks
• Ceiling heights (minimum 2.4m for habitable rooms)
• Window and door requirements
• Bathroom and kitchen provisions
• Stairway design and safety

**Class 2 Buildings (Apartments):**
Additional requirements for multi-unit residential buildings including enhanced fire safety and accessibility provisions.

What specific residential building aspect would you like to explore?`;
    }

    getClauseResponse(message) {
        // Extract clause number if present
        const clauseMatch = message.match(/\d+\.\d+(\.\d+)?/);
        const clauseNumber = clauseMatch ? clauseMatch[0] : 'the specified clause';
        
        return `**Regarding Clause ${clauseNumber}:**

While I don't have the complete text of that specific clause readily available, I can help you understand common building code provisions:

**Typical clause structures include:**
• **Objective** - What the clause aims to achieve
• **Functional Statement** - How the objective is met
• **Performance Requirement** - Measurable criteria
• **Deemed-to-Satisfy Provisions** - Prescriptive solutions

**Common clause topics:**
• Structural adequacy and safety
• Fire resistance and egress
• Health and amenity requirements
• Energy efficiency standards
• Accessibility provisions

For the exact text and specific requirements of clause ${clauseNumber}, I recommend:
1. Consulting the official BCA 2022 documentation
2. Checking the ABCB website for interpretations
3. Consulting with a qualified building professional

Would you like me to explain the general principles that typically apply to this type of clause?`;
    }

    getAccessibilityResponse() {
        return `**Accessibility Requirements (BCA 2022):**

The Building Code includes comprehensive accessibility provisions:

**General Requirements:**
• **Access to buildings** - Continuous accessible paths from boundaries
• **Access within buildings** - Accessible routes to all areas of use
• **Accessible facilities** - Toilets, parking, and amenities

**Key Standards:**
• **AS 1428 series** - Design for access and mobility standards
• **Doorway widths** - Minimum 850mm clear opening
• **Ramp gradients** - Maximum 1:14 for pedestrian ramps
• **Handrails and tactile indicators** as required

**Building Classifications:**
• **Class 1** - Limited accessibility requirements for new dwellings
• **Class 2-9** - Comprehensive accessibility compliance required
• **Class 10** - Accessibility required for public use areas

**Specific Provisions:**
• Accessible car parking spaces and signage
• Accessible sanitary facilities
• Hearing augmentation systems where required
• Accessible switching and controls

The standards ensure buildings are usable by people with disabilities. Would you like details on any specific accessibility requirement?`;
    }

    getStructuralResponse() {
        return `**Structural Provisions (BCA 2022):**

The Building Code ensures structural safety through comprehensive requirements:

**Key Structural Standards:**
• **AS/NZS 1170 series** - Structural design loads (wind, earthquake, live loads)
• **AS 3600** - Concrete structures design
• **AS 4100** - Steel structures design
• **AS 1720** - Timber structures design

**Load Requirements:**
• **Dead loads** - Permanent structural elements
• **Live loads** - Variable loads from occupancy and use
• **Wind loads** - Regional wind speeds and pressure coefficients
• **Earthquake loads** - Seismic design requirements

**Foundation Requirements:**
• Site investigation and soil classification
• Footing design for soil conditions
• Pier and pile requirements
• Moisture and termite protection

**Construction Requirements:**
• Material specifications and quality standards
• Connection details and fastening requirements
• Construction tolerances and inspection requirements
• Structural adequacy verification

**Special Considerations:**
• Bushfire-prone areas - Enhanced structural requirements
• Cyclonic regions - Additional wind load provisions
• Seismic zones - Earthquake-resistant design

Would you like me to elaborate on any specific structural aspect or loading requirement?`;
    }

    getEnergyResponse() {
        return `**Energy Efficiency Requirements (BCA 2022):**

The Building Code includes comprehensive energy efficiency provisions:

**Thermal Performance Requirements:**
• **Building thermal envelope** - Insulation and glazing standards
• **R-values** - Minimum insulation requirements for different climate zones
• **Glazing performance** - U-values and solar heat gain coefficients
• **Thermal bridging** - Minimizing heat transfer through structural elements

**Residential Buildings (Class 1):**
• **Star ratings** - Energy efficiency ratings for new homes
• **Building fabric** - Wall, roof, and floor insulation requirements
• **Glazing** - Window performance and shading requirements
• **Air sealing** - Minimizing air leakage

**Commercial Buildings:**
• **Section J** - Energy efficiency provisions for Class 2-9 buildings
• **HVAC systems** - Heating, ventilation, and air conditioning efficiency
• **Lighting** - Energy-efficient lighting requirements
• **Building management systems** - Automated energy control

**Compliance Pathways:**
• **Deemed-to-Satisfy** - Prescriptive requirements
• **Energy modelling** - Performance-based solutions
• **Building energy rating** - NABERS and other rating tools

**Climate Zone Considerations:**
Different requirements apply based on your location's climate zone (1-8).

Would you like specific information about energy requirements for your climate zone or building type?`;
    }

    getGeneralResponse(message) {
        return `Thank you for your question about "${message}".

I can help you understand various aspects of the Building Code of Australia 2022, including:

**Main Areas I Can Assist With:**
• **Fire safety requirements** - Detection, suppression, and egress
• **Accessibility standards** - Compliance with disability access requirements
• **Structural provisions** - Load requirements and design standards
• **Energy efficiency** - Thermal performance and sustainability
• **Health and amenity** - Ventilation, lighting, and space requirements

**How to Get Specific Information:**
• Ask about specific building classes (Class 1-10)
• Reference particular clauses or sections
• Inquire about compliance pathways
• Request explanations of technical terms

**Search Functionality:**
You can also use the search feature above to find specific keywords or clauses in the Building Code.

Could you please rephrase your question or specify which particular aspect of the building code you'd like to explore?`;
    }

    async performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        this.showLoading();
        
        try {
            // Simulate search delay
            await this.delay(800);
            
            const results = this.searchBuildingCode(query);
            this.displaySearchResults(results, query);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            this.hideLoading();
        }
    }

    searchBuildingCode(query) {
        const lowerQuery = query.toLowerCase();
        const results = [];
        
        // Search through simulated building code data
        this.simulatedCodeData.forEach(item => {
            const titleMatch = item.title.toLowerCase().includes(lowerQuery);
            const contentMatch = item.content.toLowerCase().includes(lowerQuery);
            const clauseMatch = item.clause.toLowerCase().includes(lowerQuery);
            
            if (titleMatch || contentMatch || clauseMatch) {
                // Calculate relevance score
                let score = 0;
                if (titleMatch) score += 3;
                if (clauseMatch) score += 2;
                if (contentMatch) score += 1;
                
                results.push({ ...item, relevance: score });
            }
        });
        
        // Sort by relevance
        return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
    }

    displaySearchResults(results, query) {
        if (results.length === 0) {
            this.resultsContent.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found</h3>
                    <p>No matches found for "${query}". Try different keywords or check spelling.</p>
                </div>
            `;
        } else {
            this.resultsContent.innerHTML = results.map(result => `
                <div class="result-item">
                    <div class="result-title">${result.title}</div>
                    <div class="result-content">${this.highlightSearchTerms(result.content, query)}</div>
                    <div class="result-meta">
                        <strong>Clause:</strong> ${result.clause} | 
                        <strong>Volume:</strong> ${result.volume} | 
                        <strong>Section:</strong> ${result.section}
                    </div>
                </div>
            `).join('');
        }
        
        this.searchResults.style.display = 'block';
        this.searchResults.scrollIntoView({ behavior: 'smooth' });
    }

    highlightSearchTerms(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    clearSearchResults() {
        this.searchResults.style.display = 'none';
        this.searchInput.value = '';
        this.resultsContent.innerHTML = '';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Simulated Building Code data (replace with actual data source)
    loadBuildingCodeData() {
        return [
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
            },
            {
                clause: "2.2.1",
                title: "Egress Requirements",
                content: "Buildings must provide safe egress for all occupants. Exit widths, travel distances, and emergency lighting must comply with prescribed standards.",
                volume: "Volume 1",
                section: "Section 2 - Access and Egress"
            },
            {
                clause: "5.1.1",
                title: "Residential Buildings - General Requirements",
                content: "Class 1 buildings must provide safe, healthy, and comfortable living environments. Requirements cover structural adequacy, fire safety, accessibility, and amenity.",
                volume: "Volume 2",
                section: "Section 5 - Residential Buildings"
            },
            {
                clause: "3.1.1",
                title: "Fire Resistance Levels",
                content: "Structural elements must achieve specified fire resistance levels (FRL) to maintain structural adequacy and prevent fire spread during emergencies.",
                volume: "Volume 1",
                section: "Section 3 - Fire Resistance and Stability"
            },
            {
                clause: "6.2.1",
                title: "Ventilation Requirements",
                content: "Buildings must provide adequate natural or mechanical ventilation to maintain indoor air quality and occupant comfort. Minimum ventilation rates are specified.",
                volume: "Volume 2",
                section: "Section 6 - Building Services"
            },
            {
                clause: "1.2.1",
                title: "Foundation Design",
                content: "Foundations must be designed for site conditions, including soil classification, moisture conditions, and expected loads. Site investigation may be required.",
                volume: "Volume 1",
                section: "Section 1 - Structural Provisions"
            }
        ];
    }
}

// Custom styling for search highlights
const style = document.createElement('style');
style.textContent = `
    mark {
        background-color: #fff3cd;
        color: #856404;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: 500;
    }
    
    .no-results {
        text-align: center;
        padding: 3rem;
        color: #6c757d;
    }
    
    .no-results i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    
    .no-results h3 {
        margin-bottom: 0.5rem;
        color: #495057;
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BuildingCodeAI();
});