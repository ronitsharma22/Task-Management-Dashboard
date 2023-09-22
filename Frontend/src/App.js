import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList/>} />
        <Route path="/create" element={<TaskCreate/>} />
        <Route path="/edit/:id" element={<TaskEdit/>} />
      </Routes>
    </Router>
  );
}

export default App;
