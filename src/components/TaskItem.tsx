import React, { useState } from 'react';
import { Check, X, Edit2, Save, XCircle, Calendar, Tag } from 'lucide-react';
import { Task } from '../types';
import { getPriorityColor, formatDate } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
    });
  };

  const handleSave = () => {
    onUpdate(task.id, editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editForm.title}
            onChange={handleChange}
            className="input-primary w-full font-medium"
            placeholder="Task title..."
          />
          
          <textarea
            name="description"
            value={editForm.description}
            onChange={handleChange}
            className="input-primary w-full resize-none"
            rows={2}
            placeholder="Task description..."
          />
          
          <div className="grid grid-cols-2 gap-3">
            <select
              name="priority"
              value={editForm.priority}
              onChange={handleChange}
              className="input-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <input
              type="text"
              name="category"
              value={editForm.category}
              onChange={handleChange}
              className="input-primary"
              placeholder="Category..."
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary flex items-center gap-1 text-sm"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggle(task.id)}
              className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && <Check className="w-3 h-3" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(task.createdAt)}
                </div>
                
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {task.category}
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
            
            <div className="flex gap-1">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                title="Edit task"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                title="Delete task"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}