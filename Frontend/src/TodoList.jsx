

import { useState, useEffect, useReducer } from "react";

// Reducer function
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'set':
      return action.tasks;
    case 'add':
      return [...tasks, action.task];
    case 'delete':
      return tasks.filter(task => task.id !== action.id);
    case 'update':
      return tasks.map(task => 
        task.id === action.task.id ? action.task : task
      );
    default:
      return tasks;
  }
}

export default function TodoList() {
  const [todos, dispatch] = useReducer(tasksReducer, []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks with caching
  useEffect(() => {
    const cached = localStorage.getItem('tasks');

    if (cached) {
      dispatch({ type: 'set', tasks: JSON.parse(cached) });
      setIsLoading(false);
    } else {
      fetch("http://localhost:5000/tasks")
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('tasks', JSON.stringify(data));
          dispatch({ type: 'set', tasks: data });
          setIsLoading(false);
        })
        .catch(() => {
          alert("Error fetching tasks");
          setIsLoading(false);
        });
    }
  }, []);

  const addNewTask = () => {
    if (!title.trim()) return;

    const task = { title, description, status };
    setIsLoading(true);
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(newTask => {
        const updatedTasks = [...todos, newTask];
        dispatch({ type: 'add', task: newTask });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error adding task");
        setIsLoading(false);
      });

    setTitle("");
    setDescription("");
    setStatus("todo");
  };

  const deleteTodo = (id) => {
    setIsLoading(true);
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedTasks = todos.filter(t => t.id !== id);
        dispatch({ type: 'delete', id });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error deleting task");
        setIsLoading(false);
      });
  };

  const markAsDone = (id) => {
    setIsLoading(true);
    const updated = todos.map(t => 
      t.id === id ? { ...t, status: "done" } : t
    );

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" })
    })
      .then(() => {
        dispatch({
          type: 'update',
          task: updated.find(t => t.id === id)
        });
        localStorage.setItem('tasks', JSON.stringify(updated));
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error updating task");
        setIsLoading(false);
      });
  };

  const refreshFromServer = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('tasks', JSON.stringify(data));
        dispatch({ type: 'set', tasks: data });
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error refreshing tasks");
        setIsLoading(false);
      });
  };

  return (
    <div className="todo-container" style={styles.container}>
      <h1 style={styles.header}>Task Manager</h1>

      <div style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title</label>
          <input 
            style={styles.input}
            placeholder="What needs to be done?" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea 
            style={{...styles.input, ...styles.textarea}}
            placeholder="Add details..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Status</label>
          <select 
            style={styles.select}
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button 
          style={styles.addButton} 
          onClick={addNewTask}
          disabled={!title.trim()}
        >
          Add Task
        </button>

        <button 
          style={{ ...styles.addButton, backgroundColor: "#2196F3", marginTop: "10px" }} 
          onClick={refreshFromServer}
        >
          Refresh Tasks from Server
        </button>
      </div>

      {isLoading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <>
          {todos.length === 0 ? (
            <div style={styles.emptyState}>
              No tasks yet. Add one to get started!
            </div>
          ) : (
            <div style={styles.taskList}>
              {todos.map(todo => (
                <div key={todo.id} style={{
                  ...styles.taskItem,
                  ...(todo.status === "done" ? styles.taskDone : {}),
                  ...(todo.status === "in progress" ? styles.taskInProgress : {})
                }}>
                  <div style={styles.taskContent}>
                    <h3 style={{
                      ...styles.taskTitle,
                      ...(todo.status === "done" ? styles.textStrike : {})
                    }}>
                      {todo.title}
                    </h3>
                    <p style={{
                      ...styles.taskDescription,
                      ...(todo.status === "done" ? styles.textStrike : {})
                    }}>
                      {todo.description}
                    </p>
                    <span style={styles.taskStatus}>
                      {todo.status}
                    </span>
                  </div>
                  <div style={styles.taskActions}>
                    {todo.status !== "done" && (
                      <button 
                        style={styles.doneButton} 
                        onClick={() => markAsDone(todo.id)}
                      >
                        Complete
                      </button>
                    )}
                    <button 
                      style={styles.deleteButton} 
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}


// Inline styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
    },
    formContainer: {
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    textarea: {
        minHeight: '80px',
        resize: 'vertical',
    },
    select: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        backgroundColor: 'white',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '16px',
        marginTop: '10px',
    },
    taskList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    taskItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        border: '1px solid #eee',
    },
    taskDone: {
        backgroundColor: '#f9fff9',
        borderLeft: '4px solid #4CAF50',
    },
    taskInProgress: {
        backgroundColor: '#fffdf5',
        borderLeft: '4px solid #FFC107',
    },
    taskContent: {
        flex: 1,
    },
    taskTitle: {
        margin: '0 0 5px 0',
        color: '#333',
    },
    taskDescription: {
        margin: '0 0 8px 0',
        color: '#666',
    },
    taskStatus: {
        display: 'inline-block',
        padding: '3px 8px',
        borderRadius: '12px',
        backgroundColor: '#eee',
        fontSize: '12px',
        color: '#555',
    },
    taskActions: {
        display: 'flex',
        gap: '10px',
    },
    doneButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    textStrike: {
        textDecoration: 'line-through',
        color: '#888',
    },
    loading: {
        textAlign: 'center',
        padding: '20px',
        color: '#666',
    },
    emptyState: {
        textAlign: 'center',
        padding: '30px',
        color: '#666',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    }
};
