import { useState, useEffect } from 'react';
import { Task, Project } from '../types';
import { generateId } from '../utils/taskUtils';

const STORAGE_KEY = 'taskflow_data';

const defaultProjects: Project[] = [
  { id: 'work', name: 'Work', color: '#3B82F6', taskCount: 0 },
  { id: 'personal', name: 'Personal', color: '#8B5CF6', taskCount: 0 },
  { id: 'learning', name: 'Learning', color: '#10B981', taskCount: 0 },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { tasks: savedTasks, projects: savedProjects } = JSON.parse(savedData);
      setTasks(savedTasks || []);
      setProjects(savedProjects || defaultProjects);
    }
  }, []);

  // Save data to localStorage whenever tasks or projects change
  useEffect(() => {
    const dataToSave = { tasks, projects };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    
    // Update project task counts
    const updatedProjects = projects.map(project => ({
      ...project,
      taskCount: tasks.filter(task => task.project === project.id).length
    }));
    setProjects(updatedProjects);
  }, [tasks, projects]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addProject = (name: string, color: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      color,
      taskCount: 0,
    };
    setProjects(prev => [...prev, newProject]);
  };

  return {
    tasks,
    projects,
    addTask,
    updateTask,
    deleteTask,
    addProject,
  };
};