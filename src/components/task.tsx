import React, { useState } from 'react';
import './task.css';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addItem, setAddItem] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editClicked, setEditClicked] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: addItem,
      description: addDescription,
    };
    setTasks([...tasks, newTask]);
    setAddItem('');
    setAddDescription('');
  };

  const handleItemInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddItem(event.target.value);
  };

  const handleDescriptionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddDescription(event.target.value);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setEditClicked(true)
  };

  const handleUpdateTask = () => {
    if (editTask === null || editTask.title.trim() === '') return;

    const updatedTasks = tasks.map(task =>
      task.id === editTask.id ? { ...task, title: editTask.title, description: editTask.description } : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
    setEditClicked(false)
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <h1>About JavaScript Libraries</h1>

      <div className="">
        <div className="search">
          <input
            type="text"
            placeholder="Search posts"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {editClicked == false ? (

        <div className="aditm">
          <h2>Add a post</h2>
          <div>
            <input
              type="text"
              placeholder="Enter title"
              value={addItem}
              onChange={handleItemInput}
            />
            <input
              type="text"
              placeholder="Enter description"
              value={addDescription}
              onChange={handleDescriptionInput}
            />
            <button onClick={handleAddTask}>Add Post</button>
          </div>
        </div>

      ) : (

        <div>
          {tasks.map(task => (
            <div key={task.id}>
              {editTask?.id === task.id
                ? (
                  <div className="aditm">
                    <h2>Now you can update!!</h2>
                    <div>
                      <input
                        type="text"
                        name="title"
                        value={editTask.title}
                        onChange={(event) => setEditTask({ ...editTask, title: event.target.value })}
                      />
                      <input
                        type="text"
                        name="description"
                        value={editTask.description}
                        onChange={(event) => setEditTask({ ...editTask, description: event.target.value })}
                      />
                      <button onClick={handleUpdateTask}>Update</button>
                    </div>
                  </div>
                )

                : null

              }
            </div>
          ))}
        </div>

      )}

      <div className='box'>
        {filteredTasks.map(task => (
          <main key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div>
              <button onClick={() =>
                handleEditTask(task)} className='edit'>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)} className='delete'>Delete</button>
              {
                editClicked == true
                  ? (
                    <p>Scroll up to update</p>
                  )
                  : null
              }
            </div>

          </main>
        ))}
      </div>
    </section>
  );
}