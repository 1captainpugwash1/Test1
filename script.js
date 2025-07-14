// Task Tracker App - JavaScript Functionality

class TaskTracker {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.editingTaskId = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    // Initialize DOM elements
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.tasksList = document.getElementById('tasksList');
        this.emptyState = document.getElementById('emptyState');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.confirmModal = document.getElementById('confirmModal');
        this.confirmMessage = document.getElementById('confirmMessage');
        this.confirmYes = document.getElementById('confirmYes');
        this.confirmNo = document.getElementById('confirmNo');
        
        // Stats elements
        this.totalTasksSpan = document.getElementById('totalTasks');
        this.pendingTasksSpan = document.getElementById('pendingTasks');
        this.completedTasksSpan = document.getElementById('completedTasks');
    }

    // Attach event listeners
    attachEventListeners() {
        // Add task events
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter events
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Bulk action events
        this.clearCompletedBtn.addEventListener('click', () => {
            this.confirmAction('Are you sure you want to clear all completed tasks?', () => {
                this.clearCompletedTasks();
            });
        });

        this.clearAllBtn.addEventListener('click', () => {
            this.confirmAction('Are you sure you want to clear all tasks? This action cannot be undone.', () => {
                this.clearAllTasks();
            });
        });

        // Modal events
        this.confirmNo.addEventListener('click', () => this.hideModal());
        this.confirmModal.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) this.hideModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
                this.cancelEdit();
            }
        });
    }

    // Generate unique ID for tasks
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Add new task
    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.taskInput.focus();
            return;
        }

        const task = {
            id: this.generateId(),
            text: text,
            completed: false,
            priority: this.prioritySelect.value,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        // Clear input and focus
        this.taskInput.value = '';
        this.taskInput.focus();
        
        // Add animation class to new task
        setTimeout(() => {
            const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            if (taskElement) {
                taskElement.classList.add('new');
                setTimeout(() => taskElement.classList.remove('new'), 300);
            }
        }, 10);
    }

    // Toggle task completion
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Delete task
    deleteTask(taskId) {
        this.confirmAction('Are you sure you want to delete this task?', () => {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        });
    }

    // Start editing task
    startEdit(taskId) {
        this.cancelEdit(); // Cancel any existing edit
        this.editingTaskId = taskId;
        
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const task = this.tasks.find(t => t.id === taskId);
        
        if (taskElement && task) {
            taskElement.classList.add('editing');
            const editInput = taskElement.querySelector('.task-edit-input');
            editInput.value = task.text;
            editInput.focus();
            editInput.select();
        }
    }

    // Save edited task
    saveEdit(taskId, newText) {
        if (!newText.trim()) {
            this.cancelEdit();
            return;
        }

        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.text = newText.trim();
            this.saveTasks();
            this.editingTaskId = null;
            this.renderTasks();
        }
    }

    // Cancel editing
    cancelEdit() {
        if (this.editingTaskId) {
            const taskElement = document.querySelector(`[data-task-id="${this.editingTaskId}"]`);
            if (taskElement) {
                taskElement.classList.remove('editing');
            }
            this.editingTaskId = null;
        }
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderTasks();
    }

    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    // Clear completed tasks
    clearCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    // Clear all tasks
    clearAllTasks() {
        this.tasks = [];
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    // Show confirmation modal
    confirmAction(message, callback) {
        this.confirmMessage.textContent = message;
        this.confirmModal.classList.add('show');
        
        // Remove existing listeners and add new one
        const newConfirmYes = this.confirmYes.cloneNode(true);
        this.confirmYes.parentNode.replaceChild(newConfirmYes, this.confirmYes);
        this.confirmYes = newConfirmYes;
        
        this.confirmYes.addEventListener('click', () => {
            this.hideModal();
            callback();
        });
    }

    // Hide modal
    hideModal() {
        this.confirmModal.classList.remove('show');
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    // Create task HTML element
    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority`;
        taskDiv.setAttribute('data-task-id', task.id);
        
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-content">
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                <input type="text" class="task-edit-input" value="${this.escapeHtml(task.text)}">
                <div class="task-meta">
                    <span class="priority-badge ${task.priority}">${task.priority}</span>
                    <span class="task-date">Created ${this.formatDate(task.createdAt)}</span>
                    ${task.completed ? `<span class="completion-date">Completed ${this.formatDate(task.completedAt)}</span>` : ''}
                </div>
            </div>
            <div class="task-actions">
                ${task.id === this.editingTaskId ? `
                    <button class="task-btn save-btn">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="task-btn cancel-btn">
                        <i class="fas fa-times"></i>
                    </button>
                ` : `
                    <button class="task-btn edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                `}
            </div>
        `;

        // Attach task-specific event listeners
        const checkbox = taskDiv.querySelector('.task-checkbox');
        const editBtn = taskDiv.querySelector('.edit-btn');
        const deleteBtn = taskDiv.querySelector('.delete-btn');
        const saveBtn = taskDiv.querySelector('.save-btn');
        const cancelBtn = taskDiv.querySelector('.cancel-btn');
        const editInput = taskDiv.querySelector('.task-edit-input');

        checkbox.addEventListener('change', () => this.toggleTask(task.id));
        
        if (editBtn) editBtn.addEventListener('click', () => this.startEdit(task.id));
        if (deleteBtn) deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveEdit(task.id, editInput.value);
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.cancelEdit());
        }

        if (editInput) {
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveEdit(task.id, editInput.value);
                } else if (e.key === 'Escape') {
                    this.cancelEdit();
                }
            });
        }

        return taskDiv;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Render tasks
    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.tasksList.classList.remove('show');
            this.emptyState.style.display = 'block';
        } else {
            this.tasksList.classList.add('show');
            this.emptyState.style.display = 'none';
            
            // Clear existing tasks
            this.tasksList.innerHTML = '';
            
            // Add filtered tasks
            filteredTasks.forEach(task => {
                const taskElement = this.createTaskElement(task);
                this.tasksList.appendChild(taskElement);
            });
        }
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;

        this.totalTasksSpan.textContent = total;
        this.pendingTasksSpan.textContent = pending;
        this.completedTasksSpan.textContent = completed;
    }

    // Load tasks from localStorage
    loadTasks() {
        try {
            const stored = localStorage.getItem('taskTracker-tasks');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    // Save tasks to localStorage
    saveTasks() {
        try {
            localStorage.setItem('taskTracker-tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    // Export tasks as JSON
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Import tasks from JSON
    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                if (Array.isArray(importedTasks)) {
                    this.confirmAction('This will replace all existing tasks. Continue?', () => {
                        this.tasks = importedTasks;
                        this.saveTasks();
                        this.renderTasks();
                        this.updateStats();
                    });
                }
            } catch (error) {
                alert('Error importing tasks. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskTracker = new TaskTracker();
    
    // Add some sample tasks for demo (only if no tasks exist)
    if (window.taskTracker.tasks.length === 0) {
        const sampleTasks = [
            {
                id: 'sample-1',
                text: 'Welcome to Task Tracker! Click the checkbox to mark this as complete.',
                completed: false,
                priority: 'medium',
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: 'sample-2',
                text: 'Try editing this task by clicking the edit button.',
                completed: false,
                priority: 'low',
                createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
                completedAt: null
            },
            {
                id: 'sample-3',
                text: 'This is a completed high-priority task.',
                completed: true,
                priority: 'high',
                createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                completedAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
            }
        ];
        
        window.taskTracker.tasks = sampleTasks;
        window.taskTracker.saveTasks();
        window.taskTracker.renderTasks();
        window.taskTracker.updateStats();
    }
});

// Add keyboard shortcuts info (optional)
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N to focus new task input
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.getElementById('taskInput').focus();
    }
    
    // Ctrl/Cmd + A to show all tasks
    if ((e.ctrlKey || e.metaKey) && e.key === 'a' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        window.taskTracker.setFilter('all');
    }
});

// Add export/import functionality (bonus features)
window.addEventListener('load', () => {
    // Add export button (hidden by default, can be shown via console)
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Tasks';
    exportBtn.style.display = 'none';
    exportBtn.id = 'exportBtn';
    exportBtn.addEventListener('click', () => window.taskTracker.exportTasks());
    document.body.appendChild(exportBtn);
    
    // Add import functionality (hidden by default)
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.style.display = 'none';
    importInput.id = 'importInput';
    importInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            window.taskTracker.importTasks(e.target.files[0]);
        }
    });
    document.body.appendChild(importInput);
});

// Console helper functions for power users
window.taskTrackerHelpers = {
    exportTasks: () => window.taskTracker.exportTasks(),
    importTasks: () => document.getElementById('importInput').click(),
    clearAllTasks: () => window.taskTracker.clearAllTasks(),
    addSampleTasks: () => {
        const samples = [
            { text: 'Sample high priority task', priority: 'high' },
            { text: 'Sample medium priority task', priority: 'medium' },
            { text: 'Sample low priority task', priority: 'low' }
        ];
        
        samples.forEach(sample => {
            document.getElementById('taskInput').value = sample.text;
            document.getElementById('prioritySelect').value = sample.priority;
            window.taskTracker.addTask();
        });
    }
};