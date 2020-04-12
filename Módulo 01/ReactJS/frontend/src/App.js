import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAddProject() {
    //projects.push(`Nova Projeto ${Date.now()}`);
    //setProjects([...projects, `Nova Projeto ${Date.now()}`])

    const response = await api.post('projects', {
      title: `Nova Projeto ${Date.now()}`,
      owner: 'Rivan Bello'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects"/>

      <img width={300}/>

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button title="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;