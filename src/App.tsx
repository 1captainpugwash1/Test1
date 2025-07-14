import React, { useState, useMemo } from 'react';
import { Task, FilterType, TaskFormData } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { filterTasks, sortTasks, generateId } from './utils/taskUtils';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilter } from './components/TaskFilter';
import { TaskStats } from './components/TaskStats';
import { Header } from './components/Header';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: generateId(),
      ...taskData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(task => task.id === id)?.completed });
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = filterTasks(tasks, filter);
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return sortTasks(filtered);
  }, [tasks, filter, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="mb-8">
          <TaskStats tasks={tasks} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm onAddTask={addTask} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="mb-6">
              <TaskFilter 
                currentFilter={filter}
                onFilterChange={setFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            
            <TaskList 
              tasks={filteredAndSortedTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;