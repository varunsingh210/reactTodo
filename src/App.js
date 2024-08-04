import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', isChecked: false },
    { id: 2, text: 'Build a project', isChecked: false },
    { id: 3, text: 'Review code', isChecked: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [nextId, setNextId] = useState(4);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue) {
      if (editId !== null) {
        setTodos(todos.map(todo =>
          todo.id === editId ? { ...todo, text: inputValue } : todo
        ));
        setEditId(null);
      } else {
        const newTodo = {
          id: nextId,
          text: inputValue,
          isChecked: false,
        };
        setTodos([...todos, newTodo]);
        setNextId(nextId + 1);
      }
      setInputValue('');
      setIsInputVisible(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setInputValue(todo.text);
    setEditId(id);
    setIsInputVisible(true);
  };

  return (
    <div className="App">
      <div className="main">
        <div className="header">
          <div className="inner-header">
            <i className="fas fa-bars"></i>
            <h1>Website todo</h1>
          </div>
        </div>
        <div className="list-data">
          <ul>
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.isChecked}
                  onChange={() => handleCheckboxChange(todo.id)}
                  className="todo-checkbox"
                />
                <label htmlFor="checkbox"></label>
                <span className="todo-content">
                  <span className={`todo-text ${todo.isChecked ? 'checked' : ''}`}>
                    {todo.text}
                  </span>
                  <span className="todo-actions">
                    {todo.isChecked ? (
                      <i className="fas fa-trash-alt deleteIcon" onClick={() => handleDelete(todo.id)}></i>
                    ) : (
                      <i className="fas fa-edit editIcon" onClick={() => handleEdit(todo.id)}></i>
                    )}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="input-section">
          {isInputVisible ? (
            <div className="input-inner-section">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a new task"
              />
              <button onClick={handleAddTodo}>
                {editId !== null ? 'Update' : 'Add'}
              </button>
            </div>
          ) : (
            <Link
              to="#"
              className="task-button"
              onClick={() => setIsInputVisible(!isInputVisible)}
            >
              <i className="fas fa-plus plusIcon"></i>
              New task
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
