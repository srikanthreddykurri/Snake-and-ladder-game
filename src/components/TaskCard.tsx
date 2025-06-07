import React from 'react';
import { Task } from '../types';
import { Calendar, Clock, Flag, MoreVertical, Trash2, Edit } from 'lucide-react';
import { formatDate, isOverdue } from '../utils/taskUtils';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, onEdit }) => {
  const [showActions, setShowActions] = React.useState(false);

  const handleStatusChange = () => {
    const statusFlow = {
      'todo': 'in-progress',
      'in-progress': 'completed',
      'completed': 'todo'
    } as const;
    
    onUpdate(task.id, { status: statusFlow[task.status] });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'todo': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate) && task.status !== 'completed';

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 ${
      task.status === 'completed' ? 'opacity-75' : ''
    } ${isTaskOverdue ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleStatusChange}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
              task.status === 'completed' 
                ? 'bg-green-500 border-green-500' 
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            {task.status === 'completed' && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
            {task.status === 'in-progress' && (
              <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
            )}
          </button>
          <h3 className={`font-semibold text-gray-900 ${
            task.status === 'completed' ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
              <button
                onClick={() => {onEdit(task); setShowActions(false);}}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {onDelete(task.id); setShowActions(false);}}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            <Flag className="w-3 h-3" />
            {task.priority}
          </span>
          
          {task.dueDate && (
            <span className={`inline-flex items-center gap-1 text-xs ${
              isTaskOverdue ? 'text-red-600' : 'text-gray-500'
            }`}>
              <Calendar className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></span>
          <span className="text-xs text-gray-500 capitalize">{task.status.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;