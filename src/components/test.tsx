import axios from 'axios';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import './task.css';


// Define the base URL for our API
const API_URL = 'http://localhost:5000/api/data';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function App() {
  // Define state for our tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editClicked, setEditClicked] = useState(false)


  // Load the tasks from the server when the component mounts
  useEffect(() => {
    getTasks();
  }, []);

  // CREATE: Add a new task to the data
  const addTask = async (task: Omit<Task, 'id'>) => {
    console.log('add clicked')
    await axios.post(API_URL, task);
    getTasks();
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  // READ: Retrieve all tasks from the data
  const getTasks = async () => {
    const response = await axios.get<Task[]>(API_URL);
    setTasks(response.data);
  };

  // UPDATE: Update an existing task in the data
  const updateTask = async (id: number, updatedTask: Task) => {
    await axios.put(`${API_URL}/${id}`, updatedTask);
    getTasks();
    setEditClicked(true)
  };

  // DELETE: Delete a task from the data
  const deleteTask = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    getTasks();
  };

  return (
    <section>
      <div className="aditm">
        <h2>Add a new task</h2>
        <div>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTaskTitle(e.target.value)
              }
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTaskDescription(e.target.value)
              }
            />
            <button onClick={(e: FormEvent) => {
              e.preventDefault();
              addTask({ title: newTaskTitle, description: newTaskDescription });
            }}>Add Task</button>
        </div>
      </div>
      
      {editingTask && (
        <div className='aditm'>
          <h2>Edit Task</h2>
            <div>
              <input
                type="text"
                value={editingTask.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
              />
              <input
                type="text"
                value={editingTask.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingTask({ ...editingTask, description: e.target.value })
                }
              />
            <button onClick={(e: FormEvent) => {
              e.preventDefault();
              updateTask(editingTask.id, editingTask);
              setEditingTask(null);
            }}>Save Changes</button>
          </div>
        </div>
      )}

      <div className='box'>
        {tasks.map((task) => (
          <main key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div>
              <button onClick={() => setEditingTask(task)} className='edit'>Edit</button>
              <button onClick={() => deleteTask(task.id)} className='delete'>Delete</button>
            </div>
          </main>
        ))}
      </div>
    </section>
  );
}
